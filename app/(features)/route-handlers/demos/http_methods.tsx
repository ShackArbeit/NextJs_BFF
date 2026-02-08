"use client";

import { useEffect, useState } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS" | "HEAD";
type Result = {
  status: number;
  data: any;
};
export default function HttpMethodsDemo() {
  const [result, setResult] = useState<Result | null>(null);
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError(null);
        setResult(null);
        const res = await fetch("/api/http-methods", { method });
        if (res.status === 204 || method === "HEAD" || method === "OPTIONS") {       
          const headers: Record<string, string> = {};
          res.headers.forEach((value, key) => {
            headers[key] = value;
          });
          setResult({ 
            status: res.status, 
            data: { 
              message: "Response processed (No body or 204 status)",
              headers 
            } 
          });
          return;
        }
        const data = await res.json();
        setResult({ status: res.status, data });
      } catch (e: any) {
        setError(e?.message ?? "unknown error");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [method]);

  const mainMethods: HttpMethod[] = ["GET", "POST", "PUT", "PATCH", "DELETE"];
  const extraMethods: HttpMethod[] = ["OPTIONS", "HEAD"];

  return (
    <section className="border border-zinc-800 rounded-2xl p-6 bg-[#0b0b0b] text-white shadow-xl max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black tracking-tight">HTTP Methods Demo</h2>
          <p className="text-zinc-500 text-sm mt-1">測試 Next.js Route Handlers 的不同動詞</p>
        </div>
        {loading && (
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            REQUESTING
          </div>
        )}
      </div>
      <div className="space-y-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {mainMethods.map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`flex-1 min-w-[80px] py-3 rounded-xl border font-bold transition-all ${
                method === m
                  ? "bg-white text-black border-white shadow-lg shadow-white/10"
                  : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {extraMethods.map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`flex-1 py-2 rounded-lg border text-sm font-bold transition-all ${
                method === m
                  ? "bg-zinc-200 text-black border-zinc-200"
                  : "bg-zinc-950 text-zinc-500 border-zinc-900 hover:border-zinc-700"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm italic">
          ⚠️ Error: {error}
        </div>
      )}

      <div className="relative group">
        <div className="absolute -top-3 left-4 px-2 bg-[#0b0b0b] text-zinc-500 text-xs font-mono uppercase tracking-widest">
          Server Response
        </div>
        <pre className="p-6 rounded-2xl bg-black border border-zinc-800 text-sm md:text-base font-mono text-emerald-400 overflow-auto min-h-[200px] leading-relaxed shadow-inner">
          {result ? JSON.stringify(result, null, 2) : "// 點擊按鈕發送請求..."}
        </pre>
      </div>
    </section>
  );
}