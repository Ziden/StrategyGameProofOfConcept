using System;
using System.Collections.Generic;
using MiniQuest.Generator.Populators;

namespace MiniQuest.Generator
{
    public class Worldgen
    {
        public static Random rnd;
        public WorldMap world;

        public List<ChunkPopulator> Populators = new List<ChunkPopulator>();

        private int _seed;
       
        public Worldgen(WorldMap w)
        {
            world = w;
        }

        public void Generate(int seed = 0)
        {
            if (seed == 0)
                _seed = new Random().Next(0, ushort.MaxValue);
            else
                _seed = seed;
            rnd = new Random(_seed);
            world.Seed = (ushort)_seed;
            Log.Info("Generated Seed " + _seed);
            var size = world.GetSize();
            Log.Debug($"Generating world {size}x{size} for {world.Players.MaxPlayers} players");
            GenerateTiles();
            // generateTemperatures();
            // geneerateTerrain();
            PopulateChunks();
        }

        public void GenerateTiles()
        {
            var maxChunkX = world.GetSize() >> WorldMap.CHUNK_SIZE_BITSHIFT;
            for (var chunkX = 0; chunkX < maxChunkX; chunkX++)
            {
                for (var chunkY = 0; chunkY < maxChunkX; chunkY++)
                {
                    var chunk = new Chunk(world, chunkX, chunkY);
                    for (var x = 0; x < WorldMap.CHUNK_SIZE; x++)
                    {
                        for (var y = 0; y < WorldMap.CHUNK_SIZE; y++)
                        {
                            var tileX = chunkX * WorldMap.CHUNK_SIZE + x;
                            var tileY = chunkY * WorldMap.CHUNK_SIZE + y;
                            world.TileGrid[tileX, tileY] = new Tile(chunk, tileX, tileY);
                        }
                    }
                    chunk.CopyTiles(world, chunkX, chunkY);
                    world.ChunkGrid.Add(chunk);
                }
            }
        }

        public void PopulateChunks()
        { 
            foreach(var chunk in world.ChunkGrid.Iterator())
                foreach(var populator in Populators)
                    populator.Populate(world, chunk);
        }
    }
}
