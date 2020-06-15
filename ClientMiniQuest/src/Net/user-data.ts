import Guid from "./guid";
import GameStream from "./game-stream";

export default class UserData {

    static ClientUserData: UserData

    userId: Guid
    internalMapId: number

    deserialize(stream: GameStream) {
        this.internalMapId = stream.readByte();
        this.userId = stream.readGuid()
    }

}