type Post = { id: number; title: string; body: string };

export default async function IterDetail() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=6"
  );
  const posts = (await res.json()) as Post[];

  return (
    <div className="grid gap-3">
      {posts.map((post) => (
        <div
          key={post.id}
          className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
        >
          <div className="text-sm font-semibold text-white">{post.title}</div>
          <div className="mt-2 text-xs leading-relaxed text-white/70">
            {post.body}
          </div>
        </div>
      ))}
    </div>
  );
}
