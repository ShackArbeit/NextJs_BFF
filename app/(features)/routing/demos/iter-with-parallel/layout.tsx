export default function IterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ color: "white" }}>
      <div style={{ fontSize: 20, fontWeight: 900 }}>Intercepting + Parallel ✅</div>
      <div style={{ marginTop: 8, opacity: 0.8, lineHeight: 1.6 }}>
        這頁的重點是：list 永遠在頁面上（像 parallel 的 main slot），點 detail 用攔截 modal 顯示（@modal）。
      </div>
      <div style={{ marginTop: 14 }}>{children}</div>
    </div>
  );
}
