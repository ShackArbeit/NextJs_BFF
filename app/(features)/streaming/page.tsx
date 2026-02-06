import { Suspense } from 'react'
import StreamingShell from './_ui/StreamingShell.client'
import { DEMOS, getDemo } from './demos/_registry'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const sp = await searchParams
  const demo = getDemo(sp.tab)

  return (
    <StreamingShell demos={DEMOS} activeKey={demo.key}>
      {/* 這層 Suspense 是「保險」：讓你 demo 內部也能自由再切更細的 Suspense */}
      <Suspense fallback={<p>Loading demo shell...</p>}>
        <demo.Component tab={demo.key} />
      </Suspense>
    </StreamingShell>
  )
}
