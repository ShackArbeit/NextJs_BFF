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
        padding: 18, 
        display: "grid",
        gap: 16, 
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ fontWeight: 900, fontSize: 16 }}>{props.title}</div>
        
        <button
          onClick={() => setOn((v) => !v)}
          style={{
            marginLeft: "auto",
            padding: "10px 14px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.16)",
            background: on ? "rgba(99,102,241,0.30)" : "rgba(0,0,0,0.18)",
            color: "rgba(255,255,255,0.9)",
            cursor: "pointer",
            fontWeight: 800,
            fontSize: 14, 
            transition: "all 0.2s ease",
          }}
        >
          {on ? "Hide slot" : "Show slot"}
        </button>
      </div>

      <div style={{ opacity: 0.7, fontSize: 14, lineHeight: 1.7 }}>
        ✅ 這個 frame 是 <b>Client Component</b>，所以可以使用 <code>useState</code> 與事件監聽。
        內部的 Slot 內容則是 Server 先渲染好後傳進來的 UI。
      </div>
      <div style={{ 
        marginTop: 4, 
        display: on ? "block" : "none" 
      }}>
        {props.children}
      </div>
    </div>
  );
}
