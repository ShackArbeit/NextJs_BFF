import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  const host = (await headers()).get("host");
  const proto = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${proto}://${host}`;

  const upstreamRes = await fetch(`${baseUrl}/api/upstream`, {
    next: { revalidate: 10 },
  });

  const upstreamJson = await upstreamRes.json();

  return NextResponse.json({
    ok: true,
    concept: "Caching upstream fetch only",
    revalidateSeconds: 10,

    upstream: upstreamJson,

    ts: new Date().toISOString(),
  });
}
