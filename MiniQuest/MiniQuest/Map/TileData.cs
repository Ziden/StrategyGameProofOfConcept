using System;
namespace MiniQuest
{
    public enum TerrainData
    {
        FOREST =   0b_0000_0001,
        MOUNTAIN = 0b_0000_0010,
        WATER =    0b_0000_0100,
        DESERT =   0b_0000_1000,
        RIVER =    0b_0001_0000,
        BUSHES =   0b_0010_0000,
        HILL =     0b_0100_0000
    }

    /*
     * WOOD
     * METAL
     * STONE
     * FABRIC
     * NATURAL
     * LUXURY
     * 
     */
    public enum Resources
    {
        // WOODS
        OAK=0,
        CEDAR=1,
        EUCALIPTUS=2


    }
}
