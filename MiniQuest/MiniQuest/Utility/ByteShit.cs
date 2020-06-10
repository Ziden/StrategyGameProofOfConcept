using System;
using System.Collections.Generic;

namespace MiniQuest.SpeedMath
{
    public static class ByteShit
    {
        public static Random rnd = new Random();

        public static string ToBitsString(this byte value)
        {
            return Convert.ToString(value, 2).PadLeft(8, '0');
        }

        public static byte GenerateByteId(List<byte> used)
        {
            if(used.Count > 255)
            {
                throw new Exception("Internal ID full");
            }
            var n = (byte)rnd.Next(0, 256);
            while (used.Contains(n))
            {
                n = (byte)rnd.Next(0, 256);
            }

            return n;
        }

        public static int BitsRequired(this int num)
        {
            const int mask = Int32.MinValue;
            int leadingZeros = 0;
            for (; leadingZeros < 32; leadingZeros++)
            {
                if ((num & mask) != 0)
                    break;
                num <<= 1;
            }
            return 32 - leadingZeros;
        }

        public static byte [] ToByte(this ushort n)
        {
            return BitConverter.GetBytes(n);
        }

        public static byte[] ToByte(this int n)
        {
            return BitConverter.GetBytes(n);
        }
    }
}
