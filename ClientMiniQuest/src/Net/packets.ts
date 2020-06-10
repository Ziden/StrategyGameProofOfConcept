class IncomingPacket {

    static World: number = 1
    static Chunk: number = 2
    static Tile: number  = 3
}

class OutgoingPacket {

    static Auth: number = 1

}

var e = {
    Incoming: IncomingPacket,
    Outgoing: OutgoingPacket
}

export default e