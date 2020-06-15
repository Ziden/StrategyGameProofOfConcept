
using System;
using System.Threading;
using MiniQuest.GameData;
using MiniQuest.Generator;
using MiniQuest.Generator.Populators;
using MiniQuest.Map;

namespace MiniQuest
{
	public class Server
	{

        public static GameSpec GameData;

		public static void Main(string [] args)
        {
			Console.WriteLine("Starting Mini Quest Server");

            Log.Info("Loading Game Data");
            GameData = new GameSpec();
            //GameData.LoadGameData();

            var qtdPlayers = 4;
			var map = new WorldMap(qtdPlayers);
            Log.Info("Generating World");
			var worldGen = new Worldgen(map);
			worldGen.Populators.Add(new NewbieChunkPopulator());
			worldGen.Generate();
            //map.PrintAscii();

            Log.Info("Registering Listeners");
			new PacketHandler();
			new MapListener(map);

			var server = new SocketServer();
			server.Start();

			Console.WriteLine("Registering Listeners");
			Console.WriteLine("Server running");

            var tick = new ServerTicks();
            tick.StartTicks();
        }  
	}
}
