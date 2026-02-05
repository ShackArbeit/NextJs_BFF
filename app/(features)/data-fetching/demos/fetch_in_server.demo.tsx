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
    <div className="space-y-3">
      <h2 className="mb-2 text-lg font-semibold text-cyan-100">
        Fetch in Server Component
      </h2>

      <p className="text-sm text-cyan-200">
        Server starts fetching before client hydration.
      </p>
      <p className="mb-2 text-lg font-semibold text-cyan-50">{post.title}</p>
      <p className="text-xs text-cyan-300">
        Render window: {startedAt.toLocaleTimeString()} -{' '}
        {finishedAt.toLocaleTimeString()}
      </p>

      <p className="text-sm text-cyan-200">
        ✔ 在 Server Component 中直接 fetch
        <br />
        ✔ 不需要 API Route
        <br />
        ✔ 不需要 useEffect
      </p>
    </div>
  )
}
