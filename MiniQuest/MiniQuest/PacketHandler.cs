using System;
using System.Collections.Generic;
using MiniQuest.Api.EventBus;
using MiniQuest.Net;
using MiniQuest.Net.Events;

namespace MiniQuest
{
    public class PacketHandler
    {
        public static event Action<PlayerAuthEvent> OnPlayerAuth;

        private static List<Func<int>> DueEvents = new List<Func<int>>();

        public static void ProccessReceivedPackets()
        {
            foreach(var run in DueEvents)
            {
                run();
            }
        }

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
                    ev.ReadFrom(stream);
                    Func<int> runEvent = () => {
                        OnPlayerAuth(ev);
                        return 1;
                    };
                    //DueEvents.Add(runEvent);      
                    runEvent();
                    break;
            }
        }

    }
}
