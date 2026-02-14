"use client";

import type { BoardKey, PostDTO } from "../action";

type Accent = "emerald" | "sky" | "amber" | "violet";

type BoardListProps = {
  board: BoardKey;
  posts: PostDTO[];
  emptyHint?: string;
  accent?: Accent;
};

const pill: Record<Accent, string> = {
  emerald: "text-emerald-300 bg-emerald-500/10 border-emerald-400/40",
  sky: "text-sky-300 bg-sky-500/10 border-sky-400/40",
  amber: "text-amber-200 bg-amber-500/15 border-amber-300/40",
  violet: "text-violet-300 bg-violet-500/10 border-violet-400/40",
};

function formatDate(value?: string | null) {
  if (!value) return "未知";
  return new Intl.DateTimeFormat("zh-TW", {
    hour12: false,
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function BoardListClient({
  board,
  posts,
  emptyHint = "尚無留言，來分享你的想法吧！",
  accent = "emerald",
}: BoardListProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5 shadow-lg shadow-black/20">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-white">留言</h4>
        <span
          className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${pill[accent]}`}
        >
          {posts.length} 則
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {posts.length === 0 ? (
          <div className="rounded-lg border border-dashed border-white/10 bg-white/5 px-4 py-6 text-sm text-zinc-400">
            {emptyHint}
          </div>
        ) : (
          posts.map((post) => (
            <article
              key={post._id}
              className="group rounded-xl border border-white/5 bg-white/5 p-4 shadow-inner shadow-black/30 transition hover:border-white/15"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-zinc-400">
                    {formatDate(post.createdAt ?? post.updatedAt ?? null)}
                  </p>
                  <h5 className="mt-1 text-sm font-semibold text-white">{post.username}</h5>
                </div>
              </div>

              <p className="mt-2 text-lg font-semibold text-white">{post.answer}</p>
              <p className="mt-1 text-sm text-zinc-300 leading-relaxed">{post.reason}</p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
