import { Suspense } from 'react'
import ClientPost from './use_client_post'

const postPromise = fetch(
  'https://jsonplaceholder.typicode.com/posts/3'
).then((res) => res.json())

export default function FetchWithUseDemo() {
  return (
    <div className="space-y-3">
      <h2 className="mb-2 text-lg font-semibold text-lime-100">
        Server Promise + use() + Suspense
      </h2>

      <Suspense fallback={<p className="text-lime-300">Loading via Suspense...</p>}>
        <ClientPost promise={postPromise} />
      </Suspense>

      <p className="mt-2 text-sm text-lime-200">
        ✔ Server 先建立 Promise，不先 await
        <br />
        ✔ Promise 傳給 Client
        <br />
        ✔ Client 透過 use() 讀取結果
        <br />
        ✔ Suspense 顯示 loading
      </p>
    </div>
  )
}
