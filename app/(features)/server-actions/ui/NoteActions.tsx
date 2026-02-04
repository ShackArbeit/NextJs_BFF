'use client'

import { useTransition } from 'react'
import { deleteDemoNote, togglePin } from '../actions'

/**
 * 這個元件只負責兩個互動按鈕：置頂/刪除。
 * 把它獨立成小型 Client Component，可以避免整張 Note 卡片被 client 化。
 */
export default function NoteActions({ noteId }: { noteId: string }) {
  /**
   * useTransition 用來標記「非阻塞更新」：
   * - startTransition 內的更新可被 React 視為較低優先級。
   * - pending=true 時可 disable 按鈕，避免重複點擊。
   *
   * 在這裡，我們把 Server Action 呼叫包進 transition，
   * 讓 UI 不會因同步等待而卡住。
   */
  const [pending, startTransition] = useTransition()

  return (
    <div className="flex shrink-0 items-center gap-2">
      <button
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            await togglePin(noteId)
          })
        }
        className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10 disabled:opacity-50"
      >
        {pending ? '處理中...' : '切換 Pin'}
      </button>

      <button
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            await deleteDemoNote(noteId)
          })
        }
        className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10 disabled:opacity-50"
      >
        {pending ? '處理中...' : '刪除'}
      </button>
    </div>
  )
}
