using System;
using System.Collections.Generic;
using MiniQuest.Map;
using MiniQuest.Net;
using MiniQuest.SpeedMath;
using MiniQuest.Utility;

namespace MiniQuest
{
    public class WorldMap : IByteWritable
    {
        public OutgoingPacketType SendPacketId => OutgoingPacketType.World;

        public static int CHUNK_SIZE = 8;
        public static int CHUNK_SIZE_BITSHIFT = CHUNK_SIZE.BitsRequired() - 1;
        public static int TILES_IN_CHUNK = CHUNK_SIZE * CHUNK_SIZE;
        public static int PLAYERS_CHUNKS = 4;
 
        public ushort Seed { get; set; }
        public ChunkMap ChunkGrid { get; set; }
        public WorldPlayers Players { get; set; }

        // Cache final tile grid for faster acessing
        public Tile[,] TileGrid { get; set; }

        public WorldMap(int qtdPlayers)
        {
            var amtOfChunks = qtdPlayers * PLAYERS_CHUNKS;
            var amtOfTiles = amtOfChunks * TILES_IN_CHUNK;
            var arraySize = (int)Math.Ceiling(Math.Sqrt(amtOfTiles));
            var extraNeeded = CHUNK_SIZE - arraySize % CHUNK_SIZE;
            var tilesX = arraySize + extraNeeded;
            var tilesY = arraySize + extraNeeded;
            TileGrid = new Tile[tilesX, tilesY];
            ChunkGrid = new ChunkMap(tilesX/CHUNK_SIZE, tilesY/CHUNK_SIZE);
            Players = new WorldPlayers();
            Players.MaxPlayers = qtdPlayers;
        }

        public Tile GetTile((ushort, ushort) pos)
        {
            return TileGrid[pos.Item1, pos.Item2];
        }

        public int GetSize()
        {
            return TileGrid.GetLength(0);
        }

        public void Build(Tile t, Building building, byte owner)
        {
            t.chunk.Buildings.Add(t);
            t.Building = (byte)building;
            t.Owner = owner;
            var player = Players.GetPlayer(owner);
            player.MapData.Owned.Add(t);
        }

        public void Serialize(GameStream writer)
        {
            writer.Write(1); //version
            writer.Write((ushort)CHUNK_SIZE);
            writer.Write(Seed);
            ChunkGrid.Serialize(writer);
        }

    }
}
