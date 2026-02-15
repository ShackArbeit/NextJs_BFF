import { Suspense } from "react";
import ClientConsumePromise from "./parts/ClientConsumePromise";
type User = { id: number; name: string; email: string };
async function getUsersSlow(): Promise<User[]> {
  await new Promise((r) => setTimeout(r, 4000));

  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return (await res.json()) as User[];
}

export default function StreamFromServerToClient() {

  const usersPromise = getUsersSlow();

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 font-bold border border-sky-500/30">
            2
          </span>
          <h2 className="text-xl font-black tracking-tight text-zinc-100">
            Streaming：Server → Client (Suspense + use)
          </h2>
        </div>

        <p className="text-base leading-relaxed text-zinc-400 max-w-3xl">
          這裡示範 <span className="text-sky-400 font-medium italic">Promise Handoff</span> 技術：
          Server 啟動異步任務後立即回傳佈局，將 Promise 傳給 Client 進行
          <code className="mx-1 px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200 text-sm">React.use()</code> 
          解析。這讓使用者能先看到介面，而不被慢速 API 阻塞。
        </p>
      </div>
      <Suspense fallback={<LoadingBox />}>
        <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/20 p-1">
          <ClientConsumePromise usersPromise={usersPromise} />
        </div>
      </Suspense>

      <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
        <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
        Status: Streaming asynchronous payload...
      </div>
    </div>
  );
}
function LoadingBox() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-dashed border-zinc-700 bg-zinc-900/40 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-5 h-5 border-2 border-sky-500/30 border-t-sky-500 rounded-full animate-spin" />
        <span className="text-sm font-bold text-zinc-300 tracking-wide uppercase">
          Streaming data from server...
        </span>
      </div>
      
      <div className="space-y-4">
        <Skeleton />
        <Skeleton />
        <Skeleton w="65%" />
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-500/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      </div>
    </div>
  );
}

function Skeleton({ w = "100%" }: { w?: string }) {
  return (
    <div 
      className="h-3 rounded-full bg-zinc-800/80 relative overflow-hidden" 
      style={{ width: w }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
    </div>
  );
}