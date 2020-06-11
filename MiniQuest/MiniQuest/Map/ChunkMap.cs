using System.Collections.Generic;
using MiniQuest.Net;

namespace MiniQuest
{
    public class ChunkMap : IByteWritable
    {
        public OutgoingPacketType SendPacketId => OutgoingPacketType.ChunkMap;

        public Chunk[,] Map;

        public Dictionary<ChunkFlag, List<Chunk>> ByFlags = new Dictionary<ChunkFlag, List<Chunk>>();

        public ChunkMap(int sizeX, int sizeY)
        {
            Map = new Chunk[sizeX, sizeY];
            Log.Debug($"Initialized chunk map {sizeX}x{sizeY}");
        }

        public void Add(Chunk c)
        {
            Log.Debug($"Adding chunk {c.X} {c.Y}");
            Map[c.X, c.Y] = c;
        }

        public void SetFlag(int chunkX, int chunkY, ChunkFlag flag)
        {
            var chunk = this.Map[chunkX, chunkY];
            chunk.Flags = chunk.Flags |= (byte)flag;
            if(!ByFlags.ContainsKey(flag))
                ByFlags.Add(flag, new List<Chunk>());
            ByFlags[flag].Add(chunk);
        }

        public IEnumerable<Chunk> Iterator()
        {
            for (var x = 0; x < Map.GetLength(0); x++)
                for (var y = 0; y < Map.GetLength(1); y++)
                    yield return Map[x, y];
        }

        public void Serialize(GameStream writer)
        {
            writer.Write((ushort)Map.GetLength(0));
            writer.Write((ushort)Map.GetLength(1));
            for (var x = 0; x < Map.GetLength(0); x++)
                for (var y = 0; y < Map.GetLength(1); y++)
                    Map[x, y].Serialize(writer);
        }
    }
}
