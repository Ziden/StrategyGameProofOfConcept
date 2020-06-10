using System;
namespace MiniQuest.SpeedMath
{
    public static class ArrayUtils
    {
        public static T[] Slice<T>(this T[] source, int fromIdx, int toIdx)
        {
            T[] ret = new T[toIdx - fromIdx + 1];
            for (int srcIdx = fromIdx, dstIdx = 0; srcIdx <= toIdx; srcIdx++)
            {
                ret[dstIdx++] = source[srcIdx];
            }
            return ret;
        }

        public static T[,] Slice<T>(this T[,] source, int x1, int x2, int y1, int y2)
        {
            T[,] ret = new T[x2 - x1 + 1, y2 - y1 + 1];

            for (int srcIdxRank0 = x1, dstIdxRank0 = 0; srcIdxRank0 <= x2; srcIdxRank0++, dstIdxRank0++)
            {
                for (int srcIdxRank1 = y1, dstIdxRank1 = 0; srcIdxRank1 <= y2; srcIdxRank1++, dstIdxRank1++)
                {
                    ret[dstIdxRank0, dstIdxRank1] = source[srcIdxRank0, srcIdxRank1];
                }
            }
            return ret;
        }
    }
}
