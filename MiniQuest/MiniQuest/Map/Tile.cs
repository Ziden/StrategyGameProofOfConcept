using MiniQuest.Net;

namespace MiniQuest
{
    public class Tile : IByteWritable
    {
        public OutgoingPacketType SendPacketId => OutgoingPacketType.Tile;

        public byte TerrainData;
        public byte ResourceData;
        public byte Building;
        public byte Owner;

        public Tile(Chunk c, int x, int y)
        {
            this.chunk = c;
            this.x = (ushort)x;
            this.y = (ushort)y;
        }

        public Chunk chunk;
        public ushort x;
        public ushort y;

        public void AddTerrainData(TerrainData data)
        {
            TerrainData = TerrainData |= (byte)data;
        }

        public bool HasTerrainData(TerrainData data)
        {
            return (TerrainData & (byte)data) != 0;
        }

        public void Serialize(GameStream writer)
        {
            writer.Write(TerrainData);
            writer.Write(ResourceData);
            writer.Write(Building);
            writer.Write(Owner);
        }
    }
}
