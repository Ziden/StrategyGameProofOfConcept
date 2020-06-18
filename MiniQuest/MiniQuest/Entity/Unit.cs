using MiniQuest.Entity;
using MiniQuest.Net;
using RandomNameGeneratorLibrary;
using System;

namespace MiniQuest.Map
{

    public enum UnitDeltaFlags
    {

    }

    public class Unit : MapEntity, IByteWritable
    {
        public OutgoingPacketType SendPacketId => OutgoingPacketType.Unit;

        public static PersonNameGenerator NameGen = new PersonNameGenerator();
        private static Random _rnd = new Random();

        private byte Deltas { get; set; }
        public Guid id { get; set; }
        public string Name { get; set; }
        public byte Sprite { get; set; }

        public static Unit CreateNew()
        {
            var unit = new Unit();
            unit.Name = NameGen.GenerateRandomFirstName();
            unit.Sprite = 1;
            unit.id = Guid.NewGuid();
            return unit;
        }

        public void WriteTo(GameStream writer, Player player, byte deltas=0)
        {
            writer.Write(x);
            writer.Write(y);
            writer.WriteByte(Sprite);
            writer.Write(id);
            writer.Write(this.Controller.MapData.InternalPlayerId);
            if(this.Controller==player)
            {
                writer.WriteString(this.Name);
            }
        }
    }
}
