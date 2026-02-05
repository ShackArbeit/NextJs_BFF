import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import FetchInServerDemo from './demos/fetch_in_server.demo'
import FetchInClientDemo from './demos/fetch_in_client.demo'
import FetchWithUseDemo from './demos/fetch_with_use.demo'
import FetchCacheDemo from './demos/fetch_cache.demo'
import StreamingBoundaryDemo from './demos/streaming_boundary.demo'
import CacheComponentConcept from './demos/what_is_cache_component'

const TABS = {
  'fetch-in-server': FetchInServerDemo,
  'fetch-in-client': FetchInClientDemo,
  'fetch-with-use': FetchWithUseDemo,
  'fetch-cache': FetchCacheDemo,
  'streaming': StreamingBoundaryDemo,
  'cache-component': CacheComponentConcept,
} as const

type TabKey = keyof typeof TABS

async function DataFetchingContent({
  searchParams,
}: {
  searchParams: Promise<{ tab?: TabKey }>
}) {
  const { tab } = await searchParams
  const activeTab = tab ?? 'fetch-in-server'
  const Demo = TABS[activeTab]

  if (!Demo) notFound()

  return (
    <>
      {/* Tabs */}
      <nav className="flex gap-3 flex-wrap">
        {Object.keys(TABS).map((key) => (
          <Link
            key={key}
            href={`/data-fetching?tab=${key}`}
            className={`px-3 py-1 rounded border transition ${
              activeTab === key
                ? 'bg-white text-black'
                : 'text-white hover:bg-neutral-800'
            }`}
          >
            {key}
          </Link>
        ))}
      </nav>

      {/* ✅ 關鍵：Suspense Boundary */}
      <section className="border rounded p-4">
        <Suspense fallback={<p>⏳ Loading demo...</p>}>
          <Demo />
        </Suspense>
      </section>
    </>
  )
}

export default function DataFetchingPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: TabKey }>
}) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Next.js Data Fetching（App Router）
      </h1>

      <Suspense fallback={<p>⏳ Loading page...</p>}>
        <DataFetchingContent searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
