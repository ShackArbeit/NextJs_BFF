import { prisma } from '@/src/lib/prisma'
import { DemoTab } from '../demo-tab'
import CreateNoteForm from '../ui/CreateNoteForm'
import CreateCommentForm from '../ui/CreateCommentForm'
import NoteActions from '../ui/NoteActions'

type NoteWithComments = Awaited<ReturnType<typeof prisma.demoNote.findMany>>[number]
type Comment = NoteWithComments['comments'][number]

/**
 * 這裡用 Prisma 查詢回傳型別「反推」單筆資料型別：
 * - Awaited<ReturnType<...>> 先取得 Promise resolve 後的陣列型別
 * - [number] 代表陣列中的單一元素型別
 * 優點是：當 select/include 結構改動時，型別會自動同步。
 */

/**
 * 這個 demo 用來說明：
 * Server Component 很適合「讀資料 + 組畫面」，
 * 但遇到互動（送表單、按鈕事件）就要切到 Client Component。
 */
export default async function CanNotDoDemo() {
  // 在 Server Component 直接讀 DB：不必 expose API route 給自己打。
  const notes = await prisma.demoNote.findMany({
    where: { tab: DemoTab.can_not_do },
    orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
    include: { comments: { orderBy: { createdAt: 'desc' } } },
  })

  return (
    <section className="mt-10 space-y-6">
      <header>
        <h2 className="text-2xl font-semibold text-white">What Server Components cannot do</h2>
        <p className="mt-2 max-w-2xl text-sm text-white/70">
          Server Component 無法直接處理瀏覽器事件（例如 onClick）或使用需要瀏覽器環境的 Hook。
          所以互動區塊必須切到 Client Component。
        </p>
      </header>

      {/* 這是一個 Client Component 邊界：負責「建立 Note」的互動邏輯 */}
      <CreateNoteForm tab={DemoTab.can_not_do} />

      {/* Notes 清單仍由 Server Component 渲染，維持資料讀取集中在伺服器端 */}
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

              {/* 另一個小型 Client boundary：只包住按鈕互動，不把整張卡片 client 化 */}
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

              {/* 留言表單也獨立成 Client boundary，邊界越小通常越好維護 */}
              <CreateCommentForm noteId={n.id} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
