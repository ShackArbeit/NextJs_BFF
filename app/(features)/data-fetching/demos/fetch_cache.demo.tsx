import { cache } from 'react'

// cache() 函數允許在單次渲染請求中去重複（Deduplication）
const getPost = cache(async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/4', {
    cache: 'force-cache',
  })
  return res.json()
})

export default async function FetchCacheDemo() {
  const post = await getPost()

  return (
    <div className="space-y-6 p-4"> 
      <h2 className="mb-4 text-3xl font-extrabold text-fuchsia-100 tracking-tight">
        擷取快取與去重複功能 (Fetch Cache & Deduplication)
      </h2>

      <div className="rounded-xl bg-fuchsia-500/10 p-4 border border-fuchsia-500/20">
        <p className="text-2xl font-bold text-fuchsia-50 leading-snug">
          {post.title}
        </p>
      </div>

      <div className="mt-6 space-y-3 text-xl leading-relaxed text-fuchsia-200">
        <p className="flex items-start">
          <span className="mr-2 text-fuchsia-400">✔</span>
          使用 cache(async fn) 實現單次請求內的記憶化
        </p>
        <p className="flex items-start">
          <span className="mr-2 text-fuchsia-400">✔</span>
          在同一個 Request 中共用結果，避免重複調用 API
        </p>
        <p className="flex items-start">
          <span className="mr-2 text-fuchsia-400">✔</span>
          搭配 force-cache 設定可強化快取的命中率
        </p>
      </div>

      <div className="mt-4 inline-block px-4 py-2 rounded-full bg-fuchsia-900/40 border border-fuchsia-700/50">
        <p className="text-base text-fuchsia-300 italic font-medium">
          💡 數據狀態：已在伺服器端完成記憶化處理
        </p>
      </div>
    </div>
  )
}