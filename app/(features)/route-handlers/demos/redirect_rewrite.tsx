"use client";
import { useState } from "react";

export default function RedirectRewriteDemo() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const callExplain = async () => {
    try {
      setError(null);
      setResult(null);
      const res = await fetch("/api/redirect-rewrite?mode=explain");
      const json = await res.json();
      setResult({ status: res.status, json });
    } catch (e: any) {
      setError(e?.message ?? "unknown error");
    }
  };

  const doRedirect = () => {
    window.location.href = "/api/redirect-rewrite?mode=redirect";
  };

  return (
    <section className="rounded-2xl border border-zinc-700 bg-zinc-950 p-6 text-zinc-100">
      <h2 className="text-xl font-extrabold tracking-wide">
        Redirect / Rewrite 展示
      </h2>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={doRedirect}
          className="rounded-xl border border-zinc-700 bg-white px-4 py-2 text-base font-extrabold text-zinc-900 transition hover:bg-zinc-200"
        >
          Navigate ➜ /api/redirect-rewrite?mode=redirect (302)
        </button>

        <button
          onClick={callExplain}
          className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-base font-extrabold text-zinc-100 transition hover:bg-zinc-800"
        >
          Fetch ➜ /api/redirect-rewrite?mode=explain (JSON)
        </button>
      </div>

      {error && (
        <p className="mt-4 text-base text-red-400">
          ❌ {error}
        </p>
      )}

      <pre className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm leading-relaxed text-zinc-200">
        {result
          ? JSON.stringify(result, null, 2)
          : "尚未取得結果，請點擊上方按鈕觸發請求"}
   </pre>
    </section>
  );
}
