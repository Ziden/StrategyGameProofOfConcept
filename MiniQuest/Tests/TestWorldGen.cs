using NUnit.Framework;
using System;
namespace Tests
{
    [TestFixture()]
    public class TestWorldGen
    {

        [SetUp()]
        public void SetUp()
        {
            World w;
        }

        [Test()]
        public void TestGeneratingChunks()
        {
            var qtdPlayers = 4;
            var world = new World(qtdPlayers);

            var worldGen = new Worldgen(world);
            worldGen.Populators.Add(new NewbieChunkPopulator())
            worldGen.Generate();
        }
    }
}
