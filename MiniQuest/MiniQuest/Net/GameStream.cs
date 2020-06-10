using System.IO;
using System.Text;
using MiniQuest.SpeedMath;

namespace MiniQuest.Net
{
    public class GameStream : MemoryStream
    {
        public GameStream(): base()
        { }

        public GameStream(byte[] bytes) : base(bytes) { }

        public ushort ReadUshort()
        {
            return (ushort)(
                this.ReadByte() | this.ReadByte()
            );
        }

        public string ReadString()
        {
            var size = this.ReadUshort();
            Log.Debug("Reading string size " + size);
            var stringBytes = new byte[size];
            this.Read(stringBytes);
            return Encoding.UTF8.GetString(stringBytes);
        }

        public void WriteString(string s)
        {
            var bytes = Encoding.UTF8.GetBytes(s);
            this.Write((ushort)bytes.Length);
            this.Write(bytes);
        }

        public void Write(ushort n)
        {
            this.Write(n.ToByte());
        }

        public void Write(byte n)
        {
            this.WriteByte(n);
        }

        public byte [] GetBytes()
        {
            return this.GetBuffer();
        }

        public void GoToBegining()
        {
            this.Seek(0, SeekOrigin.Begin);
        }
    }
}
