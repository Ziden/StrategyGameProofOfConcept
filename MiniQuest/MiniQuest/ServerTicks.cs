using System;
using System.Threading;

namespace MiniQuest
{
    public class ServerTicks
    {
        public static ManualResetEvent TickSignal = new ManualResetEvent(false);

        private static int TICKS_PER_SECOND = 20;

        public static bool Ticking = true;

        private DateTime lastTick;

        public void StartTicks()
        {
            var tickSleepMS = 1000d/TICKS_PER_SECOND;
            while(Ticking)
            {
                var now = DateTime.UtcNow;
                //Log.Debug($"Tick [{(now-lastTick).TotalMilliseconds}ms]");
              
                GameTick(now);
                this.lastTick = now;
                var elapsed = DateTime.UtcNow - now;

                Thread.Sleep((int)(tickSleepMS - elapsed.TotalMilliseconds));
            }
        }

        public void GameTick(DateTime date)
        {

        }
    }
}
