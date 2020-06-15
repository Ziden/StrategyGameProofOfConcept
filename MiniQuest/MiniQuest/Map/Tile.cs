using MiniQuest.Map;
using MiniQuest.Net;
using System.Collections.Generic;

namespace MiniQuest
{
    public enum TileMetaFlags
    {
        IS_OWNED = 1 << 0,
        HAS_BUILDING = 1 << 1,
        HAS_RESOURCE = 1 << 2,
        IS_UNEXPLORED = 1 << 3,
        HAS_UNITS = 1 << 4
    }

    public class Tile : IByteWritable
    {
        public OutgoingPacketType SendPacketId => OutgoingPacketType.Tile;

        public byte TerrainData;
        public byte ResourceData;
        public byte Building;
        public byte Owner;
        public byte MetaFlags;

        public List<Unit> Units = new List<Unit>();
        public HashSet<Player> VisibleTo = new HashSet<Player>();
        public Chunk Chunk;
        public ushort x;
        public ushort y;

        public Tile(Chunk c, int x, int y)
        {
            this.Chunk = c;
            this.x = (ushort)x;
            this.y = (ushort)y;
        }

        public void AddTerrainData(TerrainData data)
        {
            TerrainData = TerrainData |= (byte)data;
        }

        public bool HasTerrainData(TerrainData data)
        {
            return (TerrainData & (byte)data) != 0;
        }

        public override string ToString()
        {
            return $"<Tile x={x} y={y} owner={Owner}>";
        }

        public bool IsVisibleTo(Player player)
        {
            return VisibleTo.Contains(player);
        }

        private bool HasMetaFlag(byte b, TileMetaFlags flag)
        {
            return (b & (byte)flag) != 0;
        }

        public void WriteTo(GameStream writer, Player player, byte deltas = 0)
        {
            byte metaFlags = 0;
            if(!IsVisibleTo(player))
            {
                metaFlags = metaFlags |= (byte)TileMetaFlags.IS_UNEXPLORED;
                writer.Write(metaFlags);
                return;
            } 

            if(Units.Count > 0)
                metaFlags = metaFlags |= (byte)TileMetaFlags.HAS_UNITS;
            if(ResourceData != 0)
                metaFlags = metaFlags |= (byte)TileMetaFlags.HAS_RESOURCE;
            if (Building != 0)
                metaFlags = metaFlags |= (byte)TileMetaFlags.HAS_BUILDING;
            if (Owner != 0)
                metaFlags = metaFlags |= (byte)TileMetaFlags.IS_OWNED;

            writer.Write(metaFlags);
            writer.Write(TerrainData);

            if(HasMetaFlag(metaFlags, TileMetaFlags.HAS_RESOURCE))
                writer.Write(ResourceData);

            if (HasMetaFlag(metaFlags, TileMetaFlags.HAS_BUILDING))
                writer.Write(Building);

            if (HasMetaFlag(metaFlags, TileMetaFlags.IS_OWNED))
                writer.Write(Owner);

            if(HasMetaFlag(metaFlags, TileMetaFlags.HAS_UNITS))
            {
                writer.WriteByte((byte)Units.Count);
                foreach(var unit in Units)
                {
                    unit.WriteTo(writer, player);
                }
            }
        }
    }
}
