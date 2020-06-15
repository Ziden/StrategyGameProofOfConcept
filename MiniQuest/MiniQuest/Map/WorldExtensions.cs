using System;
using System.Collections.Generic;
using System.Text;

namespace MiniQuest.Map
{
    public static class WorldExtensions
    {
        public static bool ValidCoords(this WorldMap map, ushort x, ushort y)
        {
            return x >= 0 && x < map.GetSize() && y >= 0 && y < map.GetSize();
        }

        public static IEnumerable<Tile> GetAOE(this Tile tile, ushort radius)
        {
            var world = tile.Chunk.World;
            var x = tile.x;
            var y = tile.y;
            for(var xx = x-radius; xx <= x+radius; xx++)
            {
                for (var yy = y - radius; yy <= y + radius; yy++)
                {
                    if(world.ValidCoords((ushort)xx, (ushort)yy))
                        yield return world.TileGrid[xx, yy];
                }
            }
        }
    }
}
