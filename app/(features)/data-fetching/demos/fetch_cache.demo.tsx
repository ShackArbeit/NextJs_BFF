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
    <div className="space-y-3">
      <h2 className="mb-2 text-lg font-semibold text-fuchsia-100">
        Fetch Cache & Deduplication
      </h2>

      <p className="text-lg font-semibold text-fuchsia-50">{post.title}</p>

      <p className="mt-2 text-sm text-fuchsia-200">
        ✔ cache(async fn)
        <br />
        ✔ 同一 request 內可共用結果，避免重複打 API
        <br />
        ✔ 搭配 force-cache 可強化快取命中
      </p>
    </div>
  )
}
