import { NextResponse } from "next/server";

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
  try {
    const payload = (await req.json()) as Incoming;
    const bodyContent = payload.body ?? "";
    if (bodyContent.trim().length > 0) {
      try {
        const parsed = JSON.parse(bodyContent);
        if (typeof parsed === "object" && parsed !== null) {
          return NextResponse.json(
            { 
              ok: false, 
              error: "不允許在 Body 欄位中輸入 JSON 格式的內容",
              detectedFormat: parsed 
            },
            { status: 400 }
          );
        }
      } catch (e) {
        console.log("Body 驗證通過：內容為普通字串");
      }
    }
    console.log("Payload:", payload);
    const upstream = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        title: payload.title ?? "demo-title",
        body: bodyContent || "demo-body",
        userId: payload.userId ?? 1,
      }),
    });
    const upstreamJson = await upstream.json();
    return NextResponse.json({
      ok: true,
      concept: "Request Body Validation",
      received: payload,
      upstream: { status: upstream.status, data: upstreamJson },
      tip: "已加入 JSON 格式偵測，防止巢狀 JSON 輸入",
      ts: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload" },
      { status: 400 }
    );
  }
}