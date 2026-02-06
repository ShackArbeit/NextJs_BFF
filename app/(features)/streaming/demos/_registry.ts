import type { DemoItem, DemoKey, DemoMeta } from './types'

import AutoPrerenderDemo from './auto-prerender/Demo.server'
import SuspenseStreamDemo from './suspense-stream/Demo.server'
import UseCacheDemo from './use-cache/Demo.server'
import RuntimeCookiesDemo from './runtime-cookies/Demo.server'
import TagsRevalidateDemo from './tags-revalidate/Demo.server'

const DEMO_ITEMS: DemoItem[] = [
  {
    key: 'auto-prerender',
    title: 'Auto Prerender（自動預渲染）',
    description: '只做純計算與檔案讀取（無 request runtime data），build time 產生 Static Shell。',
    Component: AutoPrerenderDemo,
  },
  {
    key: 'suspense-stream',
    title: 'Suspense Streaming（串流 + fallback）',
    description: 'request time 取得資料 + fallback，先顯示 Static Shell 再串流內容。',
    Component: SuspenseStreamDemo,
  },
  {
    key: 'use-cache',
    title: 'use cache + cacheLife（快取）',
    description: '示範 use cache 與 cacheLife，資料會被快取並顯示生成時間。',
    Component: UseCacheDemo,
  },
  {
    key: 'runtime-cookies',
    title: 'Runtime Data（cookies）',
    description: 'cookies() 是 runtime data，只能在 request 時取得，需配合 Suspense。',
    Component: RuntimeCookiesDemo,
  },
  {
    key: 'tags-revalidate',
    title: 'cacheTag + revalidateTag（更新快取）',
    description: '透過 mutation 讓 cache tag 失效並重新取得資料。',
    Component: TagsRevalidateDemo,
  },
]

export const DEMOS_META: DemoMeta[] = DEMO_ITEMS.map(({ Component, ...meta }) => meta)

export const DEMO_COMPONENTS: Record<DemoKey, DemoItem['Component']> = DEMO_ITEMS.reduce(
  (acc, item) => {
    acc[item.key] = item.Component
    return acc
  },
  {} as Record<DemoKey, DemoItem['Component']>
)

export const DEFAULT_TAB: DemoKey = 'use-cache'

export function getDemoMeta(tab?: string) {
  const key = (tab || DEFAULT_TAB) as DemoKey
  const found = DEMOS_META.find((d) => d.key === key)
  return found ?? DEMOS_META.find((d) => d.key === DEFAULT_TAB)!
}

export function getDemoComponent(key: DemoKey) {
  return DEMO_COMPONENTS[key]
}
