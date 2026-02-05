import ClientPostsPanel from "./parts/ClientPostsPanel";

type Post = { id: number; title: string; body: string };

async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch posts");
  const data = (await res.json()) as Post[];
  return data.slice(0, 8);
}

export default async function DataFromServerToClient() {
  const posts = await getPosts();

  // ✅ OK：JSON-safe
  const safePayload = {
    fetchedAtISO: new Date().toISOString(),
    posts,
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900 }}>
        ④ 從 Server 傳資料到 Client（props / 序列化邊界）
      </h2>

      <p style={{ margin: 0, color: "rgba(255,255,255,0.76)", lineHeight: 1.7 }}>
        這個 demo 用 Server Component 去 fetch 外部 API，然後把資料用 props 丟給 Client Component 做互動。
        <b>重點：</b>Server → Client 的 props 必須是 <b>可序列化（JSON-safe）</b>。
      </p>

      <ClientPostsPanel payload={safePayload} />

      <HintCard />
    </div>
  );
}

function HintCard() {
  return (
    <div
      style={{
        marginTop: 4,
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(0,0,0,0.16)",
        padding: 14,
        color: "rgba(255,255,255,0.78)",
        lineHeight: 1.7,
      }}
    >
      <div style={{ fontWeight: 900, marginBottom: 6 }}>KeyPoint🧠</div>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        <li>
          「Server 負責 fetch 與組 payload，Client 負責互動呈現。」
        </li>
      </ul>
    </div>
  );
}
