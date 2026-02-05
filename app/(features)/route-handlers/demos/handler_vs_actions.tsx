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
    <section style={card}>
      <h2 style={h2}>Route Handler vs Server Actions</h2>

      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <button style={btnPrimary} onClick={run}>
          Re-fetch /api/handler-vs-server-actions
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
