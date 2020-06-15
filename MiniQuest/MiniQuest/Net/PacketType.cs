namespace MiniQuest.Net
{
    public enum OutgoingPacketType
    {
       World = 1,
       ChunkMap = 2,
       Chunk = 3,
       Tile = 4,
       Unit = 5,
       PlayerMapData = 6,
       UserData = 7
    }

    public enum IncomingPacketType
    {
        Token = 1
    }
}
