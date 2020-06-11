using MiniQuest.Api.EventBus;

namespace MiniQuest.Net.Events
{
    public class PlayerAuthEvent : ClientEvent
    {
        public string Userid;

        public override IncomingPacketType ReceivePacketId => IncomingPacketType.Token;

        public override IByteReadable Deserialize(GameStream stream)
        {
            this.Userid = stream.ReadString();
            return this;
        }

        public PlayerAuthEvent(Player p) : base(p) { }
    }
}
