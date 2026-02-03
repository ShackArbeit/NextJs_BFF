'use client'

import { useActionState } from 'react'
import { createDemoComment, type ActionResult } from '../actions'

const initialState: ActionResult = { ok: true }

export default function CreateCommentForm({ noteId }: { noteId: string }) {
  const [state, action] = useActionState(createDemoComment, initialState)

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs font-medium text-white/80">新增留言（Client boundary）</div>

      <form action={action} className="mt-3 grid gap-2">
        <input type="hidden" name="noteId" value={noteId} />

        <div className="grid gap-2 md:grid-cols-3">
          <input
            name="author"
            className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-white/30"
            placeholder="作者（可空）"
          />
          <input
            name="message"
            className="md:col-span-2 rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-white/30"
            placeholder="留言內容"
          />
        </div>

        {state.ok === false && state.fieldErrors?.message?.length ? (
          <p className="text-xs text-red-300">{state.fieldErrors.message[0]}</p>
        ) : null}

        {state.ok === false ? (
          <p className="text-xs text-red-300">{state.message}</p>
        ) : state.message ? (
          <p className="text-xs text-emerald-200">{state.message}</p>
        ) : null}

        <button className="inline-flex w-fit rounded-full bg-white px-3 py-2 text-xs font-semibold text-black hover:bg-white/90">
          💬 Comment
        </button>
      </form>
    </div>
  )
}
