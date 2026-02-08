"use client";

import { useEffect, useState } from "react";

type Result = {
  status: number;
  json: any;
};

export default function RequestNextRequestDemo() {
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    try {
      setError(null);
      setResult(null);

      const res = await fetch(
         "/api/request-vs-nextrequest?Country=Taiwan&City=Taipei"
      );
      const json = await res.json();

      setResult({
        status: res.status,
        json,
      });
    } catch (e: any) {
      setError(e?.message ?? "unknown error");
    }
  };

  useEffect(() => {
    run();
  }, []);

  return (
    <section className="rounded-2xl border border-zinc-700 bg-zinc-950 p-6 text-zinc-100">
      <h2 className="text-xl font-extrabold tracking-wide">
        Request vs NextRequest Demo
      </h2>
      <p className="mt-3 text-base leading-relaxed text-zinc-300">
        這個 demo 會呼叫
        <code className="mx-1 rounded-md border border-zinc-700 bg-zinc-900 px-2 py-0.5 text-sm">
          /api/request-vs-nextrequest?Country=Taiwan&City=Taipei
        </code>
        ，讓你實際觀察在 <strong>Route Handler</strong> 中使用
        <strong className="text-white"> Web 標準 Request</strong>
        時，可以取得哪些資訊，以及它的限制。
      </p>
      <div className="mt-4 flex gap-3">
        <button
          onClick={run}
          className="rounded-xl border border-zinc-700 bg-white px-4 py-2 text-sm font-extrabold text-zinc-900 transition hover:bg-zinc-200"
        >
          Re-fetch API
        </button>
      </div>
      {error && (
        <p className="mt-4 text-sm text-red-400">
          ❌ {error}
        </p>
      )}
      <pre className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm leading-relaxed">
        {JSON.stringify(result, null, 2)}
      </pre>
      <div className="mt-6 rounded-xl border border-zinc-700 bg-zinc-900 p-4">
        <h3 className="text-base font-bold text-white">
          🔍 Request vs NextRequest — 核心差異
        </h3>

        <ul className="mt-3 space-y-2 pl-5 text-sm leading-relaxed text-zinc-300 list-disc">
          <li>
            <code className="rounded-md bg-black px-1.5 py-0.5">
              Request
            </code>
            ：
            <span className="text-zinc-200">
              標準 Web API，僅提供
              <code className="mx-1 rounded-md bg-black px-1.5 py-0.5">
                url
              </code>
             、
              <code className="mx-1 rounded-md bg-black px-1.5 py-0.5">
                headers
              </code>
              等基本資訊  
              👉 你必須自己
              <code className="mx-1 rounded-md bg-black px-1.5 py-0.5">
                new URL(req.url)
              </code>
              才能解析 query
            </span>
          </li>

          <li>
            <code className="rounded-md bg-black px-1.5 py-0.5">
              NextRequest
            </code>
            ：
            <span className="text-zinc-200">
              Next.js 擴充版 Request，內建
              <code className="mx-1 rounded-md bg-black px-1.5 py-0.5">
                req.nextUrl
              </code>
             、
              <code className="mx-1 rounded-md bg-black px-1.5 py-0.5">
                req.cookies
              </code>
             、
              <code className="mx-1 rounded-md bg-black px-1.5 py-0.5">
                req.geo
              </code>
              等 Server-only 能力
            </span>
          </li>

          <li className="pt-2">
            ✅ 在 <strong>Route Handlers</strong> 中的選擇建議：
            <ul className="mt-2 list-inside list-disc text-zinc-400">
              <li>
                純 API / 標準 HTTP 行為 → 使用 <strong>Request</strong>
              </li>
              <li>
                需要 cookies / middleware / edge 能力 →
                <strong className="text-white"> NextRequest</strong>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
}
