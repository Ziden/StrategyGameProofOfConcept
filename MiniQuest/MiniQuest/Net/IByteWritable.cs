using System;
using System.IO;

namespace MiniQuest.Net
{
    public interface IByteReadable
    {
        IByteReadable Deserialize(GameStream stream);

        IncomingPacketType ReceivePacketId { get; }
    }
}
