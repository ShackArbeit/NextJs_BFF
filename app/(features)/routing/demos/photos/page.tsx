import Link from "next/link";

type PicsumItem = {
  id: string;
  author: string;
  download_url: string;
};

export default async function PhotosPage() {
  const res = await fetch("https://picsum.photos/v2/list?page=1&limit=12");
  const items = (await res.json()) as PicsumItem[];

  return (
    <div style={{ color: "white" }}>
      <div style={{ fontSize: 20, fontWeight: 900 }}>Intercepting Routes ✅ (Gallery)</div>
      <div style={{ marginTop: 8, opacity: 0.8, lineHeight: 1.6 }}>
        從這裡點進 detail：在某些父層（例如 /routing）會被攔截成 modal。
        直接貼 <code>/routing/demos/photos/[id]</code> 則是 full page。
      </div>

      <div
        style={{
          marginTop: 14,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
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
              src={`https://picsum.photos/id/${it.id}/600/360`}
              alt={`picsum ${it.id}`}
              style={{ width: "100%", height: 150, objectFit: "cover", display: "block" }}
            />
            <div style={{ padding: 12 }}>
              <div style={{ fontWeight: 900 }}>Photo #{it.id}</div>
              <div style={{ opacity: 0.75, marginTop: 6 }}>by {it.author}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
