'use client'

import { useActionState } from 'react'
import { createDemoComment, type ActionResult } from '../actions'

/**
 * useActionState 需要初始 state，型別必須和 action 回傳值一致。
 */
const initialState: ActionResult = { ok: true }

/**
 * CreateCommentForm 是 Client Component，因為它需要：
 * - 接收使用者輸入
 * - 觸發表單提交
 * - 顯示提交後 state（成功/失敗/欄位錯誤）
 */
export default function CreateCommentForm({ noteId }: { noteId: string }) {
  /**
   * useActionState 核心概念（重要）：
   * 1) 你提供一個 Server Action + initialState。
   * 2) React 回傳 [state, formAction]。
   * 3) 把 formAction 丟給 <form action={...}>，提交時就會呼叫 Server Action。
   * 4) Server Action 回傳值會成為新的 state，UI 立即可讀取。
   *
   * 背後原理（簡化）：
   * - 提交時並不是傳統自己寫 fetch；React/Next 會封裝 action 呼叫流程。
   * - 伺服器執行 action 後，把可序列化的結果回傳給 client。
   * - React 更新這個 hook 的 state，讓你像 useState 一樣讀到最新值。
   */
  const [state, action] = useActionState(createDemoComment, initialState)

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs font-medium text-white/80">新增留言（Client boundary）</div>

      <form action={action} className="mt-3 grid gap-2">
        {/* noteId 不讓使用者編輯，用 hidden 欄位帶回 server action */}
        <input type="hidden" name="noteId" value={noteId} />

        <div className="grid gap-2 md:grid-cols-3">
          <input
            name="author"
            className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-white/30"
            placeholder="作者（可留空）"
          />
          <input
            name="message"
            className="md:col-span-2 rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-white/30"
            placeholder="留言內容"
          />
        </div>

        {/* 欄位級錯誤：只示範 message，其他欄位可依需求補齊 */}
        {state.ok === false && state.fieldErrors?.message?.length ? (
          <p className="text-xs text-red-300">{state.fieldErrors.message[0]}</p>
        ) : null}

        {/* 全域訊息：失敗優先顯示紅色，成功則顯示綠色 */}
        {state.ok === false ? (
          <p className="text-xs text-red-300">{state.message}</p>
        ) : state.message ? (
          <p className="text-xs text-emerald-200">{state.message}</p>
        ) : null}

        <button className="inline-flex w-fit rounded-full bg-white px-3 py-2 text-xs font-semibold text-black hover:bg-white/90">
          新增 Comment
        </button>
      </form>
    </div>
  )
}
