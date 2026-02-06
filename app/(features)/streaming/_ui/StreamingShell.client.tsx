'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { DemoItem } from '../demos/types'

export default function StreamingShell({
  demos,
  activeKey,
  children,
}: {
  demos: DemoItem[]
  activeKey: string
  children: React.ReactNode
}) {
  const [note, setNote] = useState('我是一段 client state（切 tab 不應該消失）')
  const [showTips, setShowTips] = useState(true)

  const items = useMemo(() => demos, [demos])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 16 }}>
      <aside style={{ border: '1px solid #333', borderRadius: 12, padding: 16 }}>
        <h2 style={{ marginTop: 0 }}>Streaming / Cache Demos</h2>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: 12, opacity: 0.8 }}>Client state note</label>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #444', background: '#111', color: '#fff' }}
          />
          <div style={{ marginTop: 8, fontSize: 12, opacity: 0.8 }}>
            ✅ 切換 tab 後，如果這段文字還在，就代表 client state 被保留
          </div>
        </div>

        <button
          onClick={() => setShowTips((v) => !v)}
          style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid #444', background: '#171717', color: '#fff', cursor: 'pointer' }}
        >
          Toggle tips (client state)
        </button>

        {showTips && (
          <div style={{ marginTop: 10, fontSize: 12, opacity: 0.85, lineHeight: 1.5 }}>
            🔎 觀察重點：<br />
            1) 第一次進 use-cache 是否很慢？<br />
            2) 再點回來是否變快？<br />
            3) Suspense demo 是否先出 fallback？<br />
          </div>
        )}

        <hr style={{ margin: '16px 0', borderColor: '#333' }} />

        <nav style={{ display: 'grid', gap: 8 }}>
          {items.map((d) => (
            <Link
              key={d.key}
              href={`/streaming?tab=${d.key}`}
              style={{
                padding: 10,
                borderRadius: 10,
                textDecoration: 'none',
                border: '1px solid #333',
                background: d.key === activeKey ? '#2a2a2a' : '#121212',
                color: '#fff',
              }}
            >
              <div style={{ fontWeight: 700 }}>{d.title}</div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>{d.description}</div>
            </Link>
          ))}
        </nav>
      </aside>

      <main style={{ border: '1px solid #333', borderRadius: 12, padding: 16 }}>
        {children}
      </main>
    </div>
  )
}
