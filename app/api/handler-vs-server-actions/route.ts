import { NextResponse } from "next/server";


export async function GET() {
  return NextResponse.json({
    ok: true,
    concept: "Route Handler vs Server Actions",
    routeHandler: {
      goodFor: ["公開 REST API", "給其他 client 用", "webhook", "需要明確 HTTP contract"],
      transport: "HTTP request/response",
      auth: "常用 headers/cookies/token",
    },
    serverActions: {
      goodFor: ["表單提交", "站內 mutation", "減少 client glue code", "和 RSC 搭配"],
      transport: "framework-managed (RPC-like)",
      note: "Server Actions 不等於公開 API；更偏向 app 內部呼叫的 mutation",
    },
    ts: new Date().toISOString(),
  });
}
