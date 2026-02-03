'use client'

import { useTransition } from 'react'
import { deleteDemoNote, togglePin } from '../actions'

export default function NoteActions({ noteId }: { noteId: string }) {
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
        📌 Pin
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
        🗑️ Delete
      </button>
    </div>
  )
}
