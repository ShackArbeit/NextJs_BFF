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
    <div className="space-y-4"> {/* 稍微增加間距讓畫面不擁擠 */}
      <h2 className="mb-2 text-2xl font-bold text-cyan-100"> {/* 放大：lg -> 2xl */}
        在 Server Component 中 fetch 資料
      </h2>

      <p className="text-base text-cyan-200"> {/* 放大：sm -> base */}
         Server 在 Client 端進行『水合』（Hydration）之前就抓取數據
      </p>
      
      <p className="mb-2 text-xl font-semibold text-cyan-50"> {/* 放大：lg -> xl */}
        {post.title}
      </p>
      
      <p className="text-sm text-cyan-300"> {/* 放大：xs -> sm */}
        渲染視窗: {startedAt.toLocaleTimeString()} -{' '}
        {finishedAt.toLocaleTimeString()}
      </p>

      <p className="text-base leading-relaxed text-cyan-200"> {/* 放大：sm -> base */}
        ✔ 在 Server Component 中直接 fetch
        <br />
        ✔ 不需要 API Route
        <br />
        ✔ 不需要 useEffect
      </p>
    </div>
  )
}