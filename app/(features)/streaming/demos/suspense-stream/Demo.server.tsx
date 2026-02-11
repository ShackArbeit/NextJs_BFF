import DemoHeader from '../../_ui/DemoHeader'
import { Suspense } from 'react'
import { sleep, nowLabel } from '../utils'

async function SlowTodos() {
  await sleep(3000)
  const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=8', {
    cache: 'no-store', 
  })
  const todos = await res.json()

  return (
    <div className="p-4 border border-zinc-700 rounded-xl bg-zinc-900/50 shadow-inner">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-zinc-800">
        <span className="text-zinc-400 text-sm italic font-mono">
          [動態] 內容解析於：<span className="text-orange-400 font-bold">{nowLabel()}</span>
        </span>
        <span className="text-[10px] bg-orange-500/20 text-orange-500 px-2 py-0.5 rounded uppercase tracking-wider font-bold">
          Streaming Done
        </span>
      </div>

      <ul className="list-disc list-inside space-y-2 ml-1">
        {todos.map((t: any) => (
          <li key={t.id} className="text-zinc-200 transition-all hover:text-white">
            <span className="font-medium opacity-90">{t.title}</span>{' '}
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${t.completed ? 'bg-green-900/30 text-green-400 border border-green-800/50' : 'bg-zinc-800 text-zinc-500'}`}>
              {t.completed ? '已完成' : '待處理'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default async function SuspenseStreamDemo() {
  const shellInitialTime = nowLabel();

  return (
    <div className="text-white space-y-6">
      <div className="relative">
        <DemoHeader
          title="Suspense Streaming（串流 + 備選 UI）"
          description="先渲染靜態外殼 (Static Shell)，再於請求時串流內容。"
          concepts={['Suspense', '備選 UI (Fallback)', '請求時串流']}
          observe={[
            `靜態外殼時間：${shellInitialTime} (立即出現)`,
            '切換分頁時會先看到「正在串流」的提示',
            '大約 3 秒後內容才會替換出現 (時間戳記會更新)',
            "此範例強制使用 cache: 'no-store'",
          ]}
        />
        <div className="absolute top-0 right-0 bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-md shadow-lg translate-y-[-10px]">
          <p className="text-[10px] text-zinc-500 uppercase font-bold">頁面初始化時間</p>
          <p className="text-sm font-mono text-blue-400">{shellInitialTime}</p>
        </div>
      </div>

      <section className="space-y-3">
        <div className="flex items-center gap-2 text-zinc-400 text-sm">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>串流區域</span>
        </div>

        <Suspense 
          fallback={
            <div className="p-10 border border-zinc-800 border-dashed rounded-xl flex flex-col items-center justify-center bg-zinc-900/20">
              <div className="flex gap-1 mb-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" />
              </div>
              <p className="text-zinc-500 animate-pulse text-sm">
                正在從伺服器串流數據... (等待 3 秒)
              </p>
            </div>
          }
        >
          <SlowTodos />
        </Suspense>
      </section>

      <div className="mt-4 p-3 bg-blue-900/10 border border-blue-900/30 rounded-lg">
        <p className="text-xs text-blue-400 leading-relaxed">
          💡 <strong>原理觀察：</strong> 頁面右上角的藍色時間戳記是與 HTML 一起立即到達瀏覽器的；
          而下方組件內的橘色時間戳記則是在伺服器執行完 <code>sleep(3000)</code> 後才傳送到瀏覽器的。
        </p>
      </div>
    </div>
  )
}