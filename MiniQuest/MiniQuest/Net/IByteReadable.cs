using System;
namespace MiniQuest.Net
{
    public interface IByteWritable
    {
        public abstract void Serialize(GameStream writer);

        public abstract OutgoingPacketType SendPacketId { get; }
    }
}
