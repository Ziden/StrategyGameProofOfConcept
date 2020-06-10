using System;
using System.Collections.Generic;
using System.Reflection;
using MiniQuest.Api.EventBus;
using MiniQuest.Net;
using MiniQuest.Net.Events;

namespace MiniQuest
{
    public class PacketHandler
    {
        public static event Action<PlayerAuthEvent> OnPlayerAuth;
      
        // TODO: Create SYNC LIST and SERVER TICK to proccess
        public static void PacketsToClientEvents(Player player, GameStream stream)
        {
            // TODO: Make this generic
            var packetId = (IncomingPacketType)stream.ReadByte();
            Log.Debug($"Received packet {packetId} with {stream.Length} bytes");
            switch (packetId)
            {
                case IncomingPacketType.Token:
                    Log.Debug("PlayerAuthEvent");
                    var ev = new PlayerAuthEvent(player);
                    ev.Deserialize(stream);
                    OnPlayerAuth(ev);
                    break;
            }
        }

    }
}
