import DemoTabs from "./_components/DemoTabs";
import DemoCard from "./_components/DemoCard";

type TabKey = "parallel" | "intercepting" | "iter";

export default async function RoutingHome({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const active = (tab ?? "parallel") as TabKey;

  const headerStyle: React.CSSProperties = {
    borderRadius: 22,
    border: "1px solid rgba(255,255,255,0.12)",
    background:
      "radial-gradient(1200px 600px at 10% 0%, rgba(99,102,241,0.35), transparent 60%), radial-gradient(900px 500px at 90% 10%, rgba(236,72,153,0.25), transparent 55%), rgba(255,255,255,0.03)",
    padding: 18,
  };

  return (
    <div style={{ color: "white" }}>
      <div style={headerStyle}>
        <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 0.2 }}>
          Routing Demos (App Router)
        </div>
        <div style={{ marginTop: 8, opacity: 0.85, lineHeight: 1.6 }}>
          這裡用 <b>searchParams(tab)</b> 做導覽與說明；真正的 Parallel/Intercepting 展示會在 demos 的路由結構完成。
        </div>
        <div style={{ marginTop: 14 }}>
          <DemoTabs />
        </div>
      </div>

      <div
        style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 14,
        }}
      >
        {active === "parallel" ? (
          <>
            <DemoCard
              title="Parallel Routes Demo"
              badge="@feed + @detail"
              desc="同一個 URL 結構下，同時渲染兩個 slot（例如左欄 Feed、右欄 Detail）。"
              href="/routing/demos/parallel"
            />
            <DemoCard
              title="JSONPlaceholder Content"
              badge="posts"
              desc="Parallel 的 feed 我們用 JSONPlaceholder 拉文章列表，detail 顯示單篇。"
              href="/routing/demos/parallel"
            />
          </>
        ) : null}

        {active === "intercepting" ? (
          <>
            <DemoCard
              title="Intercepting Routes Demo"
              badge="(.) modal intercept"
              desc="點圖片進 detail 時，在 /routing 上以 Modal 呈現（攔截）；直接貼 URL 則是 full page。"
              href="/routing/demos/photos"
            />
            <DemoCard
              title="Picsum Gallery"
              badge="picsum.photos"
              desc="用 Picsum 取得圖片列表與 detail。"
              href="/routing/demos/photos"
            />
          </>
        ) : null}

        {active === "iter" ? (
          <>
            <DemoCard
              title="Intercepting + Parallel"
              badge="list + modal"
              desc="同一頁面維持 list（主內容），detail 用攔截成 modal（@modal slot）。"
              href="/routing/demos/iter-with-parallel"
            />
            <DemoCard
              title="Why this matters"
              badge="interview-ready"
              desc="這種模式很像後台系統：列表不丟失、detail 用 overlay，使用者體驗超好。"
              href="/routing/demos/iter-with-parallel"
            />
          </>
        ) : null}
      </div>

      <div style={{ marginTop: 16, opacity: 0.7, fontSize: 13 }}>
        小提示：你也可以直接打：<code>/routing?tab=parallel</code> / <code>intercepting</code> / <code>iter</code>
      </div>
    </div>
  );
}
