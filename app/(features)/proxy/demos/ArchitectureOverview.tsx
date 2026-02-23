export default function ArchitectureOverview() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-white">
          概覽：Next.js 作為 BFF
        </h2>
        <p className="text-sm text-zinc-400 leading-relaxed">
          使用 Next.js App Router 作為 BFF，負責 UI 渲染並位於外部 API 之前。BFF 可隔離結構（schema）變動，並加入快取、驗證與資料整理。
        </p>
      </header>

      <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-sm font-semibold text-white">系統示意</h3>
          <span className="text-xs text-zinc-400">
            Next.js (BFF) + DAL + DTO + 外部 API（JSONPlaceholder）
          </span>
        </div>

        <pre className="mt-4 overflow-auto rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-xs text-zinc-200 leading-relaxed">
{`+---------------------------+
| 用戶端 UI                 |
+---------------------------+

+---------------------------+
| Next.js App Router（BFF） |
| - Server Components（RSC）|
| - Client Components（用戶端元件） |
| - Server Actions（伺服器動作）    |
| - Route Handlers（API）   |
+---------------------------+

+---------------------------+
| DAL（Fetcher）            |
| - 集中 API 呼叫           |
| - 快取與錯誤處理          |
+---------------------------+

+---------------------------+
| DTO                       |
| - 轉換為 UI 需要的資料     |
| - 隔離外部 schema         |
+---------------------------+

+---------------------------+
| JSONPlaceholder（API）    |
+---------------------------+`}
        </pre>

      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card
          title="1) Next.js 作為 BFF"
          badge="角色"
          items={[
            "App Router 負責渲染 UI，BFF 保護用戶端不直接接觸外部 API。",
            "Server Actions 與 Route Handlers 是主要的 BFF 接點。",
            "外部 API（例如 JSONPlaceholder）都在 BFF 邊界之後。",
          ]}
        />

        <Card
          title="2) 中間層的 DAL + DTO"
          badge="資料流"
          items={[
            "UI 不直接呼叫外部 API，所有請求都經由 DAL。",
            "DAL 負責重試、錯誤、headers 與快取。",
            "DTO 決定輸出欄位；UI 使用穩定的 DTO 形狀。",
          ]}
        />

        <Card
          title="3) 簡化中間層"
          badge="設計"
          items={[
            "Middleware 可在進入 Actions / DAL 前加入驗證或追蹤。",
            "業務邏輯放在 Actions 或 DAL，而非 UI 元件。",
            "保持元件乾淨，在邊界測試外部 schema 變更。",
          ]}
        />
      </section>


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
