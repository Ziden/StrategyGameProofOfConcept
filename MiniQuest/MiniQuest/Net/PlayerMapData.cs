using System.Collections.Generic;
using MiniQuest.Map;

namespace MiniQuest.Net
{
    public class PlayerMapData
    {
        public byte InternalPlayerId;
        public List<Unit> Units = new List<Unit>();
        public List<Tile> Owned = new List<Tile>();

        public PlayerMapData(byte internalId)
        {
            this.InternalPlayerId = internalId;
        }
    }
}
