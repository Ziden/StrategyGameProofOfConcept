using System;
using MiniQuest.Net;
using MiniQuest.Net.Events;

namespace MiniQuest.Map
{
    public class MapListener
    {
        WorldMap map;

        public MapListener(WorldMap map) {
            this.map = map;
            PacketHandler.OnPlayerAuth += OnPlayerAuth;
            Log.Info("Map Listener Registered");
        }

        private void OnPlayerAuth(PlayerAuthEvent ev)
        {
            Log.Debug("RECEIVED TOKEN " + ev.Token);
            if(ev.Token=="debug")
            {
                ev.Token = Guid.NewGuid().ToString();
            }
 
            Guid.TryParse(ev.Token, out ev.Player.Id);
            var existingPlayer = map.Players.GetPlayer(ev.Player.Id);
            if(existingPlayer == null)
            {
                if (map.Players.IsFull())
                {
                    Log.Info($"Disconnecting player {ev.Player}");
                    ev.Player.Disconnect("Map is Full");
                    return;
                }
                var internalId = map.Players.AddPlayer(ev.Player);
                ev.Player.MapData = new PlayerMapData(internalId);
                Log.Debug($"New player {ev.Player.ToString()} joining map");
                ev.Player.SendPacket(map);
            } else
            {
                Log.Debug($"Player {ev.Player.ToString()} logged back in");
                ev.Player.SendPacket(map);
            }
        }
    }
}
