import GameStream from "../Net/game-stream"
import WorldMap from "./world-map";
import WorldDebug from "../Debug/world-debug"
import PacketHandler from "../Net/packet-handler"
import Packet from "../Net/packets";
import GameScene from "../GameScene/game"
import WorldRenderer from "../Render/world-renderer";

export default {
    register() {
        PacketHandler.registerHandler(Packet.Incoming.World, this.worldPacket)
    },

    worldPacket(reader: GameStream) {
        console.log("Received world packet");
        var world = new WorldMap();
        world.deserialize(reader);
        GameScene.worldRenderer.render(world);
    }
}
