using MiniQuest.Map;
using MiniQuest.SpeedMath;

namespace MiniQuest.Generator.Populators
{
    public class NewbieChunkPopulator : ChunkPopulator
    {
        int tries = WorldMap.PLAYERS_CHUNKS;
        int wait = 0;

        public override void Populate(WorldMap w, Chunk c)
        {
            if (!ShouldPopulate(c))
            {
                Log.Debug($"Skipping {c.ToString()}");
                return;
            }

            Log.Debug($"Populating {c.ToString()}");
            w.ChunkGrid.SetFlag(c.X, c.Y, ChunkFlag.STARTING_CHUNK);

            var bushes = WorldMap.CHUNK_SIZE;
            AddRandomTerrain(w, c, bushes, TerrainData.BUSHES);

            var forests = WorldMap.CHUNK_SIZE;
            AddRandomTerrain(w, c, forests, TerrainData.FOREST);

            var mountains = WorldMap.CHUNK_SIZE/2;
            AddRandomTerrain(w, c, mountains, TerrainData.MOUNTAIN, TerrainData.FOREST);

            var hills = WorldMap.CHUNK_SIZE;
            AddRandomTerrain(w,c, hills, TerrainData.HILL, TerrainData.MOUNTAIN);

            var water = WorldMap.CHUNK_SIZE/4;
            AddRandomTerrain(w, c, water, TerrainData.WATER, TerrainData.MOUNTAIN, TerrainData.FOREST);

            // TODO: Make River
            //var centreCoords = c.Tiles.FindTileWithout(TerrainData.WATER);
            //w.Build(c.GetTile(centreCoords.Value), Building.CITY_CENTRE);
        }

        public void Debug(WorldMap w, Chunk c)
        {
            for(var i = 0; i < WorldMap.CHUNK_SIZE; i++)
            {
                c.Tiles[i, 0].AddTerrainData(TerrainData.FOREST);
                c.Tiles[0, i].AddTerrainData(TerrainData.FOREST);
                c.Tiles[i, WorldMap.CHUNK_SIZE-1].AddTerrainData(TerrainData.FOREST);
                c.Tiles[WorldMap.CHUNK_SIZE-1, i].AddTerrainData(TerrainData.FOREST);
            }
        }

        public void AddRandomTerrain(WorldMap w, Chunk c, int amt, params TerrainData [] not)
        {
            
            for (var i = 0; i < amt; i++)
            {
                var coords = c.Tiles.FindTileWithout(not);
                if (coords.HasValue)
                {
                    c.GetTile(coords.Value).AddTerrainData(not[0]);

                    if(not[0]==TerrainData.BUSHES)
                    {
                        var tile = w.GetTile(coords.Value);
                        var hasBush = tile.HasTerrainData(TerrainData.BUSHES);
                        var hasForest = tile.HasTerrainData(TerrainData.FOREST);
                        var bits = tile.TerrainData.ToBitsString();
                    }
                }
            }
        }

        public bool ShouldPopulate(Chunk c)
        {
            wait--;
            if(wait > 0)
            {
                return false;
            }

            var rnd = Worldgen.rnd.Next(tries);
            if(rnd==0)
            {
                wait = tries;
                tries = WorldMap.PLAYERS_CHUNKS;
                return true;
            } else
            {
                tries--;
                return false;
            }
        }
    }
}
