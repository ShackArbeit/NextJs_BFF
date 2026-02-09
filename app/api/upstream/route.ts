import { NextResponse } from "next/server";



export async function GET() {
  return NextResponse.json({
    ok: true,
    source: "upstream",
    uuidLike: crypto.randomUUID(),
    upstream_ts: new Date().toISOString(),
  });
}
