import { dalGetPostsDTO, dalGetPostsRaw } from "./shared/dal";
import { PostDTO } from "./shared/dto";

export default async function DalDtoDemo() {
  const [raw, dtos] = await Promise.all([dalGetPostsRaw(4), dalGetPostsDTO(6)]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
        <div className="text-sm font-semibold text-zinc-200">Data comparison</div>
        <div className="mt-2 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <div className="text-sm font-semibold">Raw data (external)</div>
            <p className="mt-2 text-sm text-zinc-300">
              Contains fields like <code>userId</code> and <code>body</code> that the UI may not need directly.
            </p>
            <pre className="mt-3 overflow-auto rounded-lg bg-zinc-950 p-3 text-xs text-zinc-200">
{JSON.stringify(raw[0], null, 2)}
            </pre>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <div className="text-sm font-semibold">PostDTO (UI-friendly shape)</div>
            <p className="mt-2 text-sm text-zinc-300">
              Only expose the fields UI needs, e.g. <code>{`{ id, title, summary }`}</code>.
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
        Note: the UI depends on DTOs (stable format), so even if the external API changes fields, you only need to adjust DAL/DTO mapping and keep UI untouched.
      </div>
    </div>
  );
}

function PostCard({ post }: { post: PostDTO }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-zinc-400">DTO sent to UI</div>
        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-200">
          id={post.id}
        </span>
      </div>

      <h3 className="mt-3 text-lg font-semibold">{post.title}</h3>
      <p className="mt-2 text-sm text-zinc-300">{post.summary}</p>

      <div className="mt-4 text-xs text-zinc-400">
        Raw <code>body</code> never reaches the UI; it was transformed into <code>summary</code> by the DTO.
      </div>
    </div>
  );
}
