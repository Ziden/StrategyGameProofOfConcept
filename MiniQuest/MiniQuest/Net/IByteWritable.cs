using System;
using System.IO;

namespace MiniQuest.Net
{
    public interface IByteReadable
    {
        IByteReadable ReadFrom(GameStream stream);

        IncomingPacketType ReceivePacketId { get; }
    }
}
