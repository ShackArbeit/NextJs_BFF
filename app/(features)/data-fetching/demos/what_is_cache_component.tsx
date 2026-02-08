export default function CacheComponentConcept() {
  return (
    <div className="space-y-8 p-4"> 
      <h2 className="text-4xl font-extrabold text-rose-100 tracking-tight border-b-4 border-rose-500/50 pb-2">
        Cache Components 是什麼？
      </h2>

      <div className="grid gap-6">
        <div className="rounded-xl border-2 border-rose-400/40 bg-rose-950/40 p-6 shadow-lg">
          <h3 className="mb-3 text-2xl font-bold text-rose-100 flex items-center">
            <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-sm">1</span>
            不再是 Route-based (路由限制)
          </h3>
          <p className="text-xl text-rose-200 leading-relaxed">
            靜態（Static）與動態（Dynamic）不再需要綁定整條路由。你可以在 **元件層級** 獨立決定渲染行為。
          </p>
        </div>

        <div className="rounded-xl border-2 border-rose-400/40 bg-rose-950/40 p-6 shadow-lg">
          <h3 className="mb-3 text-2xl font-bold text-rose-100 flex items-center">
            <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-sm">2</span>
            快取行為下放到元件
          </h3>
          <p className="text-xl text-rose-200 leading-relaxed">
            同一頁面可以並存「可快取」與「不可快取」內容。這讓你的資料更新策略變得極度細緻與彈性。
          </p>
        </div>

        <div className="rounded-xl border-2 border-rose-400/40 bg-rose-950/40 p-6 shadow-lg">
          <h3 className="mb-3 text-2xl font-bold text-rose-100 flex items-center">
            <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-sm">3</span>
            搭配 cache() 函數
          </h3>
          <p className="text-xl text-rose-200 leading-relaxed">
            能將昂貴的資料庫查詢封裝成可重用的結果。即使在多個組件中呼叫，也只會觸發一次真實請求。
          </p>
        </div>

        <div className="rounded-xl border-2 border-rose-400/40 bg-rose-950/40 p-6 shadow-lg">
          <h3 className="mb-3 text-2xl font-bold text-rose-100 flex items-center">
            <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-sm">4</span>
            完美搭配 Suspense
          </h3>
          <p className="text-xl text-rose-200 leading-relaxed">
            讓慢速元件擁有獨立的 Loading 狀態。優先回應快速內容，大幅提升使用者的體感效能。
          </p>
        </div>
      </div>

      <div className="rounded-2xl border-2 border-rose-300/60 bg-rose-900/50 p-8 mt-10 shadow-2xl">
        <h3 className="mb-4 text-3xl font-black text-rose-50 tracking-wide">
          💡 核心結論
        </h3>
        <p className="text-2xl text-rose-100 leading-relaxed font-medium">
          Cache Components 賦予你「精準打擊」的能力。你可以決定 **哪一個元件** 該快取、**哪一個元件** 該即時，而不是被迫讓整頁一起變慢或變快。
        </p>
      </div>
    </div>
  )
}