import Link from "next/link";

type PicsumItem = { id: string; author: string };

export default async function IterWithParallelPage() {
  const res = await fetch("https://picsum.photos/v2/list?page=2&limit=10");
  const items = (await res.json()) as PicsumItem[];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 12,
      }}
    >
      <div style={{ fontWeight: 900, opacity: 0.9 }}>List (keep alive)</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 12,
        }}
      >
        {items.map((it) => (
          <Link
            key={it.id}
            href={`/routing/demos/photos/${it.id}`}
            style={{
              textDecoration: "none",
              color: "white",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            <img
              src={`https://picsum.photos/id/${it.id}/700/420`}
              alt={`picsum ${it.id}`}
              style={{ width: "100%", height: 150, objectFit: "cover", display: "block" }}
            />
            <div style={{ padding: 12 }}>
              <div style={{ fontWeight: 900 }}>Photo #{it.id}</div>
              <div style={{ opacity: 0.75, marginTop: 6 }}>by {it.author}</div>
              <div style={{ marginTop: 10, opacity: 0.75 }}>
                點我會走到同一個 detail 路由，但在 /routing 層會被攔截成 modal。
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
