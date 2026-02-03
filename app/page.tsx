// app/page.tsx
export default function HomePage() {
  return (
    <section className="px-10 py-10">
      <div className="max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Next.js App Router Feature Showcase
        </h2>

        <p className="mt-4 text-zinc-400 leading-relaxed">
          本專案是針對現代{' '}
          <span className="text-zinc-200 font-medium">Next.js App Router</span>{' '}
          功能的實作演示，專為技術面試而設計。
        </p>

        {/* Highlight box */}
        <div className="mt-8 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
          <h3 className="text-lg font-semibold text-white">
            Architectural Positioning
          </h3>
          <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
            在此專案中，Next.js 被刻意定位為{' '}
            <span className="text-zinc-200 font-medium">
              BFF (Backend for Frontend)
            </span>
            。雖然 Next.js 同時支援 Node.js 與 Edge 運行環境，但在大型系統架構中，仍應依賴獨立的後端服務。
          </p>
        </div>

        {/* Feature list */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-zinc-800 bg-zinc-900 p-5 hover:border-zinc-600 transition-colors"
            >
              <h4 className="text-base font-semibold text-white">
                {feature.title}
              </h4>
              <p className="mt-2 text-sm text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const FEATURES = [
  {
    title: 'Server Actions',
    description: '比較表單動作（Form Actions）與傳統用戶端 fetch 的差異。',
  },
  {
    title: 'Data Fetching & Caching',
    description: '展示 fetch 快取、重新驗證（Revalidation）以及資料即時性機制。',
  },
  {
    title: 'Streaming & Suspense',
    description: '透過動態 HTML 串流（Streaming）呈現部分渲染效果。',
  },
  {
    title: 'React Server Components',
    description: '說明 RSC 邊界劃分以及渲染責任的分工。',
  },
  {
    title: 'Route Handlers',
    description: '在 App Router 中實作 REST 風格的 API 介面。',
  },
  {
    title: 'Advanced Routing',
    description: '包含巢狀佈局（Nested Layouts）、路由分組及多樣的路由模式。',
  },
]