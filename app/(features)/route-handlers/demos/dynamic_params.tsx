"use client";

import { useState } from "react";

export default function DynamicParamsDemo() {
  const [id, setId] = useState("Paramas");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const run = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setResult(null);

      const res = await fetch(`/api/dynamic-params/${encodeURIComponent(id)}`);
      const json = await res.json();
      setResult({ status: res.status, json });
    } catch (e: any) {
      setError(e?.message ?? "unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="border border-zinc-800 rounded-2xl p-6 bg-[#0b0b0b] text-white shadow-xl max-w-3xl">
      <h2 className="text-2xl font-black tracking-tight text-zinc-100">
        動態參數展示
      </h2>

      <div className="flex flex-wrap gap-4 mt-6">
   
        <input
          className="flex-1 min-w-[240px] px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900 text-white text-lg focus:outline-none focus:ring-2 focus:ring-zinc-600 transition-all placeholder:text-zinc-600"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter ID here..."
        />
        
        <button
          className={`px-6 py-3 rounded-xl font-black text-lg transition-all active:scale-95 ${
            isLoading 
              ? "bg-zinc-700 text-zinc-400 cursor-not-allowed" 
              : "bg-white text-black hover:bg-zinc-200 shadow-lg shadow-white/5"
          }`}
          onClick={run}
          disabled={isLoading}
        >
          {isLoading ? "Fetching..." : `取得 /api/dynamic-params/${id}`}
        </button>
      </div>
      {error && (
        <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 font-medium">
          ❌ {error}
        </div>
      )}

      <div className="relative mt-6 group">
        <div className="absolute -top-3 left-4 px-2 bg-[#0b0b0b] text-zinc-500 text-xs font-mono uppercase tracking-widest">
          結果展示
        </div>
        <pre className="p-5 rounded-xl bg-black border border-zinc-800 text-base font-mono text-emerald-400 overflow-auto min-h-[120px] max-h-[400px] leading-relaxed">
          {result ? (
            JSON.stringify(result, null, 2)
          ) : (
            <span className="text-zinc-700">按下 Enter 看輸入的結果是什麼</span>
          )}
        </pre>
      </div>
    </section>
  );
}