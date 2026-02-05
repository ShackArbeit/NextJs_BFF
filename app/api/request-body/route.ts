import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Incoming = {
  title?: string;
  body?: string;
  userId?: number;
};

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { ok: false, error: "Please send JSON body with Content-Type: application/json" },
      { status: 415 }
    );
  }

  const payload = (await req.json()) as Incoming;

  const upstream = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      title: payload.title ?? "demo-title",
      body: payload.body ?? "demo-body",
      userId: payload.userId ?? 1,
    }),
  });

  const upstreamJson = await upstream.json();

  return NextResponse.json({
    ok: true,
    concept: "Request Body",
    received: payload,
    upstream: { status: upstream.status, data: upstreamJson },
    tip: "讀 body：req.json() / req.formData() / req.text()（依 content-type）",
    ts: new Date().toISOString(),
  });
}
