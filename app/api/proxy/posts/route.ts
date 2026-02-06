import { NextResponse } from "next/server";

const UPSTREAM = "https://jsonplaceholder.typicode.com/posts";

/**
 * Proxy/BFF endpoint：
 * - 這裡示範「轉送」外部 API
 * - 你也可以在這裡加 auth、rate limit、header、觀測、error normalization
 */
export async function GET() {
  try {
    const res = await fetch(UPSTREAM, { cache: "no-store" });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        {
          ok: false,
          error: `Upstream error: ${res.status} ${res.statusText}`,
          detail: text,
        },
        { status: 502 }
      );
    }

    const data = await res.json();

    // 這裡刻意「原樣回傳」：用來展示風險
    // ✅ 若你要更安全：在這裡做 DTO mapping 再回傳
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Proxy failed", detail: String(err) },
      { status: 500 }
    );
  }
}
