import { Suspense } from 'react'
import StreamingShell from './_ui/StreamingShell.client'
import { DEMOS_META, getDemoComponent, getDemoMeta } from './demos/_registry'

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const fallbackKey = DEMOS_META[0]?.key ?? ''

  return (
    <Suspense fallback={<StreamingShell demos={DEMOS_META} activeKey={fallbackKey} />}>
      <PageContent searchParams={searchParams} />
    </Suspense>
  )
}

async function PageContent({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const sp = await searchParams
  const demo = getDemoMeta(sp.tab)
  const DemoComponent = getDemoComponent(demo.key)

  return (
    <StreamingShell demos={DEMOS_META} activeKey={demo.key}>
      <DemoComponent tab={demo.key} />
    </StreamingShell>
  )
}
