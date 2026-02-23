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
  return "structure";
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
          正在載入 Proxy / DAL + DTO 範例...
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
                Proxy / DAL + DTO 範例
              </h1>
              <p className="mt-2 text-zinc-400 text-sm">
                說明 BFF 層如何代理外部 API 並為 UI 整理資料。
              </p>
            </div>
            <Link
              href="/"
              className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800"
            >
              回首頁
            </Link>
          </div>

          <TabNav activeTab={activeTab} />
        </header>

        <main className="mt-8">
          {activeTab === "structure" ? (
            <section className="space-y-6">
              <ArchitectureOverview />
            </section>
          ) : activeTab === "proxy" ? (
            <DemoShell
              title="Proxy 路由處理器（BFF）：封裝外部 API 呼叫"
              subtitle="Client 呼叫 /api/proxy/posts；伺服器轉送到 JSONPlaceholder 並清理回應。"
              bullets={[
                "優點：可注入 headers/token、避免 CORS 問題、集中錯誤處理。",
                "隱藏外部 schema，UI 不依賴原始 payload。",
                "建議：先做 proxy，再映射為 DTO 再送給元件。",
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
              title="DAL + DTO：維持 UI 契約穩定"
              subtitle="DAL 負責外部 API 呼叫；DTO 定義 UI 需要的資料形狀。"
              bullets={[
                "DTO 限制對外欄位，讓 UI 更安全。",
                "DAL 集中 fetch 邏輯、重試、headers 與錯誤處理。",
                "UI 只依賴 DTO 輸出，後端 schema 變動也能隔離。",
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
