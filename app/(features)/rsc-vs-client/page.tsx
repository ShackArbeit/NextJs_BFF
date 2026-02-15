import Link from "next/link";
import { Suspense } from "react";
import WhatIsRSCPayload from "./demos/whatis_RSC_Payload";
import StreamFromServerToClient from "./demos/stream_fromServer_to_Client";
import ServerWithClient from "./demos/Server_with_Client";
import DataFromServerToClient from "./demos/data_fromServer_to_Client";

type TabKey =
  | "whatis_RSC_Payload"
  | "stream_fromServer_to_Client"
  | "Server_with_Client"
  | "data_fromServer_to_Client";

const TABS: Array<{ key: TabKey; title: string; desc: string }> = [
  {
    key: "whatis_RSC_Payload",
    title: "RSC Payload 是什麼？",
    desc: "概念 + 圖解：Server/Client 的傳遞與呈現",
  },
  {
    key: "stream_fromServer_to_Client",
    title: "Streaming：Server → Client",
    desc: "Suspense + React use() 的漸進式渲染體感",
  },
  {
    key: "Server_with_Client",
    title: "Server × Client 交錯組合",
    desc: "Composition：用 slot 模式嵌入 Server UI",
  },
  {
    key: "data_fromServer_to_Client",
    title: "Data：Server → Client props",
    desc: "JSON-safe 資料傳遞與序列化邊界範例",
  },
];

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <main className="min-h-screen bg-[#070A12] text-zinc-200 selection:bg-indigo-500/30">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-emerald-500/10 blur-[100px]" />
      </div>

      <Suspense fallback={<PageFallback />}>
        <PageContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function PageContent({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await searchParamsPromise;
  const tab = (Array.isArray(searchParams.tab) ? searchParams.tab[0] : searchParams.tab) as TabKey | undefined;
  const activeTab: TabKey = tab && TABS.some((t) => t.key === tab) ? tab : "whatis_RSC_Payload";

  return (
    <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-12">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-white md:text-4xl">
            React Server Component <span className="text-zinc-500 text-2xl font-light mx-2">vs</span> Client Component
          </h1>
          <p className="mt-2 text-zinc-400 font-medium">深入理解 Next.js App Router 的架構核心與渲染邊界</p>
        </div>
        <div className="hidden md:block">
          <code className="text-[11px] px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 font-mono shadow-sm">
            /rsc-vs-client?tab={activeTab}
          </code>
        </div>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
        <aside className="space-y-6">
          <nav className="flex flex-col gap-3 p-2 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
            {TABS.map((t) => {
              const isActive = t.key === activeTab;
              return (
                <Link key={t.key} href={`?tab=${t.key}`} scroll={false} className="no-underline group">
                  <div className={`
                    relative p-4 rounded-xl transition-all duration-200 border
                    ${isActive 
                      ? "bg-indigo-500/10 border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.1)] shadow-inner" 
                      : "bg-transparent border-transparent hover:bg-white/[0.04] hover:border-white/10"}
                  `}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-bold ${isActive ? "text-indigo-300" : "text-zinc-300 group-hover:text-zinc-100"}`}>
                        {t.title}
                      </span>
                      {isActive && <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8]" />}
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                      {t.desc}
                    </p>
                    <div className="mt-3 font-mono text-[10px] text-zinc-600 opacity-60">
                      tab={t.key}
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* <div className="p-5 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.02] shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-emerald-500 font-bold text-xs uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Architecture Hint
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed italic">
              🧠 小提醒：這一頁是 <strong className="text-zinc-200">Server Component</strong>，這意味著我們可以直接讀取 URL 的 <code className="text-emerald-400/80">searchParams</code> 並在伺服器端完成分發邏輯，無需依賴 Client-side useEffect。
            </p>
          </div> */}
        </aside>

        
        <section className="min-h-[500px] rounded-3xl border border-white/10 bg-zinc-900/30 backdrop-blur-sm p-1 lg:p-2 overflow-hidden shadow-2xl">
          <div className="h-full w-full rounded-[1.4rem] bg-zinc-950/50 p-6 md:p-8">
            <Suspense fallback={<DemoFallback tab={activeTab} />}>
              {activeTab === "whatis_RSC_Payload" && <WhatIsRSCPayload />}
              {activeTab === "stream_fromServer_to_Client" && <StreamFromServerToClient />}
              {activeTab === "Server_with_Client" && <ServerWithClient />}
              {activeTab === "data_fromServer_to_Client" && <DataFromServerToClient />}
            </Suspense>
          </div>
        </section>
      </div>
    </div>
  );
}

function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-[1100px] animate-pulse">
        <div className="h-12 w-64 bg-zinc-800 rounded-lg mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8">
          <div className="h-96 bg-zinc-900/50 rounded-2xl" />
          <div className="h-[500px] bg-zinc-900/50 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

function DemoFallback({ tab }: { tab: string }) {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-zinc-800 border-dashed bg-zinc-900/40">
        <div className="flex items-center gap-3 text-zinc-200 font-bold mb-3">
          <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          Loading Demo: <span className="text-indigo-400 font-mono underline decoration-indigo-500/30 underline-offset-4">{tab}</span>
        </div>
        <p className="text-sm text-zinc-500 leading-relaxed max-w-lg">
          這裡的 fallback 會在 streaming 發生時先出現，展示「先有骨架（Skeleton），再補內容」的流暢體驗。
        </p>
      </div>

      <div className="space-y-4">
        <SkeletonLine />
        <SkeletonLine />
        <SkeletonLine w="75%" />
        <div className="pt-4 grid grid-cols-2 gap-4">
          <div className="h-24 bg-zinc-800/50 rounded-xl" />
          <div className="h-24 bg-zinc-800/50 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

function SkeletonLine({ w = "100%" }: { w?: string }) {
  return (
    <div 
      className="h-3 rounded-full bg-zinc-800/60 overflow-hidden relative"
      style={{ width: w }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
    </div>
  );
}
