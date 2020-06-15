using MiniQuest.Net;
using System;
using System.Collections.Generic;

namespace MiniQuest.Map
{
    public class WorldUnits
    {
        private Dictionary<Guid, Unit> Units = new Dictionary<Guid, Unit>();

        private WorldMap _map;

        public WorldUnits(WorldMap map)
        {
            _map = map;
        }

        public void SpawnUnit(Unit unit, Tile where, Player owner)
        {
            unit.x = where.x;
            unit.y = where.y;
            where.Units.Add(unit);
            owner.MapData.Units.Add(unit);
            unit.Controller = owner;
            Units.Add(unit.id, unit);
        }
    }
}
