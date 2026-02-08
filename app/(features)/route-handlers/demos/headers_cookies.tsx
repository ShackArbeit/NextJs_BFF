"use client";

import { useEffect, useState } from "react";

export default function HeadersCookiesDemo() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setError(null);
      setResult(null);

      const res = await fetch("/api/headers-cookies");
      const json = await res.json();
      setResult({ status: res.status, json });
    } catch (e: any) {
      setError(e?.message ?? "unknown error");
    }
  };

  const deleteCookie = async () => {
    try {
      setError(null);
      setResult(null);
      const res = await fetch("/api/headers-cookies", {
        method: "DELETE",
      });
      const json = await res.json();
      setResult({ status: res.status, json });
    } catch (e: any) {
      setError(e?.message ?? "unknown error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="rounded-2xl border border-zinc-700 bg-zinc-950 p-6 text-zinc-100">
      <h2 className="text-xl font-extrabold tracking-wide">Headers / Cookies Demo</h2>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={fetchData}
          className="rounded-xl border border-zinc-700 bg-white px-4 py-2 text-base font-extrabold text-zinc-900 hover:bg-zinc-200"
        >
          Re-fetch /api/headers-cookies
        </button>

        <button
          onClick={deleteCookie}
          className="rounded-xl border border-red-700 bg-zinc-900 px-4 py-2 text-base font-extrabold text-red-400 hover:bg-zinc-800"
        >
          Delete rh_count cookie
        </button>
        <span className="text-sm text-zinc-400">
          每次取得資料都會讀取 <code className="mx-1 rounded bg-black px-1">rh_count</code> 並將其加 1
        </span>
      </div>
      {error && (
        <p className="mt-4 text-base text-red-400">Error: {error}</p>
      )}
      <pre className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm leading-relaxed text-zinc-200">
        {result ? JSON.stringify(result, null, 2) : "Waiting for response..."}
      </pre>
    </section>
  );
}
