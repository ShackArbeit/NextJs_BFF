import Link from "next/link";
import { Suspense } from "react";

export default function IterPhotoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<div className="text-white">載入圖片中...</div>}>
      <IterPhotoDetailContent params={params} />
    </Suspense>
  );
}

async function IterPhotoDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="text-white">
      <div className="flex items-center gap-[10px]">
        <Link
          href="/routing/demos/iter-with-parallel"
          className="rounded-[10px] border border-white/15 bg-white/5 px-[10px] py-2 text-white no-underline transition-colors hover:bg-white/10"
        >
          返回
        </Link>
        <div className="text-[20px] font-black">完整頁面詳情 (#{id})</div>
      </div>
      <div className="mt-[14px] overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.04]">
        <img
          src={`https://picsum.photos/id/${id}/1100/650`}
          alt={`picsum ${id}`}
          className="block h-auto w-full"
        />
      </div>
      <div className="mt-3 leading-[1.7] text-white/80">
        直接開啟 URL 會是完整頁面; 從 /routing/demos/iter-with-parallel 進入會是彈窗.
      </div>
    </div>
  );
}
