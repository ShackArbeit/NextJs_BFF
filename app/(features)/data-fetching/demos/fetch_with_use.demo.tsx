import { Suspense } from 'react'
import ClientPost from './use_client_post'

const postPromise = new Promise(async (resolve) => {
  await new Promise((res) => setTimeout(res, 3000))
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/3', {
    cache: 'no-store' 
  })
  const data = await res.json()
  resolve({ ...data, fetchedAt: new Date().toLocaleTimeString() })
})

export default function FetchWithUseDemo() {
  return (
    <div className="space-y-6 p-4">
      <h2 className="mb-4 text-3xl font-extrabold text-lime-100 tracking-tight">
        Server Promise + use() + Suspense
      </h2>

      <Suspense 
        fallback={
          <div className="space-y-4 p-6 border-2 border-dashed border-lime-700/50 rounded-xl">
            <p className="animate-pulse text-2xl font-bold text-lime-300">
              ⏳ 正在透過 Suspense 等待資料解鎖... (3s)
            </p>
            <div className="h-8 w-64 animate-pulse rounded bg-lime-900/40"></div>
          </div>
        }
      >
        <ClientPost promise={postPromise as Promise<any>} />
      </Suspense>

      <div className="mt-8 space-y-3 text-xl leading-relaxed text-lime-200 font-medium">
        <p className="flex items-center">
          <span className="mr-2 text-lime-400">✔</span>
          Server 先建立 Promise，不使用 await 阻塞渲染
        </p>
        <p className="flex items-center">
          <span className="mr-2 text-lime-400">✔</span>
          將 Pending 中的 Promise 直接傳給 Client 端
        </p>
        <p className="flex items-center">
          <span className="mr-2 text-lime-400">✔</span>
          Client 端透過 use() Hook 讀取異步結果
        </p>
        <p className="flex items-center">
          <span className="mr-2 text-lime-400">✔</span>
          由 Suspense 統一管理並顯示 Loading 狀態
        </p>
      </div>
    </div>
  )
}