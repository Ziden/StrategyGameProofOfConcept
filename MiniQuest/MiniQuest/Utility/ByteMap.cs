using System;
using System.Collections.Generic;
using System.Linq;

namespace MiniQuest.Utility
{
    public class DynamicByteMap<Type>
    {
        private Dictionary<byte, Type> _map = new Dictionary<byte, Type>();

        public byte Size()
        {
            return (byte)_map.Count;
        }

        public List<Type> Values()
        {
            var vl = _map.Values.ToList<Type>();
            return vl;
        }

        public byte Add(Type t)
        {
            byte key = GetNextFree();
            _map.Add(key, t);
            return key;
        }

        public Type Get(byte key)
        {
            return _map[key];
        }

        public void Remove(byte key)
        {
            _map.Remove(key);
            Free(key);
        }

        bool [] Used = new bool[256];

        public byte GetNextFree()
        {
            for (byte i = 0; i <= 255; i++)
            {
                if (!Used[i])
                {
                    Used[i] = true;
                    return i;
                }
            }
            throw new Exception("No free ids");
        }

        public void Free(byte id)
        {
            Used[id] = false;
        }
    }
}
