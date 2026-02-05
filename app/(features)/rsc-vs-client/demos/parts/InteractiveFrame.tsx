"use client";

import { useState } from "react";

export default function InteractiveFrame(props: {
  title: string;
  children: React.ReactNode;
}) {
  const [on, setOn] = useState(true);

  return (
    <div
      style={{
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.03)",
        padding: 14,
        display: "grid",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ fontWeight: 900 }}>{props.title}</div>
        <button
          onClick={() => setOn((v) => !v)}
          style={{
            marginLeft: "auto",
            padding: "8px 10px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.16)",
            background: on ? "rgba(99,102,241,0.20)" : "rgba(0,0,0,0.18)",
            color: "rgba(255,255,255,0.9)",
            cursor: "pointer",
            fontWeight: 800,
            fontSize: 12,
          }}
        >
          {on ? "Hide slot" : "Show slot"}
        </button>
      </div>

      <div style={{ opacity: 0.7, fontSize: 12, lineHeight: 1.6 }}>
        ✅ 這個 frame 是 Client Component，所以可以用 state / click。  
        Slot 內容是 Server 先渲染好後傳進來的 UI。
      </div>

      {on ? props.children : null}
    </div>
  );
}
