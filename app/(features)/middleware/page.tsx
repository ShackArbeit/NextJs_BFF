import Link from "next/link";
import TabNav from "./components/TabNav";
import DemoShell from "./components/DemoShell";
import RenameToProxyDemo from "./demos/Renam_to_Proxy";
import DalDtoDemo from "./demos/DAL_DTO";

type TabKey = "proxy" | "dal-dto";

function normalizeTab(v: unknown): TabKey {
  return v === "dal-dto" ? "dal-dto" : "proxy";
}

export default async function MiddlewareFeaturePage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const activeTab = normalizeTab(tab);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Middleware / Proxy / DAL+DTO Demo
              </h1>
              <p className="mt-2 text-zinc-300">
                使用 <code className="rounded bg-zinc-900 px-2 py-1">searchParams</code>{" "}
                + query tab 切換示範：<code className="rounded bg-zinc-900 px-2 py-1">/middleware?tab=...</code>
              </p>
            </div>

            <Link
              href="/"
              className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800"
            >
              ← Back Home
            </Link>
          </div>

          <TabNav activeTab={activeTab} />
        </header>

        <main className="mt-8">
          {activeTab === "proxy" ? (
            <DemoShell
              title="Proxy Route Handler (BFF) — 快速但容易變成資料直通"
              subtitle="前端呼叫我方 /api/proxy/posts；伺服器轉送 JSONPlaceholder，並將結果回傳。"
              bullets={[
                "✅ 優點：集中管理外部 API、可加 header/token、隔離 CORS。",
                "⚠️ 風險：如果只是『原樣轉送』，資料契約不明確、容易把不該回傳的欄位暴露。",
                "✅ 建議：Proxy 只當 transport；資料收斂要用 DTO / mapping。",
              ]}
              routeExample="/middleware?tab=proxy"
            >
              <RenameToProxyDemo />
            </DemoShell>
          ) : (
            <DemoShell
              title="DAL + DTO — 更安全的資料契約與欄位收斂"
              subtitle="DAL 統一存取；DTO 定義輸出欄位白名單，避免外部資料污染 UI。"
              bullets={[
                "✅ DTO：定義『我只回傳哪些欄位』，提升安全與穩定性。",
                "✅ DAL：集中 data-fetching，便於測試、快取策略與錯誤處理。",
                "✅ UI：永遠依賴 DTO 格式，不直接依賴外部 API 原始 payload。",
              ]}
              routeExample="/middleware?tab=dal-dto"
            >
              <DalDtoDemo />
            </DemoShell>
          )}
        </main>
      </div>
    </div>
  );
}
