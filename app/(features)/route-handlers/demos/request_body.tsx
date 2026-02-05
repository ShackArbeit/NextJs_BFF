"use client";

import { useState } from "react";

export default function RequestBodyDemo() {
  const [title, setTitle] = useState("Hello Route Handlers");
  const [body, setBody] = useState("This is a POST body demo.");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    try {
      setError(null);
      setResult(null);

      const res = await fetch("/api/request-body", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, userId: 1 }),
      });

      const json = await res.json();
      setResult({ status: res.status, json });
    } catch (e: any) {
      setError(e?.message ?? "unknown error");
    }
  };

  return (
    <section style={card}>
      <h2 style={h2}>Request Body Demo (POST)</h2>

      <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
        <input style={input} value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea
          style={{ ...input, minHeight: 80 }}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button style={btnPrimary} onClick={submit}>
          Send POST ➜ /api/request-body
        </button>
      </div>

      {error && <p style={{ marginTop: 12 }}>❌ {error}</p>}
      <pre style={pre}>{JSON.stringify(result, null, 2)}</pre>
    </section>
  );
}

const card: React.CSSProperties = {
  border: "1px solid #333",
  borderRadius: 14,
  padding: 16,
  background: "#0b0b0b",
  color: "#fff",
};
const h2: React.CSSProperties = { fontSize: 18, fontWeight: 900 };
const input: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #333",
  background: "#111",
  color: "#fff",
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
const pre: React.CSSProperties = {
  marginTop: 12,
  whiteSpace: "pre-wrap",
  padding: 12,
  borderRadius: 12,
  background: "#111",
  border: "1px solid #222",
};
