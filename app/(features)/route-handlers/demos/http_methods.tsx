"use client";

import { useEffect, useState } from "react";

type Result = {
  status: number;
  data: any;
};

export default function HttpMethodsDemo() {
  const [result, setResult] = useState<Result | null>(null);
  const [method, setMethod] = useState<"GET" | "POST">("GET");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        setError(null);
        setResult(null);

        const res = await fetch("/api/http-methods", { method });
        const data = await res.json();
        setResult({ status: res.status, data });
      } catch (e: any) {
        setError(e?.message ?? "unknown error");
      }
    };

    run();
  }, [method]);

  return (
    <section style={cardStyle}>
      <h2 style={titleStyle}>HTTP Methods Demo</h2>

      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <button style={btnStyle(method === "GET")} onClick={() => setMethod("GET")}>
          GET
        </button>
        <button style={btnStyle(method === "POST")} onClick={() => setMethod("POST")}>
          POST
        </button>
      </div>

      {error && <p style={{ marginTop: 12 }}>❌ {error}</p>}
      <pre style={preStyle}>{JSON.stringify(result, null, 2)}</pre>
    </section>
  );
}

const cardStyle: React.CSSProperties = {
  border: "1px solid #333",
  borderRadius: 14,
  padding: 16,
  background: "#0b0b0b",
  color: "#fff",
};

const titleStyle: React.CSSProperties = { fontSize: 18, fontWeight: 800 };

const preStyle: React.CSSProperties = {
  marginTop: 12,
  whiteSpace: "pre-wrap",
  padding: 12,
  borderRadius: 12,
  background: "#111",
  border: "1px solid #222",
};

const btnStyle = (active: boolean): React.CSSProperties => ({
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #333",
  background: active ? "#fff" : "#111",
  color: active ? "#111" : "#fff",
  fontWeight: 800,
  cursor: "pointer",
});
