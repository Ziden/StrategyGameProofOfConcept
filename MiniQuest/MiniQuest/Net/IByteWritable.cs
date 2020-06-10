using System;
using System.IO;

namespace MiniQuest.Net
{
    public interface IByteReadable
    {
        public abstract IByteReadable Deserialize(GameStream stream);

        public abstract IncomingPacketType ReceivePacketId { get; }
    }
}
