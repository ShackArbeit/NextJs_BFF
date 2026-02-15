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
            <div className="text-sm font-semibold">原始資料（外部欄位）</div>
            <p className="mt-2 text-sm text-zinc-300">
              包含 <code>userId</code>、<code>body</code> 等 UI 不一定需要的欄位。
            </p>
            <pre className="mt-3 overflow-auto rounded-lg bg-zinc-950 p-3 text-xs text-zinc-200">
{JSON.stringify(raw[0], null, 2)}
            </pre>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <div className="text-sm font-semibold">PostDTO（輸出給 UI 的定義）</div>
            <p className="mt-2 text-sm text-zinc-300">
              只暴露 UI 需要的 <code>{`{ id, title, summary }`}</code>。
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
        提醒：UI 只依賴 DTO（固定格式），即使外部 API 欄位調整，也只需要更新 DAL/DTO
        mapping，不用讓 UI 跟著改。
      </div>
    </div>
  );
}

function PostCard({ post }: { post: PostDTO }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-zinc-400">DTO 安全輸出</div>
        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-200">
          id={post.id}
        </span>
      </div>

      <h3 className="mt-3 text-lg font-semibold">{post.title}</h3>
      <p className="mt-2 text-sm text-zinc-300">{post.summary}</p>

      <div className="mt-4 text-xs text-zinc-400">
        原始 body 沒有直接送到 UI，而是由 DTO 轉成 summary。
      </div>
    </div>
  );
}
