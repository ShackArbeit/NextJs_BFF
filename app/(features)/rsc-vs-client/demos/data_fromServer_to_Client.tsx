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
  const safePayload = {
    fetchedAtISO: new Date().toISOString(),
    posts,
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 900 }}>
        ④ 從 Server 傳資料到 Client（props / 序列化邊界）
      </h2>

      <p style={{ margin: 0, fontSize: 16, color: "rgba(255,255,255,0.76)", lineHeight: 1.8 }}>
        這個 demo 用 Server Component 去 fetch 外部 API，然後把資料用 props 丟給 Client Component 做互動。
        <br />
        <b>重點：</b>從 Server 跨越邊界傳給 Client 的 props 必須是 <b>可序列化（JSON-safe）</b> 的格式。
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
        marginTop: 8,
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(0,0,0,0.16)",
        padding: 18,
        color: "rgba(255,255,255,0.78)",
        lineHeight: 1.8,
      }}
    >
      <div style={{ fontWeight: 900, marginBottom: 10, fontSize: 16 }}>KeyPoint🧠</div>
      <ul style={{ margin: 0, paddingLeft: 20, fontSize: 15 }}>
        <li>
          「Server 負責 fetch 與組 payload，Client 負責互動呈現。」
        </li>
        <li>
          「不可傳遞 Function、Class 實例或包含循環引用的物件，因為這些無法被序列化為 RSC Payload。」
        </li>
      </ul>
    </div>
  );
}