import InteractiveFrame from "./parts/InteractiveFrame";

function ServerBadge({ text }: { text: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px", 
        borderRadius: 999,
        background: "rgba(16,185,129,0.16)",
        border: "1px solid rgba(16,185,129,0.30)",
        fontSize: 14, 
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
        gap: 14,
        padding: 16,
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(0,0,0,0.18)",
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 16 }}>這是 Server-rendered UI</div>
      <div style={{ opacity: 0.75, lineHeight: 1.7, fontSize: 15 }}>
        先在 Server Component 生成後，被「當成 children slot」傳進 Client Component，
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
    <div style={{ display: "grid", gap: 20 }}>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 900 }}>
        ③ Server 與 Client 交錯組合（composition / slot）
      </h2>

      <p style={{ margin: 0, fontSize: 16, color: "rgba(255,255,255,0.76)", lineHeight: 1.8 }}>
        <b>規則：</b>Client Component 不能直接 import Server Component。 <br/>
        <b>解法：</b>讓 Server 在上層先渲染好 UI，然後把它用 <b>children/props slot</b> 傳進 Client，
        Client 負責互動與包裝視覺。
      </p>

      <InteractiveFrame title="Client 容器（可互動）">
        {serverRenderedUI}
      </InteractiveFrame>

      <div
        style={{
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.03)",
          padding: 18,
          color: "rgba(255,255,255,0.78)",
          lineHeight: 1.8,
        }}
      >
        <div style={{ fontWeight: 900, marginBottom: 10, fontSize: 16 }}>KeyPoint🎯</div>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 15 }}>
          <li>「Client 不能直接引入 Server 組件，但 Server 可以把生成的 UI 當作屬性傳給 Client。」</li>
          <li>「這樣能確保互動所需的 JS 檔案只留在 Client 層，維持 Server UI 的輕量化。」</li>
        </ul>
      </div>
    </div>
  );
}