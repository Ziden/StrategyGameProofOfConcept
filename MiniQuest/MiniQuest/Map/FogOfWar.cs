using MiniQuest.Entity;

namespace MiniQuest.Map
{
    public class FogOfWar
    {
        public static ushort DEFAULT_BUILDING_LOS = 4;

        private WorldMap _map;

        public FogOfWar(WorldMap map)
        {
            this._map = map;
        }

        public void AddSight(MapEntity entity)
        {
            var tile = _map.GetTile((entity.x, entity.y));
            foreach (var nearTile in tile.GetAOE(entity.LineOfSight))
            {
                nearTile.VisibleTo.Add(entity.Controller);
            }
        }
    }
}
