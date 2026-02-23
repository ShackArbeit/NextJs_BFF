import { dalGetPostsDTO, dalGetPostsRaw } from "./shared/dal";
import { PostDTO } from "./shared/dto";

export default async function DalDtoDemo() {
  const [raw, dtos] = await Promise.all([dalGetPostsRaw(4), dalGetPostsDTO(6)]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
        <div className="text-sm font-semibold text-zinc-200">資料對照</div>
        <div className="mt-2 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <div className="text-sm font-semibold">原始資料（外部）</div>
            <p className="mt-2 text-sm text-zinc-300">
              包含 UI 不一定需要的欄位，例如 <code>userId</code>、<code>body</code>。
            </p>
            <pre className="mt-3 overflow-auto rounded-lg bg-zinc-950 p-3 text-xs text-zinc-200">
{JSON.stringify(raw[0], null, 2)}
            </pre>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <div className="text-sm font-semibold">PostDTO（UI 友善格式）</div>
            <p className="mt-2 text-sm text-zinc-300">
              只輸出 UI 需要的欄位，例如 <code>{`{ id, title, summary }`}</code>。
            </p>
            <pre className="mt-3 overflow-auto rounded-lg bg-zinc-950 p-3 text-xs text-zinc-200">
{JSON.stringify(dtos[0], null, 2)}
            </pre>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {dtos.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-300">
        註：UI 依賴 DTO（穩定格式），即使外部 API 欄位變動，也只需調整 DAL/DTO 映射，UI 無須改動。
      </div>
    </div>
  );
}

function PostCard({ post }: { post: PostDTO }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-zinc-400">DTO 傳給 UI</div>
        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-200">
          id={post.id}
        </span>
      </div>

      <h3 className="mt-3 text-lg font-semibold">{post.title}</h3>
      <p className="mt-2 text-sm text-zinc-300">{post.summary}</p>

      <div className="mt-4 text-xs text-zinc-400">
        原始 <code>body</code> 不會進入 UI；已由 DTO 轉成 <code>summary</code>。
      </div>
    </div>
  );
}
