using System;
namespace MiniQuest
{
    public class Log
    {
        public enum LogLevel
        {
            DEBUG,
            INFO,
        }

        public static void Debug(string msg)
        {
            Console.WriteLine(msg);
        }

        public static void Error(string msg, Exception? e = null)
        {
            Console.WriteLine(msg);
            Console.WriteLine(e?.StackTrace);
        }

        public static void Info(string msg)
        {
            Console.WriteLine(msg);
        }
    }
}
