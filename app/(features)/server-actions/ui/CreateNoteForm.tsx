'use client'

import { useActionState } from 'react'
import type { DemoTab } from '../demo-tab'
import { createDemoNote, type ActionResult } from '../actions'

const initialState: ActionResult = { ok: true }

/**
 * 這是建立 Note 的表單（Client Component）。
 * 為何需要 client？
 * - 表單輸入本身是瀏覽器互動。
 * - 需要即時顯示 action 執行後回傳的 state。
 */
export default function CreateNoteForm({ tab }: { tab: DemoTab }) {
  /**
   * useActionState 與 useState 的差異：
   * - useState：你自己 setState，資料來源通常在 client。
   * - useActionState：state 由「Server Action 回傳值」驅動。
   *
   * 你可以把它想成「表單版本的 reducer + async server roundtrip」：
   * - 表單送出觸發 action
   * - action 在 server 完成驗證/寫 DB
   * - 回傳 ActionResult，前端自動拿到最新 state 並重渲染
   */
  const [state, action] = useActionState(createDemoNote, initialState)

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="text-sm font-semibold text-white">新增 Note（Client boundary）</div>
      <div className="mt-1 text-xs text-white/60">
        這個元件負責互動；資料寫入與驗證在 server action 中處理。
      </div>

      <form action={action} className="mt-5 grid gap-3">
        {/* tab 由父層決定，透過 hidden 欄位送到 server action */}
        <input type="hidden" name="tab" value={tab} />

        <div className="grid gap-1">
          <label className="text-xs text-white/70">Title</label>
          <input
            name="title"
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-white/30"
            placeholder="輸入標題（3~80 字）"
          />
          {state.ok === false && state.fieldErrors?.title?.length ? (
            <p className="text-xs text-red-300">{state.fieldErrors.title[0]}</p>
          ) : null}
        </div>

        <div className="grid gap-1">
          <label className="text-xs text-white/70">Content</label>
          <textarea
            name="content"
            rows={4}
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-white/30"
            placeholder="輸入內容（10~500 字）"
          />
          {state.ok === false && state.fieldErrors?.content?.length ? (
            <p className="text-xs text-red-300">{state.fieldErrors.content[0]}</p>
          ) : null}
        </div>

        {state.ok === false ? (
          <p className="text-xs text-red-300">{state.message}</p>
        ) : state.message ? (
          <p className="text-xs text-emerald-200">{state.message}</p>
        ) : null}

        <button className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-white/90">
          建立
        </button>
      </form>
    </div>
  )
}
