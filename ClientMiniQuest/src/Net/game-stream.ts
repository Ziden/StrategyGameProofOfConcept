const END_OF_BUFFER = 'End of buffer';

export default class GameStream {
  private _offset = 0;
  public bytes: Uint8ClampedArray;

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

  writeString(s:string) {
    var stringBytes = new TextEncoder().encode(s)
    var size = stringBytes.length;
    this.writeUnsignedInt(size)
    for(var x = 0 ; x < size ;x++)
      this.writeByte(stringBytes[x]);
  }

  writeUnsignedInt(num: number) {
    var first = (num & 0xFF00)
    var second = (num & 0x00FF)
    this.writeByte(first)
    this.writeByte(second)
  }

  writeByte(byte: number) {
    this.bytes[this._offset++] = byte
  }

  readByte(): number {
    return this.bytes[this._offset++];
  }

  readUnsignedInt16(): number {
    return ((this.readByte() | this.readByte() << 8));
  }

  readInt16(): number {
    const u = this.readUnsignedInt16();
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