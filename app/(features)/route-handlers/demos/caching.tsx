"use client";

import { useEffect, useState } from "react";

type ApiResult = {
  ok: boolean;
  concept: string;
  revalidateSeconds: number;
  upstream: {
    ok: boolean;
    source: string;
    uuidLike: string;
    upstream_ts: string;
  };
  ts: string;
};

export default function CachingDemo() {
  const [result, setResult] = useState<null | { status: number; json: ApiResult }>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    try {
      setError(null);
      const res = await fetch("/api/caching");
      const json = (await res.json()) as ApiResult;

      console.log("Results:", json);
      console.log("Compare fields:", {
        caching_ts: json.ts,
        upstream_ts: json.upstream?.upstream_ts,
        upstream_uuid: json.upstream?.uuidLike,
      });

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
      <h2 className="text-xl font-extrabold tracking-wide">Caching 展示（upstream fetch revalidate = 10 秒）</h2>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={run}
          className="rounded-xl border border-zinc-700 bg-white px-4 py-2 text-base font-extrabold text-zinc-900 transition hover:bg-zinc-200"
        >
          Re-fetch /api/caching
        </button>

        <span className="text-base text-zinc-400">
          連續點幾次，觀察{" "}
          <code className="mx-1 rounded bg-black px-1">upstream.upstream_ts</code>{" "}
          /{" "}
          <code className="mx-1 rounded bg-black px-1">upstream.uuidLike</code>{" "}
          是否在 10 秒內維持不變 🙂
        </span>
      </div>

      {error && <p className="mt-4 text-base text-red-400">❌ {error}</p>}

      <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-200">
        <div className="mb-2 font-bold">快速觀察欄位</div>

        <div className="grid gap-2 md:grid-cols-2">
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3">
            <div className="text-zinc-400">/api/caching ts（通常每次點都會變）</div>
            <div className="mt-1 font-mono">{result?.json.ts ?? "-"}</div>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3">
            <div className="text-zinc-400">upstream_ts（10 秒內應該多半不變）</div>
            <div className="mt-1 font-mono">{result?.json.upstream?.upstream_ts ?? "-"}</div>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 md:col-span-2">
            <div className="text-zinc-400">upstream uuidLike（10 秒內應該多半不變）</div>
            <div className="mt-1 font-mono break-all">{result?.json.upstream?.uuidLike ?? "-"}</div>
          </div>
        </div>
      </div>

      <pre className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm leading-relaxed text-zinc-200">
        {result ? JSON.stringify(result, null, 2) : "尚未取得結果，請點擊上方按鈕重新請求"}
      </pre>
    </section>
  );
}
