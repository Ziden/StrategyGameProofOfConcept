using System;
namespace MiniQuest.Net
{
    public interface IByteWritable
    {
        void Serialize(GameStream writer);

        OutgoingPacketType SendPacketId { get; }
    }
}
