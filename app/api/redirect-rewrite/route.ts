import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get("mode") ?? "redirect";

  if (mode === "redirect") {
    return NextResponse.redirect(
      new URL("/route-handlers?tab=http_methods", req.nextUrl)
    );
  }

  return NextResponse.json({
    ok: true,
    concept: "Redirect / Rewrite",
    note: "Rewrite 通常更適合在 middleware 做；Route Handler 最常見是 redirect 或回傳 JSON。",
    example: "試試 /api/redirect-rewrite?mode=redirect",
    ts: new Date().toISOString(),
  });
}
