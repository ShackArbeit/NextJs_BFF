async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
export default async function FetchInServerDemo() {
  const startedAt = new Date()
  await sleep(900)
  
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    cache: 'no-store', 
  })
  const post = await res.json()
  const finishedAt = new Date()

  return (
    <div className="space-y-6 p-4">
      <h2 className="mb-4 text-3xl font-extrabold text-cyan-100 tracking-tight">
        在 Server Component 中獲取資料
      </h2>

      <p className="text-xl text-cyan-200 leading-relaxed">
        伺服器在客戶端進行 **「水合」（Hydration）** 之前就已經完成了數據抓取。
      </p>

      <div className="rounded-xl bg-cyan-500/10 p-5 border border-cyan-500/20">
        <p className="text-2xl font-bold text-cyan-50 leading-snug">
          {post.title}
        </p>
      </div>
      <div className="inline-block px-4 py-2 rounded-lg bg-cyan-900/40 border border-cyan-700/50">
        <p className="text-base text-cyan-300 font-mono">
          伺服器處理時間窗: {startedAt.toLocaleTimeString()} - {finishedAt.toLocaleTimeString()}
        </p>
      </div>
      <div className="mt-6 space-y-3 text-xl text-cyan-200 font-medium">
        <p className="flex items-center">
          <span className="mr-2 text-cyan-400">✔</span> 
          直接在伺服器端組件執行 fetch
        </p>
        <p className="flex items-center">
          <span className="mr-2 text-cyan-400">✔</span> 
          零客戶端 JavaScript 負擔 (Zero JS overhead)
        </p>
        <p className="flex items-center">
          <span className="mr-2 text-cyan-400">✔</span> 
          無需依賴 useEffect 或 useState
        </p>
      </div>
    </div>
  )
}