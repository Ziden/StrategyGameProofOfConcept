import Guid from "./guid";

const END_OF_BUFFER = 'End of buffer';

export default class GameStream {
  private _offset = 0;
  public bytes: Uint8ClampedArray;
  private static encoder: TextEncoder = new TextEncoder();
  private static decoder: TextDecoder = new TextDecoder();

  constructor(buffer: (ArrayBuffer | ArrayLike<number>)) {
    this.bytes = new Uint8ClampedArray(buffer);
  }

  get offset(): number { return this._offset; }
  set offset(newOffset: number) {
    if (newOffset >= this.bytes.byteLength + 1)
      throw(new Error(END_OF_BUFFER));

    this._offset = newOffset;
  }

  goPositionZero() {
    this._offset = 0;
  }

  trim() {
    return this.bytes.slice(0, this._offset);
  }

  get size(): number { return this.bytes.byteLength; }

  readString() {
    var size = this.readUshort();
    var streamBytes = new Uint8Array(size);
    var max = size;
    while(size--) {
      console.log("Index "+(max-size-1));
      streamBytes[max-size-1] = this.readByte();
    }
    console.log(streamBytes);
    var str = GameStream.decoder.decode(streamBytes)
    console.log("Read string "+str+" of "+max+" bytes");
    return str;
  }

  writeString(s:string) {
    var stringBytes = GameStream.encoder.encode(s)
    var size = stringBytes.length;
    this.writeUshort(size)
    for(var x = 0 ; x < size ;x++)
      this.writeByte(stringBytes[x]);
  }

  writeUshort(num: number) {
    this.writeByte(num & 0xFF00)
    this.writeByte(num & 0x00FF)
  }

  writeByte(byte: number) {
    this.bytes[this._offset++] = byte
  }

  readByte(): number {
    return this.bytes[this._offset++];
  }

  readGuid(): Guid {
    return Guid.get([
      this.readByte(), this.readByte(), this.readByte(), this.readByte(),
      this.readByte(), this.readByte(), this.readByte(), this.readByte(),
      this.readByte(), this.readByte(), this.readByte(), this.readByte(),
      this.readByte(), this.readByte(), this.readByte(), this.readByte(),
    ]);
  }

  readUshort(): number {
    return ((this.readByte() | this.readByte() << 8));
  }

  readInt16(): number {
    const u = this.readUshort();
    return (u >= 0x8000 ? u - 0x10000 : u);
  }

  readUnsignedInt32(): number {
    return ((this.readByte() * 16777216) + ((this.readByte() << 16) | (this.readByte() << 8) | this.readByte()));
  }

  readInt32(): number {
    const u = this.readUnsignedInt32();
    return (u >= 0x80000000 ? u - 0x100000000 : u);
  }

  readFloat(): number {
    const floatValue = new DataView(this.bytes.buffer).getFloat32(this.offset, false);
    this._offset += 4;
    return floatValue;
  }

  readDouble(): number {
    const floatValue = new DataView(this.bytes.buffer).getFloat64(this.offset, false);
    this._offset += 8;
    return floatValue;
  }
}