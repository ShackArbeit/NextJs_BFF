export default function ArchitectureOverview() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-white">
          架構：Next.js 作為 BFF
        </h2>
        <p className="text-sm text-zinc-400 leading-relaxed">
          以 Next.js App Router 扮演 BFF（Backend for Frontend）：負責 UI
          渲染與編排，同時在後端層統一保護、聚合上游服務。
        </p>
      </header>

      <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-sm font-semibold text-white">系統總覽</h3>
          <span className="text-xs text-zinc-400">
            Next.js（BFF）+ DAL + DTO + 外部 API（JSONPlaceholder）
          </span>
        </div>

        <pre className="mt-4 overflow-auto rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-xs text-zinc-200 leading-relaxed">
{`+---------------------------+
| Client UI                 |
+---------------------------+

+---------------------------+
| Next.js App Router (BFF)  |
| - Server Components (RSC) |
| - Client Components       |
| - Server Actions          |
| - Route Handlers (API)    |
+---------------------------+

+---------------------------+
| DAL (Fetcher)             |
| - Centralize API calls    |
| - Cache & errors          |
+---------------------------+

+---------------------------+
| DTO                       |
| - Shape data for UI       |
| - Isolate external schema |
+---------------------------+

+---------------------------+
| JSONPlaceholder (API)     |
+---------------------------+`}
        </pre>
        {/* <p className="mt-3 text-xs text-zinc-500">
          從輕量的中介層與資料閘道開始；先把資料契約控好，框架優勢才有發揮空間。
        </p> */}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card
          title="1) Next.js 作為 BFF"
          badge="角色定位"
          items={[
            "用 App Router 來編排 UI、聚合資料。",
            "Server Actions 與 Route Handlers 是主要 BFF 端點。",
            "外部 API（如 JSONPlaceholder）被 BFF 隔離在後端。",
          ]}
        />

        <Card
          title="2) DAL + DTO 串在中間"
          badge="資料流向"
          items={[
            "UI 不直接呼叫外部 API，全都經過 DAL。",
            "DAL 管理快取、重試、錯誤與安全 header。",
            "DTO 決定哪些欄位能出站、UI 最終看到的形狀。",
          ]}
        />

        <Card
          title="3) 精簡的中介層設計"
          badge="設計指引"
          items={[
            "Middleware 處理認證、語系等橫切關注。",
            "業務邏輯集中在 Actions / DAL，不散在 UI。",
            "保持組件純粹，與外部 schema 解耦以利測試。",
          ]}
        />
      </section>

      {/* <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h3 className="text-sm font-semibold text-white">重點摘要</h3>

        <ul className="mt-4 space-y-2 text-sm text-zinc-300">
          <li className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-200" />
            <span>
              把 Next.js 視為{" "}
              <span className="text-white font-medium">BFF 邊界</span>：前端體驗在前，整合邏輯在後。
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-200" />
            <span>
              資料先經過 <span className="text-white font-medium">DAL</span>{" "}
              再由 <span className="text-white font-medium">DTO</span> 定型後才給 UI。
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-200" />
            <span>
              依需求再加 Middleware；保持{" "}
              <span className="text-white font-medium">UI 與資料層乾淨</span>{" "}
              方便測試與迭代。
            </span>
          </li>
        </ul>
      </section> */}
    </div>
  );
}

function Card({
  title,
  badge,
  items,
}: {
  title: string;
  badge: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-base font-semibold text-white">{title}</h4>
        <span className="shrink-0 rounded-md border border-zinc-700 bg-zinc-950 px-2 py-1 text-[11px] text-zinc-300">
          {badge}
        </span>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-zinc-300">
        {items.map((text) => (
          <li key={text} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-zinc-300">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
