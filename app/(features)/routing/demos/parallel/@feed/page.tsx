import Link from "next/link";

type Post = { id: number; title: string; body: string };

export default async function FeedSlot() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=8"
  );
  const posts = (await res.json()) as Post[];

  return (
    <div>
      <div className="font-black mb-[10px] text-white">
          @feed (文章)
      </div>
      <div className="grid gap-[10px]">
        {posts.map((p) => (
          <Link
            key={p.id}
            href={`/routing/demos/parallel?postId=${p.id}`}
            className="
              no-underline text-white
              p-3
              rounded-[14px]
              border border-white/10
              bg-black/20
              transition-all duration-200
              hover:bg-black/30
              hover:-translate-y-0.5
              hover:border-white/20
            "
          >
            <div className="font-extrabold">
              {p.title}
            </div>
            <div className="opacity-75 mt-[6px] leading-relaxed text-sm">
              {p.body.slice(0, 90)}...
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
