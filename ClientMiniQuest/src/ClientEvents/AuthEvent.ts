import GameStream from "../Net/game-stream";
import ClientEvent from "./ClientEvent";
import Packet from "../Net/packets"

export default class AuthEvent extends ClientEvent{

    token:string
    
    constructor(token) {
        super()
        this.token = token;
    }

    public getPacketId(): number {
        return Packet.Outgoing.Auth;
    }

    serialize(stream:GameStream) {
        stream.writeString(this.token);
    }
}