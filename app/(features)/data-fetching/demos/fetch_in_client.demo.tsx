'use client'

import { useEffect, useState } from 'react'

export default function FetchInClientDemo() {
  const [data, setData] = useState<any>(null)
  const [hydrated, setHydrated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [startedAt, setStartedAt] = useState<string>('')
  const [finishedAt, setFinishedAt] = useState<string>('')

  useEffect(() => {
    setHydrated(true)
    setStartedAt(new Date().toLocaleTimeString())
    const timer = setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/posts/2')
        .then((res) => {
          if (!res.ok) throw new Error('Fetch failed')
          return res.json()
        })
        .then((json) => {
          setData(json)
          setFinishedAt(new Date().toLocaleTimeString())
          setLoading(false)
        })
        .catch((err) => {
          setError(err.message)
          setLoading(false)
        })
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!hydrated) {
    return <p className="text-xl text-amber-300 font-medium">正在 Client 端進行水合...</p>
  }
  if (loading) {
    return <p className="animate-pulse text-xl text-amber-200 font-medium">正在瀏覽器中載入...</p>
  }
  if (error) {
    return <p className="text-xl text-red-400 font-bold">錯誤: {error}</p>
  }

  return (
    <div className="space-y-4">
      <h2 className="mb-2 text-2xl font-bold text-amber-100"> 
      </h2>

      <p className="text-base text-amber-200 leading-relaxed"> 
        資料獲取僅在水合（Hydration）完成且執行 useEffect 之後才開始
      </p>

      <p className="text-xl font-semibold text-amber-50"> 
        {data.title}
      </p>

      <p className="text-sm text-amber-300"> 
        瀏覽器端獲取數據的時間窗: {startedAt} - {finishedAt}
      </p>

      <p className="mt-4 text-base leading-relaxed text-amber-200"> 
        ✔ 使用 'use client'
        <br />
        ✔ useEffect / SWR / React Query
        <br />
        ✔ loading / error state 在 client
      </p>
    </div>
  )
}