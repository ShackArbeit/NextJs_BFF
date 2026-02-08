
import Link from "next/link";
import { Suspense } from "react";
import WhatIsRSCPayload from "./demos/whatis_RSC_Payload";
import StreamFromServerToClient from "./demos/stream_fromServer_to_Client";
import ServerWithClient from "./demos/Server_with_Client";
import DataFromServerToClient from "./demos/data_fromServer_to_Client";

type TabKey =
  | "whatis_RSC_Payload"
  | "stream_fromServer_to_Client"
  | "Server_with_Client"
  | "data_fromServer_to_Client";

const TABS: Array<{
  key: TabKey;
  title: string;
  desc: string;
}> = [
  {
    key: "whatis_RSC_Payload",
    title: "RSC Payload 是什麼？",
    desc: "概念 + 圖解：Server/Client 的傳遞與呈現",
  },
  {
    key: "stream_fromServer_to_Client",
    title: "Streaming：Server → Client",
    desc: "Suspense +（可選）React use() 的體感 demo",
  },
  {
    key: "Server_with_Client",
    title: "Server × Client 交錯組合",
    desc: "composition：用 children/props slot 傳入 server-rendered UI",
  },
  {
    key: "data_fromServer_to_Client",
    title: "Data：Server → Client props",
    desc: "JSON-safe 資料傳遞與序列化邊界",
  },
];

function classNames(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

export default async function Page(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense fallback={<PageFallback />}>
      <PageContent searchParams={props.searchParams} />
    </Suspense>
  );
}

async function PageContent(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = (await props.searchParams) ?? {};
  const tabRaw = searchParams.tab;
  const tab = (Array.isArray(tabRaw) ? tabRaw[0] : tabRaw) as TabKey | undefined;

  const activeTab: TabKey =
    tab && TABS.some((t) => t.key === tab) ? tab : "whatis_RSC_Payload";

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "28px 18px",
        background:
          "radial-gradient(1200px 800px at 20% 10%, rgba(99,102,241,0.25), transparent 55%), radial-gradient(1000px 700px at 80% 30%, rgba(16,185,129,0.18), transparent 50%), #070A12",
        color: "rgba(255,255,255,0.92)",
      }}
    >
      <header style={{ maxWidth: 1100, margin: "0 auto 18px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>
            React Server Component vs Client Component
          </h1>
          <span
            style={{
              fontSize: 12,
              padding: "3px 8px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            /rsc-vs-client?tab=&lt;filename&gt;
          </span>
        </div>
        <p style={{ margin: "10px 0 0", color: "rgba(255,255,255,0.72)" }}>
          點 tab 切換 query string，對應到 demos/ 的檔名。✅
        </p>
      </header>

      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "360px 1fr",
          gap: 14,
        }}
      >
        <aside
          style={{
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            padding: 12,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>
            Tabs（檔名即 tab 值）
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {TABS.map((t) => {
              const isActive = t.key === activeTab;
              return (
                <Link
                  key={t.key}
                  href={`/rsc-vs-client?tab=${t.key}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <div
                    className={classNames(isActive && "active")}
                    style={{
                      borderRadius: 14,
                      padding: "10px 12px",
                      border: isActive
                        ? "1px solid rgba(99,102,241,0.55)"
                        : "1px solid rgba(255,255,255,0.10)",
                      background: isActive
                        ? "linear-gradient(180deg, rgba(99,102,241,0.22), rgba(255,255,255,0.04))"
                        : "rgba(255,255,255,0.03)",
                      boxShadow: isActive
                        ? "0 10px 30px rgba(99,102,241,0.18)"
                        : "none",
                      transition: "all .15s ease",
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: 14 }}>
                      {t.title}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        marginTop: 6,
                        color: "rgba(255,255,255,0.68)",
                        lineHeight: 1.4,
                      }}
                    >
                      {t.desc}
                    </div>
                    <div
                      style={{
                        marginTop: 8,
                        fontFamily:
                          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                        fontSize: 11,
                        color: "rgba(255,255,255,0.55)",
                      }}
                    >
                      tab={t.key}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div
            style={{
              marginTop: 14,
              fontSize: 12,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.5,
            }}
          >
            🧠 小提醒：這一頁是 <b>Server Component</b>，所以可以安全讀取
            searchParams、也可以做 server-side rendering 與 streaming。
          </div>
        </aside>
        <section
          style={{
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            padding: 14,
            overflow: "hidden",
          }}
        >
          <Suspense fallback={<DemoFallback tab={activeTab} />}>
            {activeTab === "whatis_RSC_Payload" && <WhatIsRSCPayload />}
            {activeTab === "stream_fromServer_to_Client" && (
              <StreamFromServerToClient />
            )}
            {activeTab === "Server_with_Client" && <ServerWithClient />}
            {activeTab === "data_fromServer_to_Client" && (
              <DataFromServerToClient />
            )}
          </Suspense>
        </section>
      </section>
    </main>
  );
}

function PageFallback() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "28px 18px",
        background:
          "radial-gradient(1200px 800px at 20% 10%, rgba(99,102,241,0.25), transparent 55%), radial-gradient(1000px 700px at 80% 30%, rgba(16,185,129,0.18), transparent 50%), #070A12",
        color: "rgba(255,255,255,0.92)",
      }}
    >
      <section style={{ maxWidth: 1100, margin: "0 auto" }}>
        <DemoFallback tab="loading" />
      </section>
    </main>
  );
}

function DemoFallback({ tab }: { tab: string }) {
  return (
    <div
      style={{
        padding: 14,
        borderRadius: 14,
        border: "1px dashed rgba(255,255,255,0.18)",
        background: "rgba(0,0,0,0.12)",
      }}
    >
      <div style={{ fontWeight: 800, fontSize: 14 }}>
        Loading demo: <span style={{ opacity: 0.8 }}>{tab}</span> …
      </div>
      <div style={{ marginTop: 10, opacity: 0.7, fontSize: 12, lineHeight: 1.6 }}>
        這裡的 fallback 會在 streaming / suspense 發生時先出現，讓你看到「先有殼，再補內容」的漸進體驗。
      </div>

      <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
        <SkeletonLine />
        <SkeletonLine />
        <SkeletonLine w="70%" />
      </div>
    </div>
  );
}

function SkeletonLine({ w = "100%" }: { w?: string }) {
  return (
    <div
      style={{
        width: w,
        height: 10,
        borderRadius: 999,
        background: "rgba(255,255,255,0.10)",
      }}
    />
  );
}
