
using System;
using MiniQuest.Generator;
using MiniQuest.Generator.Populators;
using MiniQuest.Map;

namespace MiniQuest
{
	public class Server
	{

		public static void Main(string [] args)
        {
			Console.WriteLine("Starting Mini Quest Server");

			var qtdPlayers = 2;
			var map = new WorldMap(qtdPlayers);

			var worldGen = new Worldgen(map);
			worldGen.Populators.Add(new NewbieChunkPopulator());
			worldGen.Generate();
			map.PrintAscii();

			new PacketHandler();
			new MapListener(map);

			var server = new SocketServer();
			server.Start("http://+:8080/server/");

			Console.WriteLine("Registering Listeners");
			Console.WriteLine("Server running");
			Console.ReadLine();
        }
	}
}
