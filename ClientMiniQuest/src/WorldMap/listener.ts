import GameStream from "../Net/game-stream"
import PacketHandler from "../Net/packet-handler"
import Packet from "../Net/packets";
import GameScene from "../GameScene/game"
import Unit from "./unit";
import UserData from "../Net/user-data";

export default {
    register() {
        PacketHandler.registerHandler(Packet.Incoming.World, this.worldPacket)
        PacketHandler.registerHandler(Packet.Incoming.Unit, this.unitPacket)
        PacketHandler.registerHandler(Packet.Incoming.UserData, this.userDataPacket)
    },

    userDataPacket(reader: GameStream) {
        var userData = new UserData();
        userData.deserialize(reader);
        UserData.ClientUserData = userData;
        console.log("Received Player User Id "+userData.userId.toString());
    },

    worldPacket(reader: GameStream) {
        console.log("Received World Packet");
        GameScene.worldRenderer.map.deserialize(reader);
        // Todo: Change to delta
        GameScene.worldRenderer.render()
    },

    unitPacket(reader: GameStream) {
        console.log("Received Unit Packet wtf")
        var unit = new Unit();
        unit.deserialize(reader);
        unit.flagDelta();     
    }
}
