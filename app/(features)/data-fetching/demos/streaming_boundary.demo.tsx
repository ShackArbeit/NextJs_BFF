import { Suspense } from 'react'

async function SlowContent() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return <p className="text-sky-100">慢的內容完成，現在才串流進來。</p>
}

export default function StreamingBoundaryDemo() {
  return (
    <div className="space-y-3">
      <h2 className="mb-2 text-lg font-semibold text-sky-100">
        Streaming & Suspense Boundary
      </h2>

      <p className="text-sky-200">快速內容先 render，慢內容稍後補上。</p>

      <Suspense fallback={<p className="text-sky-300">慢內容載入中...</p>}>
        <SlowContent />
      </Suspense>

      <p className="mt-2 text-sm text-sky-200">
        ✔ 分段傳送 UI，減少等待感
        <br />
        ✔ HTML Streaming 提升體感效能
        <br />
        ✔ Suspense fallback 控制每段 loading
      </p>
    </div>
  )
}
