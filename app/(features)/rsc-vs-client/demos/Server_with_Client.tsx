import InteractiveFrame from "./parts/InteractiveFrame";

function ServerBadge({ text }: { text: string }) {
 
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px",
        borderRadius: 999,
        background: "rgba(16,185,129,0.16)",
        border: "1px solid rgba(16,185,129,0.30)",
        fontSize: 12,
        fontWeight: 800,
      }}
    >
      🛰️ {text}
    </span>
  );
}

export default function ServerWithClient() {
  const serverRenderedUI = (
    <div
      style={{
        display: "grid",
        gap: 10,
        padding: 12,
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(0,0,0,0.18)",
      }}
    >
      <div style={{ fontWeight: 900 }}>我是 Server-rendered UI</div>
      <div style={{ opacity: 0.75, lineHeight: 1.6, fontSize: 13 }}>
        我是在 Server Component 生成後，被「當成 children slot」傳進 Client Component，
        然後在 Client 裡被渲染出來。
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <ServerBadge text="Server Component 不送互動 JS" />
        <ServerBadge text="可帶 secrets / fetch" />
        <ServerBadge text="可被嵌入 Client UI" />
      </div>
    </div>
  );

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900 }}>
        ③ Server 與 Client 交錯組合（composition / slot）
      </h2>

      <p style={{ margin: 0, color: "rgba(255,255,255,0.76)", lineHeight: 1.7 }}>
        <b>規則：</b>Client Component 不能直接 import Server Component。  
        <b>解法：</b>讓 Server 在上層先渲染好 UI，然後把它用 <b>children/props slot</b> 傳進 Client，
        Client 負責互動與包裝視覺。
      </p>

      <InteractiveFrame title="Client 容器（可互動）">{serverRenderedUI}</InteractiveFrame>

      <div
        style={{
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.03)",
          padding: 14,
          color: "rgba(255,255,255,0.78)",
          lineHeight: 1.7,
        }}
      >
        <div style={{ fontWeight: 900, marginBottom: 8 }}>KeyPoint🎯</div>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li>「Client 不能 import Server，但 Server 可以把 UI 當 slot 傳進 Client。」</li>
          <li>「這樣互動 JS 只留在 Client 容器，Server UI 可保持輕量。」</li>
        </ul>
      </div>
    </div>
  );
}
