import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, ctx: { params: { id: string } }) {
  return NextResponse.json({
    ok: true,
    concept: "Dynamic Route + params",
    params: ctx.params,
    tip: "資料夾路徑 [id] 會變成 ctx.params.id",
    ts: new Date().toISOString(),
  });
}
