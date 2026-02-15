export default function WhatIsRSCPayload() {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold border border-indigo-500/30">
            1
          </span>
          <h2 className="text-xl font-black tracking-tight text-zinc-100">
            RSC Payload 是什麼？
          </h2>
        </div>

        <p className="text-base leading-relaxed text-zinc-400 max-w-3xl">
          在 App Router 中，預設 <strong className="text-zinc-200 font-semibold">Page/Layout 皆為 Server Components</strong>。
          當 Server 渲染時，它不會直接傳送龐大的原始碼，而是將渲染結果轉化為一種輕量化的
          <span className="mx-1 text-indigo-400 font-bold uppercase tracking-wider text-sm">Streaming Payload</span>。
          這就像是 Server 發出的「組裝說明書」，告訴瀏覽器如何重建 React 元件樹。
        </p>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6 shadow-2xl">
        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/50" />
        <h3 className="text-sm font-black text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Key Concept
        </h3>
        <p className="text-zinc-300 leading-relaxed italic">
          RSC Payload ≈ <strong>React Tree 的序列化結果</strong>。
          它讓 Client 可以在不重新載入頁面的情況下，精準地更新特定區域，同時保持 Client Component 的狀態（State）不遺失。
        </p>
      </div>
      <div className="rounded-xl border border-zinc-800 bg-[#0d1117] p-5 shadow-inner">
        <div className="flex items-center gap-2 mb-4 border-b border-zinc-800 pb-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
            <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
          </div>
          <span className="text-[11px] font-mono text-zinc-500 ml-2 italic tracking-tighter">
            rsc_payload_manifest.log
          </span>
        </div>
        <pre className="font-mono text-xs leading-6 text-zinc-400 overflow-x-auto whitespace-pre">
          {DIAGRAM}
        </pre>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Server Component 擅長" theme="emerald">
          <ul className="space-y-3">
            {[
              "靠近資料源直接進行 fetch (DB/API)",
              "保護 Secrets（API Keys 不外流）",
              "大幅減少送到瀏覽器的 JavaScript 預算",
              "透過 Streaming 讓內容「即刻出現」"
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-[14px]">
                <span className="text-emerald-500 font-bold opacity-70">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Client Component 擅長" theme="indigo">
          <ul className="space-y-3">
            {[
              "豐富的互動事件 (onClick / onChange)",
              "狀態管理 (useState) 與生命週期 (useEffect)",
              "直接操作瀏覽器 API (LocalStorage / Window)",
              "為 Server UI 提供可互動的「外殼」"
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-[14px]">
                <span className="text-indigo-500 font-bold opacity-70">✦</span>
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

const DIAGRAM = `
[ SERVER-SIDE ]                      [ CLIENT-SIDE ]
Render React Tree                    Receive RSC Payload
      │                                     │
      ├─ Generating HTML Shell  ───────────▶ Rendered initial View
      │                                     │
      └─ Serializing Tree  ────────────────▶ Reconcile & Hydrate
                                            (Preserve State)

    RSC Stream Format:
    1:I["./parts/Counter.tsx",["client"],"default"]
    2:{"id":1, "title":"Hello RSC", "children":"$L1"}
`;
function Card({
  title,
  children,
  theme = "indigo"
}: {
  title: string;
  children: React.ReactNode;
  theme?: "indigo" | "emerald";
}) {
  const themes = {
    indigo: "border-indigo-500/20 bg-indigo-500/[0.02] text-indigo-400",
    emerald: "border-emerald-500/20 bg-emerald-500/[0.02] text-emerald-400",
  };

  return (
    <div className={`group rounded-2xl border p-6 transition-all duration-300 hover:bg-zinc-900/40 ${themes[theme]}`}>
      <h4 className="font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full ${theme === 'indigo' ? 'bg-indigo-500' : 'bg-emerald-500'}`} />
        {title}
      </h4>
      <div className="text-zinc-400 leading-relaxed transition-colors group-hover:text-zinc-300">
        {children}
      </div>
    </div>
  );
}