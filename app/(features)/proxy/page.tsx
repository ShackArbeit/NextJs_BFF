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
          Loading Proxy / DAL + DTO demos...
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
                Proxy / DAL + DTO demos
              </h1>
              <p className="mt-2 text-zinc-400 text-sm">
                Show how a BFF layer proxies external APIs and shapes data for the UI.
              </p>
            </div>
            <Link
              href="/"
              className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800"
            >
              Back to home
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
              title="Proxy Route Handler (BFF): wrap external API calls"
              subtitle="Client calls /api/proxy/posts; the server forwards to JSONPlaceholder and scrubs the response."
              bullets=[
                "Benefits: can inject headers/tokens, avoid CORS pain, and centralize error handling.",
                "Keeps external schemas hidden so UI does not depend on raw payloads.",
                "Recommendation: proxy requests, then map to DTOs before sending to components.",
              ]
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
              title="DAL + DTO: keep UI contracts stable"
              subtitle="DAL owns external API calls; DTO defines the shape the UI consumes."
              bullets=[
                "DTO limits which fields are exposed and keeps the UI safe.",
                "DAL centralizes fetch logic, retries, headers, and errors.",
                "UI only depends on DTO output, so backend schema changes stay isolated.",
              ]
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
