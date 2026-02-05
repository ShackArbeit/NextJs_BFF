import { prisma } from '@/src/lib/prisma'
import type { Prisma } from '@prisma/client'
import { DemoTab } from '../demo-tab'
import CreateNoteForm from '../ui/CreateNoteForm'
import CreateCommentForm from '../ui/CreateCommentForm'
import NoteActions from '../ui/NoteActions'

type NoteWithComments = Prisma.DemoNoteGetPayload<{
  include: { comments: true }
}>
type Comment = NoteWithComments['comments'][number]


/**
 * 這個 demo 強調「RSC 預設、Client 按需」的邊界設計：
 * - 大部分畫面用 Server Component（讀資料、輸出 HTML）
 * - 只有互動區塊切成 Client Component
 * 這樣通常可以拿到更好的首屏效能與更小的客戶端 JS 體積。
 */
export default async function RscBoundaryDemo() {
  const notes = await prisma.demoNote.findMany({
    where: { tab: DemoTab.rsc_boundary },
    orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
    include: { comments: { orderBy: { createdAt: 'desc' } } },
  })

  return (
    <section className="mt-10 space-y-6">
      <header>
        <h2 className="text-2xl font-semibold text-white">RSC Boundary (Server default)</h2>
        <p className="mt-2 max-w-2xl text-sm text-white/70">
          請把「需要事件與狀態」的區塊最小化並下放到 Client Component，
          其餘區塊維持 Server Component，這就是 App Router 常見的邊界策略。
        </p>
      </header>

      {/* 互動表單：Client Component */}
      <CreateNoteForm tab={DemoTab.rsc_boundary} />

      {/* 資料清單：Server Component */}
      <div className="grid gap-4">
        {notes.map((n: NoteWithComments) => (
          <div
            key={n.id}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-white">
                  {n.isPinned && '📌 '} {n.title}
                </h3>
                <p className="mt-2 text-sm text-white/70">{n.content}</p>
              </div>

              {/* 僅按鈕群為 client，縮小 hydration 範圍 */}
              <NoteActions noteId={n.id} />
            </div>

            <div className="mt-6 space-y-3 border-t border-white/10 pt-4">
              {n.comments.map((c: Comment) => (
                <div
                  key={c.id}
                  className="rounded-2xl border border-white/10 bg-black/20 p-3"
                >
                  <div className="text-xs text-white/60">
                    {c.author} · {new Date(c.createdAt).toLocaleString('zh-TW')}
                  </div>
                  <div className="mt-1 text-sm text-white/70">{c.message}</div>
                </div>
              ))}

              <CreateCommentForm noteId={n.id} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
