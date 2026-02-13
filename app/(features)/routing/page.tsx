import { Suspense } from "react";
import DemoTabs from "./_components/DemoTabs";
import DemoCard from "./_components/DemoCard";

type TabKey = "parallel" | "intercepting" | "iter";
async function RoutingContent({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const active = (tab ?? "parallel") as TabKey;

  return (
    <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[14px]">
      {active === "parallel" && (
        <>
          <DemoCard
            title="Parallel Routing Demo"
            badge="@feed + @detail"
            desc="URL 下同時渲染兩個 slot (列表, 詳情)."
            href="/routing/demos/parallel"
          />
          {/* <DemoCard
            title="JSONPlaceholder Content"
            badge="posts"
            desc="Parallel 的 feed 我們用 JSONPlaceholder 拉文章列表，detail 顯示單篇。"
            href="/routing/demos/parallel"
          /> */}
        </>
      )}

      {active === "intercepting" && (
        <>
          <DemoCard
            title="Intercepting Routing Demo"
            badge="(.) 彈窗攔截"
            desc="點圖片進詳情會成彈窗; 直接貼 URL 是完整頁面."
            href="/routing/demos/photos"
          />
          {/* <DemoCard
            title="Picsum Gallery"
            badge="picsum.photos"
            desc="用 Picsum 取得圖片列表與 detail。"
            href="/routing/demos/photos"
          /> */}
        </>
      )}

      {active === "iter" && (
        <>
          <DemoCard
            title="Parallel Plus Intercepting Demo "
            badge="列表 + 彈窗"
            desc="列表保留, 詳情以彈窗顯示 (@modal slot)."
            href="/routing/demos/iter-with-parallel"
          />
          {/* <DemoCard
            title="Why this matters"
            badge="interview-ready"
            desc="這種模式很像後台系統：列表不丟失、detail 用 overlay，使用者體驗超好。"
            href="/routing/demos/iter-with-parallel"
          /> */}
        </>
      )}
    </div>
  );
}
export default function RoutingHome({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  return (
    <div className="text-white">
      <div
        className={[
          "rounded-[22px] border border-white/10 p-[18px]",
          "bg-[radial-gradient(1200px_600px_at_10%_0%,rgba(99,102,241,0.35),transparent_60%),radial-gradient(900px_500px_at_90%_10%,rgba(236,72,153,0.25),transparent_55%),rgba(255,255,255,0.03)]",
        ].join(" ")}
      >
        <div className="text-[22px] font-black tracking-[0.2px]">
          路由示範 (App Router)
        </div>

        <div className="mt-2 opacity-85 leading-relaxed">
          用 searchParams(tab) 做導覽; 平行/攔截示範在 demos 路由結構.
        </div>
        <div className="mt-[14px]">
          <Suspense fallback={<div className="text-sm opacity-70">載入分頁中...</div>}>
            <DemoTabs />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<div className="mt-4 text-white">載入內容中...</div>}>
        <RoutingContent searchParams={searchParams} />
      </Suspense>
      {/* <div className="mt-4 text-[13px] opacity-70">
        小提示：你也可以直接打：<code>/routing?tab=parallel</code> /{" "}
        <code>intercepting</code> / <code>iter</code>
      </div> */}
    </div>
  );
}
