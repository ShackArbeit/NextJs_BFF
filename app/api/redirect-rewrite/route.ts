import { NextResponse } from "next/server";


export async function GET(req: Request) {
  const url = new URL(req.url);
  const mode = url.searchParams.get("mode") ?? "redirect";

  if (mode === "redirect") {
    // 302 redirect 到 feature page（你可以改 tab）
    return NextResponse.redirect(new URL("/router-handlers?tab=http_methods", req.url));
  }

  return NextResponse.json({
    ok: true,
    concept: "Redirect / Rewrite",
    note: "Rewrite 通常更適合在 middleware 做；Route Handler 最常見是 redirect 或回傳 JSON。",
    example: "試試 /api/redirect-rewrite?mode=redirect",
    ts: new Date().toISOString(),
  });
}
