import { Suspense } from 'react'
async function SlowContent() {
  await new Promise((resolve) => setTimeout(resolve, 4000))
  return (
    <div className="p-4 bg-sky-500/20 border border-sky-400/30 rounded-lg">
      <p className="text-2xl font-bold text-sky-100">
        ✅ 慢速內容已完成，現在才串流進入瀏覽器！
      </p>
    </div>
  )
}
export default function StreamingBoundaryDemo() {
  return (
    <div className="space-y-6 p-4">
      <h2 className="mb-4 text-3xl font-extrabold text-sky-100 tracking-tight">
        串流與懸停邊界 (Streaming & Suspense Boundary)
      </h2>
      <p className="text-2xl text-sky-200 leading-relaxed font-medium">
        🚀 快速的內容會優先渲染，慢速內容則在後台處理並稍後補上。
      </p>
      <Suspense 
        fallback={
          <div className="p-6 border-2 border-dashed border-sky-700/50 rounded-xl">
            <p className="animate-pulse text-2xl font-bold text-sky-400">
              ⌛ 慢速內容正在生成中... (4秒延遲)
            </p>
          </div>
        }
      >
        <SlowContent />
      </Suspense>

      <div className="mt-8 space-y-3 text-xl leading-relaxed text-sky-200 font-medium">
        <p className="flex items-center">
          <span className="mr-2 text-sky-400">✔</span>
          分段傳送 UI，徹底打破「整頁載入」的漫長等待感
        </p>
        <p className="flex items-center">
          <span className="mr-2 text-sky-400">✔</span>
          利用 HTML Streaming 技術，在資料還沒抓完前就先顯示框架
        </p>
        <p className="flex items-center">
          <span className="mr-2 text-sky-400">✔</span>
          透過 Suspense Fallback 精確控制每一塊區域的載入狀態
        </p>
      </div>

      <div className="mt-4 inline-block px-4 py-2 rounded-full bg-sky-900/40 border border-sky-700/50">
        <p className="text-base text-sky-300 italic">
          💡 提示：你會看到標題先出現，而下方的區塊在 4 秒後才自動跳出來。
        </p>
      </div>
    </div>
  )
}