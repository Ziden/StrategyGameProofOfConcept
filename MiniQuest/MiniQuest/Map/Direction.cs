using System;
using System.Collections.Generic;
using System.Linq;

namespace MiniQuest
{
    public enum Direction
    {
        NORTH, SOUTH, EAST, WEST
    }

    public static class DirectionExtensions
    {
        public static List<Direction> ALL = new List<Direction>(
            new Direction[] { Direction.EAST, Direction.NORTH, Direction.SOUTH, Direction.WEST }
        );

        public static Direction RandomDir(Random rnd, params Direction [] exclude)
        {
            var toRandom = ALL.Except(exclude).ToArray();
            return toRandom[rnd.Next(0, toRandom.Length - 1)];
        }
    }
}
