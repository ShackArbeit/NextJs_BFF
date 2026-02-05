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
    }, 900)

    return () => clearTimeout(timer)
  }, [])

  if (!hydrated) {
    return <p className="text-amber-300">Hydrating client bundle...</p>
  }
  if (loading) {
    return <p className="animate-pulse text-amber-200">Loading in browser...</p>
  }
  if (error) return <p className="text-red-300">Error: {error}</p>

  return (
    <div className="space-y-3">
      <h2 className="mb-2 text-lg font-semibold text-amber-100">
        Fetch in Client Component
      </h2>

      <p className="text-sm text-amber-200">
        Fetch only starts after hydration + useEffect.
      </p>
      <p className="text-lg font-semibold text-amber-50">{data.title}</p>
      <p className="text-xs text-amber-300">
        Browser fetch window: {startedAt} - {finishedAt}
      </p>

      <p className="mt-2 text-sm text-amber-200">
        ✔ 使用 'use client'
        <br />
        ✔ useEffect / SWR / React Query
        <br />
        ✔ loading / error state 在 client
      </p>
    </div>
  )
}
