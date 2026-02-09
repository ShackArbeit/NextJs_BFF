"use client";
import { useState } from "react";

export default function RequestBodyDemo() {
  const [title, setTitle] = useState("Hello Route Handlers");
  const [body, setBody] = useState("This is a POST body demo.");
  const [userId, setUserId] = useState(1); 
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    try {
      setError(null);
      setResult(null);
      const res = await fetch("/api/request-body", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, userId }),
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "請求失敗");
      }
      setResult({ status: res.status, json });
      setUserId((prev) => prev + 1);

    } catch (e: any) {
      setError(e?.message ?? "unknown error");
    }
  };

  return (
    <section className="rounded-2xl border border-zinc-700 bg-zinc-950 p-6 text-zinc-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-extrabold tracking-wide">
          Request Body 展示（POST 方法）
        </h2>
        <span className="bg-zinc-800 px-3 py-1 rounded-full text-xs font-mono text-zinc-400">
          Next User ID: {userId}
        </span>
      </div>
      <div className="grid gap-3">
        <input
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-white focus:border-white focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="min-h-[96px] w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-white focus:border-white focus:outline-none"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="請輸入內容（輸入 JSON 格式會報錯）"
        />
        <button
          onClick={submit}
          className="mt-1 rounded-xl bg-white px-4 py-2 text-base font-extrabold text-zinc-900 transition hover:bg-zinc-200"
        >
          寄送 POST 下一個 ID 是 {userId} 的請求
        </button>
      </div>
      {error && (
        <div className="mt-4 p-3 rounded-lg bg-red-900/30 border border-red-500/50 text-red-200 text-sm">
          ❌ 錯誤：{error}
        </div>
      )}
      <pre className="mt-4 max-h-60 overflow-auto rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-200 font-mono">
        {result
          ? JSON.stringify(result, null, 2)
          : "尚未送出請求，請填寫內容並點擊送出"}
      </pre>
    </section>
  );
}