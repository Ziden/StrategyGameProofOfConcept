
using MiniQuest.Net;

namespace MiniQuest.Api.EventBus
{
    public abstract class ClientEvent : Event, IByteReadable
    {
        public Player Player;

        public abstract IncomingPacketType ReceivePacketId { get; }

        public abstract IByteReadable Deserialize(GameStream stream);

        public ClientEvent(Player p)
        {
            this.Player = p;
        }
    }
}
