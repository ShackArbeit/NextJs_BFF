import { Suspense } from "react";

export default function ParallelLayout({
  feed,
  detail,
}: {
  feed: React.ReactNode;
  detail: React.ReactNode;
}) {
  return (
    <div className="text-white">
      <div className="text-[20px] font-black">
        Parallel Routes 
      </div>
      <div className="mt-2 opacity-80 leading-relaxed">
        這頁用 <b>@feed</b> + <b>@detail</b> 同時渲染兩個 slot。
      </div>
      <div className="mt-[14px] grid grid-cols-[1.2fr_0.8fr] gap-[14px] items-start">
        <div className="rounded-[16px] border border-white/10 bg-white/5 p-[14px] transition-all duration-200 hover:bg-white/10">
          <Suspense fallback={<div className="text-sm opacity-70">Loading feed...</div>}>
            {feed}
          </Suspense>
        </div>
        <div className="rounded-[16px] border border-white/10 bg-white/5 p-[14px] transition-all duration-200 hover:bg-white/10">
          <Suspense fallback={<div className="text-sm opacity-70">Loading detail...</div>}>
            {detail}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
