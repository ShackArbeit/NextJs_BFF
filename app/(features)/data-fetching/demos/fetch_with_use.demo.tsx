import { Suspense } from 'react'
import ClientPost from './use_client_post'

const postPromise = new Promise(async (resolve) => {
  await new Promise((res) => setTimeout(res, 3000))
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/3',{
     cache: 'no-store'
  })
  const data = await res.json()
  resolve({ ...data, fetchedAt: new Date().toLocaleTimeString() })
})

export default function FetchWithUseDemo() {
  return (
    <div className="space-y-4">
      <h2 className="mb-2 text-2xl font-bold text-lime-100">
        Server Promise + use() + Suspense
      </h2>

      <Suspense 
        fallback={
          <div className="space-y-2">
            <p className="animate-pulse text-xl font-medium text-lime-300">
              ⏳ 正在透過 Suspense 等待資料解鎖... (3s)
            </p>
            <div className="h-6 w-48 animate-pulse rounded bg-lime-900/30"></div>
          </div>
        }
      >
        <ClientPost promise={postPromise as Promise<any>} />
      </Suspense>

      <div className="mt-4 text-base leading-relaxed text-lime-200">
        <p>✔ Server 先建立 Promise，不先 await</p>
        <p>✔ Promise 傳給 Client</p>
        <p>✔ Client 透過 use() 讀取結果</p>
        <p>✔ Suspense 負責處理載入狀態</p>
      </div>
    </div>
  )
}