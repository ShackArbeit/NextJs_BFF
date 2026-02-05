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
        "/api/request-vs-nextrequest?foo=bar&count=1"
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
    <section style={card}>
      <h2 style={h2}>Request vs NextRequest Demo</h2>

      <p style={desc}>
        這個 demo 會呼叫
        <code style={code}>/api/request-vs-nextrequest?foo=bar&count=1</code>
        ，讓你觀察在 <strong>Route Handler</strong> 中使用
        <strong>Request</strong> 時可以取得哪些資訊。
      </p>

      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <button style={btnPrimary} onClick={run}>
          Re-fetch API
        </button>
      </div>

      {error && <p style={{ marginTop: 12 }}>❌ {error}</p>}

      <pre style={pre}>{JSON.stringify(result, null, 2)}</pre>

      <div style={noteBox}>
        <strong>重點對照：</strong>
        <ul style={{ marginTop: 8, paddingLeft: 18 }}>
          <li>
            <code style={codeInline}>Request</code>：你需要自己
            <code style={codeInline}>new URL(req.url)</code> 來解析
            <code style={codeInline}>searchParams</code>
          </li>
          <li>
            <code style={codeInline}>NextRequest</code>：可以直接用
            <code style={codeInline}>req.nextUrl</code>、
            <code style={codeInline}>req.cookies</code>、
            <code style={codeInline}>req.geo</code>
          </li>
          <li>
            在 Route Handlers 中：
            <ul style={{ marginTop: 6 }}>
              <li>✔ 簡單情境 → 用標準 Web <strong>Request</strong></li>
              <li>✔ Next.js 專屬能力 → 改用 <strong>NextRequest</strong></li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* ---------- styles ---------- */

const card: React.CSSProperties = {
  border: "1px solid #333",
  borderRadius: 14,
  padding: 16,
  background: "#0b0b0b",
  color: "#fff",
};

const h2: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 900,
};

const desc: React.CSSProperties = {
  marginTop: 8,
  fontSize: 14,
  color: "#cfcfcf",
  lineHeight: 1.6,
};

const pre: React.CSSProperties = {
  marginTop: 12,
  whiteSpace: "pre-wrap",
  padding: 12,
  borderRadius: 12,
  background: "#111",
  border: "1px solid #222",
};

const btnPrimary: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #333",
  background: "#fff",
  color: "#111",
  fontWeight: 900,
  cursor: "pointer",
};

const noteBox: React.CSSProperties = {
  marginTop: 14,
  padding: 12,
  borderRadius: 12,
  background: "#0f0f10",
  border: "1px solid #2a2a2a",
  fontSize: 14,
  color: "#ddd",
};

const code: React.CSSProperties = {
  margin: "0 4px",
  padding: "2px 6px",
  borderRadius: 6,
  background: "#111",
  border: "1px solid #333",
  fontSize: 13,
};

const codeInline: React.CSSProperties = {
  margin: "0 4px",
  padding: "2px 6px",
  borderRadius: 6,
  background: "#111",
  border: "1px solid #333",
  fontSize: 12,
};
