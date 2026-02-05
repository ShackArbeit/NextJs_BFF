import { NextResponse } from "next/server";


export const revalidate = 10;

export async function GET() {
 
  const upstream = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    next: { revalidate: 10},
  });
  const upstreamJson = await upstream.json();

  return NextResponse.json({
    ok: true,
    concept: "Caching",
    revalidateSeconds: 10,
    upstream: upstreamJson,
    ts: new Date().toISOString(),
    tip: "你一直刷新頁面時，ts 可能在 10 秒內不變（視環境/部署而定）。",
  });
}
