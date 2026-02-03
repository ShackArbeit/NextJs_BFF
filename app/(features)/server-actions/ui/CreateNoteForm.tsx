'use client'

import { useActionState } from 'react'
import { DemoTab } from '@prisma/client'
import { createDemoNote, type ActionResult } from '../actions'

const initialState: ActionResult = { ok: true }

export default function CreateNoteForm({ tab }: { tab: DemoTab }) {
  const [state, action] = useActionState(createDemoNote, initialState)

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="text-sm font-semibold text-white">新增 Note（Client boundary）</div>
      <div className="mt-1 text-xs text-white/60">
        刻意只把表單做成 Client Component；列表與資料查詢保持 Server Component。
      </div>

      <form action={action} className="mt-5 grid gap-3">
        <input type="hidden" name="tab" value={tab} />

        <div className="grid gap-1">
          <label className="text-xs text-white/70">Title</label>
          <input
            name="title"
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-white/30"
            placeholder="例如：為什麼 Server Component 不能用 useEffect？"
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
            placeholder="用一句話講清楚重點，面試官最愛。"
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
          ➕ Create
        </button>
      </form>
    </div>
  )
}
