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
          if (!res.ok) throw new Error('Fetch 失敗')
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
    return (
      <div className="p-6 border-2 border-amber-900/50 rounded-xl bg-amber-900/10">
        <p className="text-3xl text-amber-400 font-extrabold animate-bounce">
          ⚡ 正在 Client 端進行水合 (Hydration)...
        </p>
      </div>
    )
  }
  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <p className="animate-pulse text-2xl font-bold text-amber-200">
          🔍 水合完成！正在瀏覽器中發起請求... (2s 延遲)
        </p>
        <div className="h-8 w-full bg-amber-900/20 rounded-lg animate-pulse"></div>
      </div>
    )
  }
  if (error) {
    return <p className="text-3xl text-red-500 font-black p-6">❌ 錯誤: {error}</p>
  }

  return (
    <div className="space-y-6 p-6">
      <h2 className="mb-4 text-3xl font-extrabold text-amber-100 tracking-tight">
        在 Client 端 (useEffect) 獲取資料
      </h2>

      <p className="text-xl text-amber-200 leading-relaxed">
        這是典型的 CSR 模式：資料獲取 **「僅」** 在水合完成且執行 useEffect 之後才開始。
      </p>

      <div className="rounded-xl bg-amber-500/10 p-5 border border-amber-500/20">
        <p className="text-2xl font-bold text-amber-50 leading-snug">
          {data?.title}
        </p>
      </div>

      <div className="inline-block px-4 py-2 rounded-lg bg-amber-900/40 border border-amber-700/50">
        <p className="text-base text-amber-300 font-mono">
          瀏覽器端獲取數據時間窗: {startedAt} - {finishedAt}
        </p>
      </div>

      <div className="mt-8 space-y-3 text-xl text-amber-200 font-medium">
        <p className="flex items-center">
          <span className="mr-2 text-amber-400">✔</span> 使用 'use client' 指令
        </p>
        <p className="flex items-center">
          <span className="mr-2 text-amber-400">✔</span> 常見於 useEffect / SWR / React Query 模式
        </p>
        <p className="flex items-center">
          <span className="mr-2 text-amber-400">✔</span> Loading 與 Error 狀態完全由瀏覽器端控制
        </p>
      </div>
    </div>
  )
}