using MiniQuest.Api.EventBus;
using System;

namespace MiniQuest.Net.Events
{
    public class PlayerAuthEvent : ClientEvent, IByteWritable
    {
        public string Token;
        public Guid UserId;
        public byte InternalMapId;

        public override IncomingPacketType ReceivePacketId => IncomingPacketType.Token;

        public OutgoingPacketType SendPacketId => OutgoingPacketType.UserData;

        public override IByteReadable ReadFrom(GameStream stream)
        {
            this.Token = stream.ReadString();
            return this;
        }

        public void WriteTo(GameStream writer, Player player, byte deltaFlags = 0)
        {
            writer.Write(InternalMapId);
            writer.Write(UserId);
        }

        public PlayerAuthEvent(Player p) : base(p) { }
    }
}
