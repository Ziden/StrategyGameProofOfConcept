import IncomingPacket from "./packets"
import GameStream from "./game-stream"
import WorldMap from "../WorldMap/world-map"
import WorldDebug from "../Debug/world-debug";

var handlers = {}

export default {
    handle(reader: GameStream){
        var id = reader.readByte();
        if(id in handlers) {
            handlers[id](reader);
        } else {
            console.log("Packet id "+id+" has no handler");
        }
    },
    registerHandler(id:number, handler:Function) {
        handlers[id] = handler;
        console.log("Registered packet handler "+id);
    }
  
}
