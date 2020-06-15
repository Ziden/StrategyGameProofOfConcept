using MiniQuest.Map;
using System;
namespace MiniQuest
{
    public static class Debug
    {
        public static void PrintAscii(this WorldMap w)
        {
            for (var x = 0; x < w.GetSize(); x++)
            {
                for (var y = 0; y < w.GetSize(); y++)
                {
                    var tile = w.TileGrid[x, y];

                    if (tile == null)
                        Console.Write("N");
                    else if (tile.Building == (byte)BuildingID.CITY_CENTRE)
                        Console.Write("^");
                    else if (tile.HasTerrainData(TerrainData.FOREST))
                        Console.Write("|");
                    else if (tile.HasTerrainData(TerrainData.BUSHES))
                        Console.Write("B");
                    else if (tile.HasTerrainData(TerrainData.MOUNTAIN))
                        Console.Write("A");
                    else
                        Console.Write("-");
                }
                Console.Write("\n");
            }
        }
    }
}
