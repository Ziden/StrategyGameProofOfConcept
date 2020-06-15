
import GameStream from "./game-stream"
import GameScene from "../GameScene/game"

var handlers = {}

export default {

    // after packet is received
    handle(reader: GameStream){
        var id = reader.readByte();
        if(id in handlers) {
            console.log("Handling Packet "+id);
            handlers[id](reader);
            GameScene.proccessDeltas();
        } else {
            console.log("Packet id "+id+" has no handler");
        }
    },
    
    registerHandler(id:number, handler:Function) {
        handlers[id] = handler;
        console.log("Registered packet handler "+id);
    }
  
}
