using System;
using MiniQuest.Generator.Populators;
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
            Log.Debug("On Player Auth");
            if(ev.Userid=="debug")
            {
                ev.Userid = Guid.NewGuid().ToString();
            }
 
            Guid.TryParse(ev.Userid, out ev.Player.Id);

            if (ev.Player.Id == null)
            {
                ev.Player.Disconnect("Invalid User");
                return;
            }

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
                NewbieChunkPopulator.CreateNewPlayer(ev.Player, map);

                Log.Info($"New player {ev.Player.ToString()} joining map");
                ev.Player.SendPacket(map);
            } else
            {
                Log.Info($"Player {ev.Player.ToString()} logged back in");
                ev.Player.SendPacket(map);
            }
        }
    }
}
