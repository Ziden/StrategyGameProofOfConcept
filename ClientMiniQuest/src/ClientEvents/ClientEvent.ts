import GameStream from "../Net/game-stream";

export default abstract class ClientEvent {

    public abstract getPacketId():number;

    public abstract serialize(stream:GameStream);
}