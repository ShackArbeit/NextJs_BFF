import { NextResponse } from "next/server";

const UPSTREAM = "https://jsonplaceholder.typicode.com/posts";


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

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Proxy failed", detail: String(err) },
      { status: 500 }
    );
  }
}
