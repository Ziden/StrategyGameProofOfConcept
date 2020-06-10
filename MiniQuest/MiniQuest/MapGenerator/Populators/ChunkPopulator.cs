using System;
namespace MiniQuest.Generator.Populators
{
    public abstract class ChunkPopulator
    {
        public abstract void Populate(WorldMap w, Chunk c);
    }
}
