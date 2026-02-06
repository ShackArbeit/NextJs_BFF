import type { DemoItem, DemoKey } from './types'

import AutoPrerenderDemo from './auto-prerender/Demo.server'
import SuspenseStreamDemo from './suspense-stream/Demo.server'
import UseCacheDemo from './use-cache/Demo.server'
import RuntimeCookiesDemo from './runtime-cookies/Demo.server'
import TagsRevalidateDemo from './tags-revalidate/Demo.server'

export const DEMOS: DemoItem[] = [
  {
    key: 'auto-prerender',
    title: 'Auto Prerender（純計算）',
    description: '只做純運算/同步工作，直接進 Static Shell',
    Component: AutoPrerenderDemo,
  },
  {
    key: 'suspense-stream',
    title: 'Suspense Streaming（延後到 request）',
    description: '故意做慢 API + fallback，展示「先出殼再串流」',
    Component: SuspenseStreamDemo,
  },
  {
    key: 'use-cache',
    title: 'use cache + cacheLife（快取有感）',
    description: '第一次慢，之後秒開；顯示 timestamp 觀察快取命中',
    Component: UseCacheDemo,
  },
  {
    key: 'runtime-cookies',
    title: 'Runtime Data（cookies）',
    description: '讀 cookies 必須 Suspense；展示 request context',
    Component: RuntimeCookiesDemo,
  },
  {
    key: 'tags-revalidate',
    title: 'cacheTag + revalidateTag（內容更新）',
    description: '模擬 mutation 後 invalidation（示範流程）',
    Component: TagsRevalidateDemo,
  },
]

export const DEFAULT_TAB: DemoKey = 'use-cache'

export function getDemo(tab?: string) {
  const key = (tab || DEFAULT_TAB) as DemoKey
  const found = DEMOS.find((d) => d.key === key)
  return found ?? DEMOS.find((d) => d.key === DEFAULT_TAB)!
}
