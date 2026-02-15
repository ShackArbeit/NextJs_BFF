import ClientPostsPanel from "./parts/ClientPostsPanel";

type Post = { id: number; title: string; body: string };

async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch posts");
  const data = (await res.json()) as Post[];
  return data.slice(0, 8);
}

export default async function DataFromServerToClient() {
  const posts = await getPosts();
  const safePayload = {
    fetchedAtISO: new Date().toISOString(),
    posts,
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold border border-indigo-500/30">
            4
          </span>
          <h2 className="text-xl font-black tracking-tight text-zinc-100">
            從 Server 傳資料到 Client（props / 序列化邊界）
          </h2>
        </div>

        <p className="text-base leading-relaxed text-zinc-400 max-w-3xl">
          這個 demo 展示了由 <span className="text-zinc-200 font-medium">Server Component</span> 進行資料抓取，並將結果透過 <span className="italic text-indigo-400">props</span> 注入給 <span className="text-zinc-200 font-medium">Client Component</span>。
          <br />
          <span className="inline-flex items-center mt-2 px-2 py-0.5 rounded text-sm bg-zinc-800 text-zinc-300 border border-zinc-700">
            <strong className="text-indigo-400 mr-2">重點：</strong>
            傳輸內容必須是可序列化（JSON-safe）的格式。
          </span>
        </p>
      </div>
      <div className="rounded-2xl border border-zinc-800/50 bg-gradient-to-b from-zinc-900/50 to-transparent p-1">
        <ClientPostsPanel payload={safePayload} />
      </div>

      <HintCard />
    </div>
  );
}

function HintCard() {
  return (
    <div className="relative overflow-hidden mt-2 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-hover hover:bg-white/[0.07]">
      <div className="absolute -top-10 -right-10 h-32 w-32 bg-indigo-500/10 blur-[50px]" />    
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-md bg-amber-500/20 text-amber-500">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="font-black text-zinc-100 uppercase tracking-wider text-sm">Key Point 🧠</h3>
      </div>

      <ul className="space-y-3">
        {[
          "Server 負責 fetch 與組 payload，Client 負責互動呈現。",
          "不可傳遞 Function、Class 實例或包含循環引用的物件，因為這些無法被序列化為 RSC Payload。"
        ].map((text, i) => (
          <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-zinc-400">
            <span className="text-indigo-500 font-mono select-none">/</span>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}