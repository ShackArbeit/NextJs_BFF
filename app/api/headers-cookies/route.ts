import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";



export async function GET() {

  const h = await headers();
  const c = await cookies();

 
  const current = Number(c.get("rh_count")?.value ?? "0");
  const nextCount = current + 1;

  const res = NextResponse.json({
    ok: true,
    concept: "headers / cookies",
    userAgent: h.get("user-agent"),
    cookie: { rh_count: nextCount },
    tip: "在 Next.js 15+ 中，headers() 與 cookies() 是非同步的。",
    ts: new Date().toISOString(),
  });

  res.cookies.set("rh_count", String(nextCount), {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
  });

  return res;
}