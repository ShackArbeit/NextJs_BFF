import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  return NextResponse.json({
    ok: true,
    concept: "Dynamic Route + params",
    params: { id },
    tip: "資料夾路徑 [id] 會變成 params.id",
    ts: new Date().toISOString(),
  });
}
