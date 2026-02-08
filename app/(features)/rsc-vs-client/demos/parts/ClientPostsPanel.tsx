"use client";

import { useMemo, useState } from "react";

type Post = { id: number; title: string; body: string };

export default function ClientPostsPanel(props: {
  payload: { fetchedAtISO: string; posts: Post[] };
}) {
  const { fetchedAtISO, posts } = props.payload;
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q)
    );
  }, [query, posts]);

  return (
    <div
      style={{
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.03)",
        padding: 18, 
        display: "grid",
        gap: 14, 
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <div style={{ fontWeight: 900, fontSize: 16 }}>Client Panel（互動區）</div>
        <div style={{ fontSize: 13, opacity: 0.65 }}>
          fetchedAt: {fetchedAtISO}
        </div>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜尋 title/body…"
        style={{
          width: "100%",
          borderRadius: 12,
          padding: "12px 16px",
          fontSize: 15, 
          outline: "none",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.25)",
          color: "rgba(255,255,255,0.9)",
        }}
      />

      <div style={{ display: "grid", gap: 12 }}>
        {filtered.map((p) => (
          <article
            key={p.id}
            style={{
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(0,0,0,0.16)",
              padding: 16,
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 15 }}>{p.title}</div>
            <div style={{ 
              marginTop: 8, 
              opacity: 0.75, 
              lineHeight: 1.8, 
              fontSize: 14 
            }}>
              {p.body}
            </div>
          </article>
        ))}
        
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", opacity: 0.5, padding: "20px 0" }}>
            找不到符合的內容 🔍
          </div>
        )}
      </div>
    </div>
  );
}