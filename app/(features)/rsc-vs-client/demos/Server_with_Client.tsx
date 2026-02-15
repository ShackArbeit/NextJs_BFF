import InteractiveFrame from "./parts/InteractiveFrame";
function ServerBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide shadow-[0_0_15px_rgba(16,185,129,0.1)]">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      {text}
    </span>
  );
}
export default function ServerWithClient() {
  const serverRenderedUI = (
    <div className="grid gap-4 p-5 rounded-xl border border-zinc-800 bg-zinc-950/80 shadow-inner">
      <div className="flex items-center justify-between">
        <h3 className="font-black text-zinc-100 text-base">這是 Server-rendered UI</h3>
        <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-500 font-mono">SC_SLOT</span>
      </div>  
      <p className="text-sm leading-relaxed text-zinc-400">
        先在 <span className="text-emerald-400 font-medium">Server Component</span> 生成後，被當成 <code className="text-zinc-300">children slot</code> 傳入，
        這能有效避免 Client Component 渲染樹斷裂。
      </p>
      <div className="flex flex-wrap gap-2 pt-2">
        <ServerBadge text="不送互動 JS" />
        <ServerBadge text="可帶 Secrets" />
        <ServerBadge text="輕量化嵌入" />
      </div>
    </div>
  );
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
            3
          </span>
          <h2 className="text-xl font-black tracking-tight text-zinc-100">
            Server 與 Client 交錯組合（Composition / Slot）
          </h2>
        </div>
        <div className="p-4 rounded-lg bg-zinc-900/50 border-l-4 border-emerald-500/50">
          <p className="text-sm leading-relaxed text-zinc-400">
            <strong className="text-zinc-200">規則：</strong>Client Component 不能直接 import Server Component。<br/>
            <strong className="text-zinc-200">解法：</strong>利用 <span className="text-emerald-400 italic font-medium">children/props slot</span>。Server 在上層先渲染好 UI 後傳入，由 Client 負責外層的互動邏輯。
          </p>
        </div>
      </div>
      <InteractiveFrame title="Client 容器（可互動區域）">
        <div className="group transition-transform duration-300 hover:scale-[1.01]">
          {serverRenderedUI}
        </div>
      </InteractiveFrame>
      <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4 text-emerald-500">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="font-bold text-zinc-100 tracking-wide text-sm uppercase">Key Point 🎯</h3>
        </div>
        
        <ul className="grid gap-3">
          {[
            "Client 無法引入 Server，但 Server 可以將生成的內容作為屬性外包給 Client。",
            "這確保了互動所需的 JS 預算（Bundle Size）只被限制在 Client 層。"
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-sm text-zinc-400 leading-snug">
              <span className="text-emerald-500/50 font-mono">0{i+1}.</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}