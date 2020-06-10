import GameStream from "./game-stream"
import PacketHandler from "./packet-handler"
import IncomingPacket from "./packets";
import Bits from "./bits";
import ClientEvent from "../ClientEvents/ClientEvent";

export default class WS {

  static MAX_PACKET_SIZE = 128

  socket: WebSocket

  send(event: ClientEvent) {
    var stream = new GameStream(new ArrayBuffer(WS.MAX_PACKET_SIZE));
    stream.writeByte(event.getPacketId());
    event.serialize(stream);
    var bytes = stream.trim();
    console.log("Sending packet len " + bytes.byteLength);
    console.log(bytes[0]);
    this.socket.send(bytes);
  }

  connect() {
    var _this = this;
    return new Promise(function (resolve, reject) {
      let socket = new WebSocket("ws://localhost:8080/server");
      socket.binaryType = "arraybuffer";
      _this.socket = socket;
      socket.onopen = function () {
        console.log("Socket connected");
        resolve(_this);
      };
      socket.onerror = function (err) {
        console.log("Socket error");
        reject(err);
      };
      socket.onmessage = function (event) {
        // string msg
        if(!(event.data instanceof ArrayBuffer))
          alert(event.data)
        // binary msg
        else {
          var reader = new GameStream(event.data);
          PacketHandler.handle(reader)
          reader = null;
        }
      };
      socket.onclose = function (event) {
        if (event.wasClean) {
          console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
          console.log('[close] Connection died');
        }
      };
    });
  }
}