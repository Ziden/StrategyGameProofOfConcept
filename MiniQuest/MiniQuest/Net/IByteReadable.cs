using System;
namespace MiniQuest.Net
{
    public interface IByteWritable
    {
        void WriteTo(GameStream writer, Player observer, byte deltaFlags = 0);

        OutgoingPacketType SendPacketId { get; }
    }
}
