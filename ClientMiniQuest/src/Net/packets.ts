class IncomingPacket {

    static World: number = 1
    static ChunkMap: number = 2
    static Chunk: number = 3
    static Tile: number  = 4
    static Unit: number = 5
    static PlayerMapData:number = 6
    static UserData:number = 7
}

class OutgoingPacket {
    static Auth: number = 1
}

var e = {
    Incoming: IncomingPacket,
    Outgoing: OutgoingPacket
}

export default e