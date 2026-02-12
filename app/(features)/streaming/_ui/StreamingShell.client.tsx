'use client'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { DemoMeta } from '../demos/types'
export default function StreamingShell({
  demos,
  activeKey,
  children,
}: {
  demos: DemoMeta[]
  activeKey: string
  children?: React.ReactNode
}) {
  const [note, setNote] = useState('這是 client state，切換 tab 不會消失')
  const [showTips, setShowTips] = useState(true)
  const items = useMemo(() => demos, [demos])
  return (
    <div className="grid grid-cols-[320px_1fr] gap-4 text-white">
      <aside className="rounded-xl border border-neutral-800 p-4">
        <h2 className="mt-0 text-xl font-bold">Streaming / Cache Demos</h2>
        <div className="mb-3">
          <label className="block text-xs opacity-80">Client state note</label>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-lg border border-neutral-700 bg-neutral-900 p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <div className="mt-2 text-xs opacity-80">
            可以觀察切換 tab 後，client state 仍保留
          </div>
        </div>
        <button
          onClick={() => setShowTips((v) => !v)}
          className="w-full rounded-lg border border-neutral-700 bg-neutral-900 p-2.5 text-white transition-colors hover:bg-neutral-800 active:scale-[0.98]"
        >
          Toggle tips (client state)
        </button>
        {showTips && (
          <div className="mt-2.5 text-xs leading-relaxed opacity-85">
            Key Point
            <br />
            1) 先點 use-cache 觀察 cached 的時間
            <br />
            2) 切換到其他 tab 再回來，時間是否維持
            <br />
            3) Suspense demo 會先顯示 fallback
          </div>
        )}

        <hr className="my-4 border-neutral-800" />
        <nav className="grid gap-2">
          {items.map((d) => (
            <Link
              key={d.key}
              href={`/streaming?tab=${d.key}`}
              className={`rounded-lg border p-2.5 no-underline transition-colors ${
                d.key === activeKey
                  ? 'border-neutral-600 bg-neutral-800'
                  : 'border-neutral-800 bg-neutral-950 hover:bg-neutral-900'
              }`}
            >
              <div className="font-bold">{d.title}</div>
              <div className="text-xs opacity-75">{d.description}</div>
            </Link>
          ))}
        </nav>
      </aside>
      <main className="rounded-xl border border-neutral-800 p-4">
        {children}
      </main>
    </div>
  )
}