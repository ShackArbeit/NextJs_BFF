export default function CacheComponentConcept() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-rose-100">
        Cache Components 是什麼？
      </h2>

      <div className="rounded border border-rose-400/40 bg-rose-950/30 p-4">
        <h3 className="mb-2 font-medium text-rose-100">1) 不再是 route-based</h3>
        <p className="text-sm text-rose-200">
          Static / Dynamic 不必綁在整條 route，可以在 component 層級決定行為。
        </p>
      </div>

      <div className="rounded border border-rose-400/40 bg-rose-950/30 p-4">
        <h3 className="mb-2 font-medium text-rose-100">2) Cache 行為下放到元件</h3>
        <p className="text-sm text-rose-200">
          同一頁可以同時存在可快取與不可快取內容，資料策略更細緻。
        </p>
      </div>

      <div className="rounded border border-rose-400/40 bg-rose-950/30 p-4">
        <h3 className="mb-2 font-medium text-rose-100">3) 搭配 cache()</h3>
        <p className="text-sm text-rose-200">
          可把昂貴查詢包成可重用結果，避免重複資料請求。
        </p>
      </div>

      <div className="rounded border border-rose-400/40 bg-rose-950/30 p-4">
        <h3 className="mb-2 font-medium text-rose-100">4) 搭配 Suspense</h3>
        <p className="text-sm text-rose-200">
          讓慢元件獨立 loading，快內容先回應，維持頁面可用性。
        </p>
      </div>

      <div className="rounded border border-rose-300/50 bg-rose-900/40 p-4">
        <h3 className="mb-2 font-medium text-rose-50">結論</h3>
        <p className="text-sm text-rose-100">
          Cache Components 讓你把「是否快取、何時渲染」精準放在元件層級，而不是整頁一起綁死。
        </p>
      </div>
    </div>
  )
}
