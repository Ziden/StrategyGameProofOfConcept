using System;
using System.Collections.Generic;
using MiniQuest.Map;
using MiniQuest.Net;

namespace MiniQuest
{
    public enum ChunkFlag
    {
        STARTING_CHUNK = 0b00000001
    }

    public class Chunk : IByteWritable
    {
        public OutgoingPacketType SendPacketId => OutgoingPacketType.Chunk;

        public byte Flags;
        public ushort X;
        public ushort Y;

        public Tile[,] Tiles;

        public List<Tile> Buildings = new List<Tile>();

        public Chunk(WorldMap w, int x, int y)
        {
            this.X = (ushort)x;
            this.Y = (ushort)y;
            Tiles = new Tile[WorldMap.CHUNK_SIZE, WorldMap.CHUNK_SIZE];
        }

        public void CopyTiles(WorldMap w, int x, int y)
        {
            var chunkIndexX = x * WorldMap.CHUNK_SIZE;
            var chunkIndexY = y * WorldMap.CHUNK_SIZE;
            for (var xi = 0; xi < WorldMap.CHUNK_SIZE; xi++)
            {
                for (var yi = 0; yi < WorldMap.CHUNK_SIZE; yi++)
                {
                    Tiles[xi, yi] = w.TileGrid[xi + chunkIndexX, yi + chunkIndexY];
                }
            }
        }

        public Tile GetTile((ushort, ushort) pos)
        {
            return Tiles[pos.Item1, pos.Item2];
        }

        public bool HasFlag(ChunkFlag flag)
        {
            return (Flags & (byte)flag) == 1;
        }

        public override String ToString()
        {
            return $"<Chunk x={X} y={Y}>";
        }

        public void Serialize(GameStream writer)
        {
            writer.Write(X);
            writer.Write(Y);
            for(var x = 0; x < WorldMap.CHUNK_SIZE; x++)
                for (var y = 0; y < WorldMap.CHUNK_SIZE; y++)
                    Tiles[x, y].Serialize(writer);
        }
    }
}
