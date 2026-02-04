import Link from 'next/link'
import CanNotDoDemo from './demos/can_not_do.demo'
import RscBoundaryDemo from './demos/rsc_boundary.demo'
import { DemoTab, parseDemoTab } from './demo-tab'

/**
 * App Router 的 page component 會收到 searchParams。
 * 在較新型別定義中，這裡常被表達成 Promise 形式，故先 await。
 */
type Props = {
  searchParams: Promise<{ tab?: string }>
}

/**
 * 入口卡片元件（純展示）
 * 這裡使用 <Link> 而不是按鈕 + router.push，是因為：
 * - Link 有預設預載與語意優勢。
 * - URL 會直接成為狀態來源（可分享、可回上一頁、可重整保留狀態）。
 */
function EntryCard({
  href,
  title,
  description,
}: {
  href: string
  title: string
  description: string
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-medium text-white">{title}</div>
          <div className="mt-1 text-xs text-white/60">{description}</div>
        </div>
        <span className="text-white/60 transition group-hover:text-white">→</span>
      </div>
    </Link>
  )
}

/**
 * 這個 page 是 Server Component（沒有 'use client'）：
 * - 預設在伺服器端執行，適合做資料讀取與決策。
 * - 只有互動區塊（例如 form/button）才下放到 Client Component。
 */
export default async function Page({ searchParams }: Props) {
  const sp = await searchParams

  // 把 URL query 轉成受控型別，避免任意字串進入流程。
  const tab = parseDemoTab(sp.tab)

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* 沒有 tab 時先顯示入口清單 */}
      {!tab && (
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8">
          <h1 className="text-3xl font-semibold text-white">Server Actions Demo Modules</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/70">
            這裡示範如何用 URL searchParams 切換不同 demo，
            並保持「資料取得在 Server Component、互動放在 Client Component」的邊界設計。
          </p>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <EntryCard
              href="/server-actions?tab=can_not_do"
              title="What Server Components cannot do"
              description="useState / useEffect / browser APIs / event handlers"
            />
            <EntryCard
              href="/server-actions?tab=rsc_boundary"
              title="RSC Boundary (Server default, Client when needed)"
              description="只在必要互動區塊加上 use client"
            />
          </div>
        </div>
      )}

      {/* 根據 tab 渲染對應模組 */}
      {tab === DemoTab.can_not_do && <CanNotDoDemo />}
      {tab === DemoTab.rsc_boundary && <RscBoundaryDemo />}
    </div>
  )
}
