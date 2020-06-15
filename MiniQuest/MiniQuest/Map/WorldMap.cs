using System;
using MiniQuest.Entity;
using MiniQuest.Generator.Populators;
using MiniQuest.Map;
using MiniQuest.Net;
using MiniQuest.SpeedMath;

namespace MiniQuest
{
    public class WorldMap : IByteWritable
    {
        public OutgoingPacketType SendPacketId => OutgoingPacketType.World;

        public static int CHUNK_SIZE = 8;
        public static int CHUNK_SIZE_BITSHIFT = CHUNK_SIZE.BitsRequired() - 1;
        public static int TILES_IN_CHUNK = CHUNK_SIZE * CHUNK_SIZE;
        public static int PLAYERS_CHUNKS = 2;
 
        public ushort Seed { get; set; }
        public ChunkMap ChunkGrid { get; set; }
        public WorldPlayers Players { get; set; }
        public WorldUnits Units { get; set; }
        public FogOfWar Fog { get; set; }


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
            Fog = new FogOfWar(this);
            Units = new WorldUnits(this);
        }

        public Tile GetTile((ushort, ushort) pos)
        {
            return TileGrid[pos.Item1, pos.Item2];
        }

        public int GetSize()
        {
            return TileGrid.GetLength(0);
        }

        public void Build(Player player, BuildingID id, Tile t)
        {
            Log.Debug($"Player {player} building {id} on tile {t}");
            var building = new Building()
            {
                id = id,
                LineOfSight = 4,
                x = t.x,
                y = t.y,
                Controller = player
            };
            t.Chunk.Buildings.Add(building);
            t.Building = (byte)id;
            t.Owner = Players.GetInternalId(player);
            player.MapData.Buildings.Add(building);
            Fog.AddSight(building);
        }

        public void CreatePlayer(Player player)
        {
            if (this.Players.IsFull())
                player.Disconnect("Map is Full");
            else
            {
                var internalId = this.Players.AddPlayer(player);
                NewbieChunkPopulator.CreateNewPlayer(player, this);
            }        
        }

        public void WriteTo(GameStream writer, Player player, byte deltas = 0)
        {
            writer.Write(1); //version
            writer.Write((ushort)CHUNK_SIZE);
            writer.Write(Seed);
            ChunkGrid.WriteTo(writer, player);
        }

    }
}
