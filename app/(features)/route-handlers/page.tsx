// app/(features)/route-handlers/page.tsx
import Link from "next/link";
import { Suspense } from "react";

import HttpMethods from "./demos/http_methods";
import RequestNextRequest  from "./demos/request_nextrequest"
import DynamicParams from "./demos/dynamic_params";
import Caching from "./demos/caching";
import HeadersCookies from "./demos/headers_cookies";
import RedirectRewrite from "./demos/redirect_rewrite";
import RequestBody from "./demos/request_body";
import HandlerVsActions from "./demos/handler_vs_actions";

const demoMap = {
  http_methods: HttpMethods,
  request_nextrequest: RequestNextRequest,
  dynamic_params: DynamicParams,
  caching: Caching,
  headers_cookies: HeadersCookies,
  redirect_rewrite: RedirectRewrite,
  request_body: RequestBody,
  handler_vs_actions: HandlerVsActions,
} as const;

type TabKey = keyof typeof demoMap;

const tabs: { key: TabKey; label: string; desc: string }[] = [
  { key: "http_methods", label: "HTTP Methods", desc: "GET/POST/PUT/PATCH/DELETE/OPTIONS/HEAD" },
  { key: "request_nextrequest", label: "Request vs NextRequest", desc: "req.url + searchParams" },
  { key: "dynamic_params", label: "Dynamic Params", desc: "app/api/.../[id] → params.id" },
  { key: "caching", label: "Caching", desc: "revalidate + upstream fetch cache" },
  { key: "headers_cookies", label: "Headers / Cookies", desc: "next/headers + res.cookies.set" },
  { key: "redirect_rewrite", label: "Redirect / Rewrite", desc: "redirect(302) + rewrite 說明" },
  { key: "request_body", label: "Request Body", desc: "POST req.json() + jsonplaceholder" },
  { key: "handler_vs_actions", label: "Handler vs Actions", desc: "REST API vs form mutation" },
];

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  return (
    <Suspense fallback={<PageFallback />}>
      <PageContent searchParams={searchParams} />
    </Suspense>
  );
}

async function PageContent({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const tabRaw = resolvedSearchParams.tab ?? "http_methods";
  const tab = (Object.keys(demoMap) as TabKey[]).includes(tabRaw as TabKey)
    ? (tabRaw as TabKey)
    : "http_methods";

  const Demo = demoMap[tab];

  return (
    <div style={pageStyle}>
      <header style={{ display: "grid", gap: 8 }}>
        <h1 style={{ fontSize: 28, fontWeight: 950, margin: 0 }}>
          Route Handlers Playground
        </h1>
        <p style={{ margin: 0, color: "#b8b8b8" }}>
          點 tab 切換 demos；每個 demo 都會去呼叫對應的 <code style={codePill}>app/api</code>{" "}
          Route Handler 🧪
        </p>
      </header>

      <nav style={navStyle}>
        {tabs.map((t) => {
          const active = t.key === tab;
          return (
            <Link
              key={t.key}
              href={`/route-handlers?tab=${t.key}`}
              style={{
                ...tabCardStyle,
                background: active ? "#ffffff" : "#0f0f10",
                color: active ? "#111" : "#fff",
                borderColor: active ? "#ffffff" : "#2a2a2a",
              }}
            >
              <div style={{ fontWeight: 950 }}>{t.label}</div>
              <div style={{ fontSize: 12, opacity: active ? 0.7 : 0.75, marginTop: 4 }}>
                {t.desc}
              </div>
              <div style={{ fontSize: 12, marginTop: 8, opacity: active ? 0.7 : 0.6 }}>
                tab=<span style={{ fontFamily: "monospace" }}>{t.key}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <main style={{ marginTop: 18 }}>
        <div style={pillRow}>
          <span style={pill}>
            Active tab: <strong style={{ marginLeft: 6 }}>{tab}</strong>
          </span>
          <span style={{ color: "#9a9a9a", fontSize: 13 }}>
            Tip：直接改 URL 的 tab 也能切換（例如 <code style={codePill}>?tab=caching</code>）
          </span>
        </div>

        <div style={{ marginTop: 12 }}>
          <Demo />
        </div>
      </main>
    </div>
  );
}

function PageFallback() {
  return (
    <div style={pageStyle}>
      <div style={pillRow}>
        <span style={pill}>Loading route handlers...</span>
      </div>
    </div>
  );
}

/* ---------- styles (no tailwind dependency) ---------- */

const pageStyle: React.CSSProperties = {
  padding: 24,
  color: "#fff",
  background: "linear-gradient(180deg, #070708 0%, #0b0b0c 100%)",
  minHeight: "100vh",
};

const navStyle: React.CSSProperties = {
  display: "grid",
  gap: 12,
  marginTop: 16,
  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
};

const tabCardStyle: React.CSSProperties = {
  padding: "12px 12px",
  borderRadius: 14,
  border: "1px solid #2a2a2a",
  textDecoration: "none",
  boxShadow: "0 10px 30px rgba(0,0,0,.25)",
};

const pillRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap",
};

const pill: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 999,
  border: "1px solid #2a2a2a",
  background: "#0f0f10",
  color: "#fff",
  fontSize: 13,
};

const codePill: React.CSSProperties = {
  padding: "2px 6px",
  borderRadius: 8,
  border: "1px solid #2a2a2a",
  background: "#0f0f10",
  color: "#fff",
};
