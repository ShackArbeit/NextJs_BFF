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
    // 直接讓瀏覽器導航，這樣才能「看見」302 redirect 結果
    window.location.href = "/api/redirect-rewrite?mode=redirect";
  };

  return (
    <section style={card}>
      <h2 style={h2}>Redirect / Rewrite Demo</h2>

      <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
        <button style={btnPrimary} onClick={doRedirect}>
          Navigate ➜ /api/redirect-rewrite?mode=redirect (302)
        </button>

        <button style={btnGhost} onClick={callExplain}>
          Fetch ➜ /api/redirect-rewrite?mode=explain (JSON)
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
const btnGhost: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #333",
  background: "#111",
  color: "#fff",
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
