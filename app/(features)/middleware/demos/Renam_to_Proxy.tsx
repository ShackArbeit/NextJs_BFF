/**
 * Proxy Demo
 * - UI 呼叫我方 Route Handler：/api/proxy/posts
 * - Route Handler 再轉送 JSONPlaceholder
 *
 * 這裡用來展示：
 * - 「Proxy/BFF」確實方便
 * - 但若只是原樣轉送：外部資料欄位會直通 UI（風險點）
 */

type ExternalPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function getProxyPosts(): Promise<ExternalPost[]> {
  // Server Component 內可用相對路徑 fetch
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/proxy/posts`, {
//     cache: "no-store",
//   });
const res = await fetch("http://localhost:3000/api/proxy/posts", { cache: "no-store" });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Proxy fetch failed: ${res.status} ${res.statusText} ${text}`);
  }

  return (await res.json()) as ExternalPost[];
}

export default async function RenameToProxyDemo() {
  // ⚠️ 若你在 dev 環境發現上面相對路徑不穩（視部署環境而定），
  // 你也可以改為直接 fetch("http://localhost:3000/api/proxy/posts")。
  // 但作品集通常不建議 hardcode；部署時用 NEXT_PUBLIC_BASE_URL 控制即可。

  const posts = await getProxyPosts();

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
        <div className="text-sm font-semibold text-zinc-200">Demo Flow</div>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-zinc-300">
          <li>UI（Server Component）fetch → <code>/api/proxy/posts</code></li>
          <li>Route Handler 轉送 → <code>jsonplaceholder.typicode.com/posts</code></li>
          <li>回傳外部 payload（含 userId/body）→ UI 直接渲染</li>
        </ol>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {posts.slice(0, 6).map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm text-zinc-400">External fields passthrough</div>
              <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs text-zinc-200">
                id={p.id} userId={p.userId}
              </span>
            </div>

            <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
            <p className="mt-2 line-clamp-4 text-sm text-zinc-300">{p.body}</p>

            <div className="mt-4 text-xs text-zinc-400">
              ⚠️ 這裡示範「原樣轉送」：<code>userId</code> / <code>body</code>{" "}
              直接進 UI，資料契約不收斂。
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
