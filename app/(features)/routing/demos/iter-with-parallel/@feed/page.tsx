import Link from "next/link";

type PicsumItem = { id: string; author: string };

export default async function IterFeed() {
  const res = await fetch("https://picsum.photos/v2/list?page=2&limit=12");
  const items = (await res.json()) as PicsumItem[];

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-3">
      {items.map((it) => (
        <Link
          key={it.id}
          href={`/routing/demos/iter-with-parallel/photos/${it.id}`}
          className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] text-white no-underline transition-all hover:border-white/20 hover:bg-white/[0.08]"
        >
          <img
            src={`https://picsum.photos/id/${it.id}/700/420`}
            alt={`picsum ${it.id}`}
            className="block h-[140px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="p-3">
            <div className="flex items-center justify-between gap-2">
              <div className="font-black">照片 #{it.id}</div>
              <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/70">
                (.) 彈窗
              </span>
            </div>
            <div className="mt-1.5 text-sm text-white/75">作者 {it.author}</div>
            <div className="mt-2 text-xs leading-relaxed text-white/60">
              點擊會攔截成彈窗, 平行欄位仍保留.
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
