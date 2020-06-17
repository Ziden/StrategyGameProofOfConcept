import GameStream from "../Net/game-stream"
import Guid from "../Net/guid";
import UserData from "../Net/user-data";

export default class Unit {

    static DeltaFlagged:Array<Unit> = [];

    x:number
    y:number
    sprite:number
    id:Guid
    ownerInternalId:number
    name: string

    // flags renderer to update the unit
    flagDelta() {
        Unit.DeltaFlagged.push(this);
    }

    deserialize(stream:GameStream) {
        this.x = stream.readUshort();
        this.y = stream.readUshort();
        this.sprite = stream.readByte();
        this.id = stream.readGuid();
        this.ownerInternalId = stream.readByte();

        if(this.ownerInternalId==UserData.ClientUserData.internalMapId) {
            this.name = stream.readString();
            console.log("Reading name Name = "+this.name);
        }
      
    }

}