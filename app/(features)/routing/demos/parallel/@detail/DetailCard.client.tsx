'use client'

import { useState } from 'react'

export default function DetailCard({
  title,
  body,
}: {
  title: string
  body: string
}) {
  const [zoomed, setZoomed] = useState(false)

  return (
    <div
      onClick={() => setZoomed((v) => !v)}
      style={{
        transform: zoomed ? 'scale(1.04)' : 'scale(1)',
        transition: 'transform 160ms ease',
        transformOrigin: 'top left',
        cursor: 'pointer',
        padding: 12,
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'rgba(0,0,0,0.18)',
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 900, color: 'white' }}>{title}</div>
      <div style={{ marginTop: 10, opacity: 0.85, lineHeight: 1.7, color: 'white' }}>{body}</div>
    </div>
  )
}
