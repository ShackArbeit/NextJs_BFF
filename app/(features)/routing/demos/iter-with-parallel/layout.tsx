import type { ReactNode } from "react";
import { Suspense } from "react";
import HideParallelPanels from "./_components/HideParallelPanels.client";

export default function IterWithParallelLayout({
  children,
  feed,
  detail,
}: {
  children: ReactNode;
  feed: ReactNode;
  detail: ReactNode;
}) {
  return (
    <div className="text-white">
      <div className="text-[20px] font-black">攔截 + 平行</div>
      <div className="mt-2 text-sm leading-relaxed text-white/80">
        此頁結合平行 slot 與攔截路由. 左側列表與右側面板保留, 詳情以彈窗顯示.
      </div>
      {children}
      <Suspense fallback={null}>
        <HideParallelPanels />
      </Suspense>
      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] iter-parallel-panels">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-sm font-semibold uppercase tracking-wide text-white/60">
            平行區塊: @feed
          </div>
          <div className="mt-3">
            <Suspense fallback={null}>{feed}</Suspense>
          </div>
        </section>
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-sm font-semibold uppercase tracking-wide text-white/60">
            平行區塊: @detail
          </div>
          <div className="mt-3">
            <Suspense fallback={null}>{detail}</Suspense>
          </div>
        </section>
      </div>
    </div>
  );
}
