import Link from "next/link";
import { Suspense } from "react";
import TabNav, { TabKey } from "./components/TabNav";
import DemoShell from "./components/DemoShell";
import RenameToProxyDemo from "./demos/Renam_to_Proxy";
import DalDtoDemo from "./demos/DAL_DTO";
import ArchitectureOverview from "./demos/ArchitectureOverview";

function normalizeTab(v: unknown): TabKey {
  if (v === "proxy") return "proxy";
  if (v === "dal-dto") return "dal-dto";
  return "Whole Structure";
}

export default function ProxyFeaturePage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="px-6 py-10 text-zinc-300">
          載入 Proxy / DAL+DTO 示範中...
        </div>
      }
    >
      <ProxyContent searchParams={searchParams} />
    </Suspense>
  );
}

async function ProxyContent({
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
                Proxy / DAL+DTO 示範
              </h1>
            </div>
            <Link
              href="/"
              className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800"
            >
              返回首頁
            </Link>
          </div>

          <TabNav activeTab={activeTab} />
        </header>

        <main className="mt-8">
          {activeTab === "Whole Structure" ? (
            <section className="space-y-6">
              <ArchitectureOverview />
            </section>
          ) : activeTab === "proxy" ? (
            <DemoShell
              title="Proxy Route Handler (BFF)：包裝外部呼叫"
              subtitle="客端只呼叫 /api/proxy/posts；伺服器轉送到 JSONPlaceholder 並清理回傳資料。"
              bullets={[
                "閘道：可附加 headers/token，集中處理 CORS。",
                "降低風險：隱藏外部 API 結構與敏感值。",
                "建議：Proxy 只負責傳輸，形狀交給 DTO／映射。",
              ]}
              routeExample="/proxy?tab=proxy"
            >
              <Suspense
                fallback={
                  <div className="grid gap-4 md:grid-cols-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={`proxy-skeleton-${i}`}
                        className="animate-pulse rounded-2xl border border-zinc-800 bg-zinc-950 p-5"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="h-3 w-40 rounded bg-zinc-800" />
                          <div className="h-5 w-28 rounded-full bg-zinc-800" />
                        </div>
                        <div className="mt-4 h-6 w-3/4 rounded bg-zinc-800" />
                        <div className="mt-3 space-y-2">
                          <div className="h-3 w-full rounded bg-zinc-800" />
                          <div className="h-3 w-11/12 rounded bg-zinc-800" />
                          <div className="h-3 w-10/12 rounded bg-zinc-800" />
                        </div>
                        <div className="mt-4 h-3 w-36 rounded bg-zinc-800" />
                      </div>
                    ))}
                  </div>
                }
              >
                <RenameToProxyDemo />
              </Suspense>
            </DemoShell>
          ) : (
            <DemoShell
              title="DAL + DTO：可控的資料契約"
              subtitle="DAL 管理外部 API 存取；DTO 定義 UI 能拿到的資料形狀。"
              bullets={[
                "DTO 決定哪些欄位能輸出，提升安全與穩定。",
                "DAL 集中資料抓取，方便快取、重試與錯誤處理。",
                "UI 永遠依賴 DTO 輸出，不直接碰外部原始資料。",
              ]}
              routeExample="/proxy?tab=dal-dto"
            >
              <DalDtoDemo />
            </DemoShell>
          )}
        </main>
      </div>
    </div>
  );
}
