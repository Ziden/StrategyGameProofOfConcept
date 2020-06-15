using System.Collections.Generic;
using MiniQuest.Entity;
using MiniQuest.Map;

namespace MiniQuest.Net
{
    public class MapPlayerData
    {
        public OutgoingPacketType SendPacketId => OutgoingPacketType.PlayerMapData;

        public byte InternalPlayerId;
        public List<Unit> Units = new List<Unit>();
        public List<Building> Buildings = new List<Building>();

        public MapPlayerData(byte internalId)
        {
            this.InternalPlayerId = internalId;
        }
    }
}
