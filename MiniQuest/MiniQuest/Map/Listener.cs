using System;
using MiniQuest.Generator.Populators;
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

        private void OnPlayerAuth(PlayerAuthEvent authEv)
        {
            if(authEv.Token=="debug")
                authEv.Token = Guid.NewGuid().ToString();
 
            Guid.TryParse(authEv.Token, out authEv.Player.Id);

            var existingPlayer = map.Players.GetPlayer(authEv.Player.Id);
            if(existingPlayer != null)
            {
                existingPlayer.Socket = authEv.Player.Socket;
                authEv.UserId = existingPlayer.Id;
                authEv.InternalMapId = existingPlayer.MapData.InternalPlayerId;
                existingPlayer.SendPacket(authEv);
                existingPlayer.SendPacket(map);
                Log.Info($"Player {existingPlayer.ToString()} logged back in");
            } else
            {
                map.CreatePlayer(authEv.Player);
                authEv.UserId = authEv.Player.Id;
                authEv.InternalMapId = authEv.Player.MapData.InternalPlayerId;
                authEv.Player.SendPacket(authEv);
                authEv.Player.SendPacket(map);
                Log.Info($"New player {authEv.Player.ToString()} created");
            }
        }
    }
}
