import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);

  return NextResponse.json({
    ok: true,
    type: "Request",
    url: req.url,
    searchParams: Object.fromEntries(url.searchParams.entries()),
    note: "改用 NextRequest 才有 nextUrl / cookies() 等更 Next.js 友善的 API",
  });
}
