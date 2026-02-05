export default function WhatIsRSCPayload() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900 }}>
        ① RSC Payload 是什麼？
      </h2>

      <p style={{ margin: 0, color: "rgba(255,255,255,0.76)", lineHeight: 1.7 }}>
        在 App Router 中，預設 <b>page/layout 是 Server Components</b>。當你在 Server
        Components 渲染 UI 時，Next.js 會把「足以讓 Client 重建畫面的資訊」以一種串流形式送到瀏覽器，
        這份資訊通常就被稱為 <b>RSC Payload</b>（你可以把它理解成：Server 渲染 UI 的結果與指令，讓 Client
        能把畫面組起來）。
      </p>

      <Card title="核心直覺（你要能一句話講給面試官聽）">
        RSC Payload ≈ <b>Server 端把 React Tree 的結果以「可被 Client 消化」的格式串流送出</b>，
        Client 再用它來組裝/更新 UI（並不是把所有程式碼都丟給 Client）。
      </Card>

      <div
        style={{
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(0,0,0,0.18)",
          padding: 14,
          overflow: "auto",
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: 12,
          lineHeight: 1.6,
          color: "rgba(255,255,255,0.78)",
        }}
      >
        <div style={{ fontWeight: 900, marginBottom: 8 }}>文字圖解（概念示意）</div>
        <pre style={{ margin: 0, whiteSpace: "pre" }}>{DIAGRAM}</pre>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Card title="Server Component 擅長做什麼？">
          <ul style={{ margin: "8px 0 0", paddingLeft: 18, lineHeight: 1.8 }}>
            <li>靠近資料源 fetch（DB / API）</li>
            <li>保護 secrets（API keys）</li>
            <li>減少送到瀏覽器的 JS</li>
            <li>把 UI 結果串流給 Client（更快看到內容）</li>
          </ul>
        </Card>

        <Card title="Client Component 擅長做什麼？">
          <ul style={{ margin: "8px 0 0", paddingLeft: 18, lineHeight: 1.8 }}>
            <li>互動（onClick / onChange）</li>
            <li>state（useState）與 effects（useEffect）</li>
            <li>瀏覽器 API（localStorage / window）</li>
            <li>讓 Server-rendered UI「包進互動容器」</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

const DIAGRAM = `
[Server]                           [Client]
  Server Components render           Client receives "RSC Payload"
  fetch close to source              and composes UI progressively
  (secrets stay here)                (interactive parts hydrate)

  React Tree
    │
    ├─ HTML (initial shell)
    └─ RSC Payload (streamed)
           │
           ▼
      Client composes final UI
      + hydrates Client Components
`;

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.03)",
        padding: 14,
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 13 }}>{title}</div>
      <div style={{ marginTop: 8, color: "rgba(255,255,255,0.78)", lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  );
}
