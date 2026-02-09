"use client";

import { useEffect, useState } from "react";

export default function HandlerVsActionsDemo() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    try {
      setError(null);
      setResult(null);

      const res = await fetch("/api/handler-vs-server-actions");
      const json = await res.json();
      setResult({ status: res.status, json });
    } catch (e: any) {
      setError(e?.message ?? "unknown error");
    }
  };

  useEffect(() => {
    run();
  }, []);

  return (
    <section className="rounded-2xl border border-zinc-700 bg-zinc-950 p-6 text-zinc-100">
      <h2 className="text-2xl font-extrabold tracking-wide">
        Route Handler vs Server Actions
      </h2>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={run}
          className="rounded-xl border border-zinc-700 bg-white px-5 py-3 text-lg font-extrabold text-zinc-900 transition hover:bg-zinc-200"
        >
          Re-fetch /api/handler-vs-server-actions
        </button>
      </div>
      {error && (
        <p className="mt-4 text-lg font-semibold text-red-400">
          ❌ {error}
        </p>
      )}
      <pre className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-base leading-relaxed text-zinc-200">
        {result
          ? JSON.stringify(result, null, 2)
          : "尚未取得結果，請點擊上方按鈕重新請求"}
      </pre>
    </section>
  );
}
