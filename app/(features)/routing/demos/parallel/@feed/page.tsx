import Link from "next/link";

type Post = { id: number; title: string; body: string };

export default async function FeedSlot() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=8");
  const posts = (await res.json()) as Post[];

  return (
    <div>
      <div style={{ fontWeight: 900, marginBottom: 10 }}>@feed (Posts)</div>

      <div style={{ display: "grid", gap: 10 }}>
        {posts.map((p) => (
          <Link
            key={p.id}
            href={`/routing/demos/parallel?postId=${p.id}`}
            style={{
              textDecoration: "none",
              color: "white",
              padding: 12,
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(0,0,0,0.18)",
            }}
          >
            <div style={{ fontWeight: 800 }}>{p.title}</div>
            <div style={{ opacity: 0.75, marginTop: 6, lineHeight: 1.6 }}>
              {p.body.slice(0, 90)}...
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
