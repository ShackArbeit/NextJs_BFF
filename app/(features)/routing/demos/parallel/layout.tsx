export default function ParallelLayout({
  feed,
  detail,
}: {
  feed: React.ReactNode;
  detail: React.ReactNode;
}) {
  return (
    <div style={{ color: "white" }}>
      <div style={{ fontSize: 20, fontWeight: 900 }}>Parallel Routes ✅</div>
      <div style={{ marginTop: 8, opacity: 0.8, lineHeight: 1.6 }}>
        這頁用 <b>@feed</b> + <b>@detail</b> 同時渲染兩個 slot。
      </div>

      <div
        style={{
          marginTop: 14,
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: 14,
          alignItems: "start",
        }}
      >
        <div
          style={{
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            padding: 14,
          }}
        >
          {feed}
        </div>

        <div
          style={{
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            padding: 14,
          }}
        >
          {detail}
        </div>
      </div>
    </div>
  );
}
