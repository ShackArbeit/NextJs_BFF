import Link from 'next/link'
import { prisma } from '@/src/lib/prisma'
import { DemoTab } from '@prisma/client'
import CreateNoteForm from './ui/CreateNoteForm'
import CreateCommentForm from './ui/CreateCommentForm'
import NoteActions from './ui/NoteActions'
import { parseDemoTab } from './actions'

export const dynamic = 'force-dynamic' // demo 專案：避免 cache 造成面試展示困惑

type Props = {
  searchParams: Promise<{ tab?: string }>
}

function Pill({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-3 py-1 text-xs',
        active
          ? 'bg-white/15 text-white ring-1 ring-white/20'
          : 'bg-white/5 text-white/70 ring-1 ring-white/10',
      ].join(' ')}
    >
      {children}
    </span>
  )
}

export default async function Page({ searchParams }: Props) {
  const sp = await searchParams
  const tab = await parseDemoTab(sp.tab) // 嚴格 tab 值（只接受 enum）
  const hasTab = tab !== null

  const notes = hasTab
    ? await prisma.demoNote.findMany({
        where: { tab },
        orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
        include: { comments: { orderBy: { createdAt: 'desc' } } },
      })
    : []

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Hero / Entry */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.10),transparent_40%)]" />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2">
            <Pill active={true}>Server Actions</Pill>
            <Pill active={false}>RSC Boundary</Pill>
            <Pill active={false}>URL State: searchParams</Pill>
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white">
            Server Actions Demo Showcase
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
            這頁預設是 <span className="text-white">Server Component</span>。
            你會先看到兩個選項，使用者點擊後透過{' '}
            <span className="text-white">?tab=...</span> 切換內容並在 server 端渲染資料。
            只有表單/按鈕互動區域會切成 Client Component（刻意展示 RSC boundary）。
          </p>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <Link
              href="/server-actions?tab=can_not_do"
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-white">
                    What Server Components cannot do
                  </div>
                  <div className="mt-1 text-xs text-white/60">
                    useState/useEffect、browser APIs、event handlers
                  </div>
                </div>
                <span className="text-white/60 transition group-hover:text-white">→</span>
              </div>
            </Link>

            <Link
              href="/server-actions?tab=rsc_boundary"
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-white">
                    RSC boundary: Server default, Client only when needed
                  </div>
                  <div className="mt-1 text-xs text-white/60">
                    避免整站 use client 退化成 SPA
                  </div>
                </div>
                <span className="text-white/60 transition group-hover:text-white">→</span>
              </div>
            </Link>
          </div>

          {!hasTab && (
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 text-xs text-white/70">
              尚未選擇 tab。請點上方任一選項進入 demo。
            </div>
          )}
        </div>
      </div>

      {/* Tab content */}
      {hasTab && (
        <div className="mt-10 grid gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Pill active={tab === DemoTab.can_not_do}>tab: can_not_do</Pill>
              <Pill active={tab === DemoTab.rsc_boundary}>tab: rsc_boundary</Pill>
            </div>

            <Link
              href="/server-actions"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 hover:bg-white/10"
            >
              ← 回入口
            </Link>
          </div>

          {/* Client boundary: create note */}
          <CreateNoteForm tab={tab} />

          {/* Server render list */}
          <div className="grid gap-4">
            {notes.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
                這個 tab 目前沒有資料。你可以用上方表單新增一筆 Note。
              </div>
            ) : (
              notes.map((n) => (
                <div
                  key={n.id}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        {n.isPinned && (
                          <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] text-white">
                            📌 pinned
                          </span>
                        )}
                        <h3 className="text-base font-semibold text-white">{n.title}</h3>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-white/70">{n.content}</p>

                      <p className="mt-3 text-xs text-white/45">
                        {new Date(n.createdAt).toLocaleString('zh-TW')}
                      </p>
                    </div>

                    {/* Client boundary: small actions */}
                    <NoteActions noteId={n.id} />
                  </div>

                  {/* Comments */}
                  <div className="mt-6 border-t border-white/10 pt-5">
                    <div className="text-xs font-medium text-white/80">
                      Comments ({n.comments.length})
                    </div>

                    <div className="mt-3 grid gap-3">
                      {n.comments.map((c) => (
                        <div
                          key={c.id}
                          className="rounded-2xl border border-white/10 bg-black/20 p-4"
                        >
                          <div className="text-xs text-white/80">
                            <span className="text-white">{c.author}</span>
                            <span className="text-white/40"> · </span>
                            <span className="text-white/40">
                              {new Date(c.createdAt).toLocaleString('zh-TW')}
                            </span>
                          </div>
                          <div className="mt-2 text-sm text-white/70">{c.message}</div>
                        </div>
                      ))}
                    </div>

                    {/* Client boundary: create comment */}
                    <div className="mt-4">
                      <CreateCommentForm noteId={n.id} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
