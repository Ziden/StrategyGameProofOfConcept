using System;
using System.Collections.Generic;
using MiniQuest.Net;
using MiniQuest.Utility;

namespace MiniQuest.Map
{
    public class WorldPlayers
    {
        public int MaxPlayers;

        private DynamicByteMap<Player> _players = new DynamicByteMap<Player>();
        private Dictionary<Guid, byte> _internalIds = new Dictionary<Guid, byte>();

        public Player GetPlayer(byte id)
        {
            return this._players.Get(id);
        }

        public Player GetPlayer(Guid id)
        {
            if (!this._internalIds.ContainsKey(id))
                return null;
            var internalId = this._internalIds[id];
            return this._players.Get(internalId);

        }

        public bool IsPlayer(Guid id)
        {
            return this._internalIds.ContainsKey(id);
        }

        public byte AddPlayer(Player p)
        {
            if (IsFull())
            {
                throw new Exception("Max players on this map");
            }
            var internalID = _players.Add(p);
            _internalIds.Add(p.Id, internalID);
            return internalID;
        }

        public bool IsFull()
        {
            return _players.Size() >= MaxPlayers;
        }
    }
}
