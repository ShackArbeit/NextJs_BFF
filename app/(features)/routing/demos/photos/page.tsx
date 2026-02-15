import Link from "next/link";

type PicsumItem = {
  id: string;
  author: string;
  download_url: string;
};

export default async function PhotosPage() {
  const res = await fetch("https://picsum.photos/v2/list?page=1&limit=12");
  const items = (await res.json()) as PicsumItem[];

  return (
    <div className="text-white">
      <div className="text-[20px] font-black">攔截路由</div>
      <div className="mt-2 leading-[1.6] text-white/80">
        點圖片進詳情會成彈窗; 直接貼
        <code className="rounded bg-white/10 px-1">/routing/demos/photos/[id]</code>
        是完整頁面.
      </div>
      <div className="mt-[14px] grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
        {items.map((it) => (
          <Link
            key={it.id}
            href={`/routing/demos/photos/${it.id}`}
            className="group block overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.04] text-white no-underline transition-transform hover:scale-[1.02] hover:bg-white/[0.08]"
          >
            <img
              src={`https://picsum.photos/id/${it.id}/600/360`}
              alt={`picsum ${it.id}`}
              className="block h-[150px] w-full object-cover"
            />
            <div className="p-3">
              <div className="font-black">照片 #{it.id}</div>
              <div className="mt-1.5 text-sm text-white/75">作者 {it.author}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
