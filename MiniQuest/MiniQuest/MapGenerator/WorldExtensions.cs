
namespace MiniQuest.Generator
{
    public static class WorldExtensions
    {
        public static (ushort, ushort)? FindTileWithout(this Tile[,] tiles, params TerrainData[] data)
        {
            var tries = 10;
            while (tries > 0)
            {
                var rndX = Worldgen.rnd.Next(0, tiles.GetLength(0));
                var rndY = Worldgen.rnd.Next(0, tiles.GetLength(1));
                var tile = tiles[rndX, rndY];
                var allGood = true;
                foreach (var terrainData in data)
                {
                    if (tile.HasTerrainData(terrainData))
                    {
                        allGood = false;
                        break;
                    }
                }
                if (allGood)
                    return ((ushort)rndX, (ushort)rndY);
                tries--;
            }
            return null;
        }
    }
}
