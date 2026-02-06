import { cache } from 'react'

const getPost = cache(async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/4', {
    cache: 'force-cache',
  })
  return res.json()
})

export default async function FetchCacheDemo() {
  const post = await getPost()

  return (
    <div className="space-y-4"> 
      <h2 className="mb-2 text-2xl font-bold text-fuchsia-100">
        擷取快取與去重複功能 (Fetch Cache & Deduplication)
      </h2>

      <p className="text-xl font-semibold text-fuchsia-50">
        {post.title}
      </p>

      <div className="mt-4 text-base leading-relaxed text-fuchsia-200">
        <p className="flex items-center">
          ✔ 使用 cache(async fn) 實現單次請求內的記憶化
        </p>
        <p className="flex items-center">
          ✔ 在同一個 Request 中共用結果，避免重複調用 API
        </p>
        <p className="flex items-center">
          ✔ 搭配 force-cache 設定可強化快取的命中率
        </p>
      </div>

      {/* 底部提示區塊 */}
      <div className="mt-2 inline-block px-3 py-1 rounded bg-fuchsia-900/30 border border-fuchsia-700/50">
        <p className="text-sm text-fuchsia-300 italic">
          數據狀態：已在伺服器端完成記憶化處理
        </p>
      </div>
    </div>
  )
}