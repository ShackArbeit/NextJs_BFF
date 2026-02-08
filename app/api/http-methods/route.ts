import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    method: "GET",
    supported: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    tip: "Route Handlers 只要 export 對應方法即可；沒 export 的 method 會回 405。",
    ts: new Date().toISOString(),
  });
}

export async function POST() {
  return NextResponse.json({
    ok: true,
    method: "POST",
    message: "POST handler is active ✅",
    ts: new Date().toISOString(),
  });
}

export async function PUT() {
  return NextResponse.json({ ok: true, method: "PUT",ts: new Date().toISOString(), });
}

export async function PATCH() {
  return NextResponse.json({ ok: true, method: "PATCH" ,ts: new Date().toISOString(),});
}

export async function DELETE() {
  return NextResponse.json({ ok: true, method: "DELETE" ,ts: new Date().toISOString(),});
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}
