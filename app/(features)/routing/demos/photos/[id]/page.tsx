import Link from 'next/link'
import { Suspense } from 'react'

export default function PhotoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return (
    <Suspense fallback={<div style={{ color: 'white' }}>Loading photo...</div>}>
      <PhotoDetailContent params={params} />
    </Suspense>
  )
}

async function PhotoDetailContent({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div style={{ color: 'white' }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <Link
          href="/routing/demos/photos"
          style={{
            color: 'white',
            textDecoration: 'none',
            padding: '8px 10px',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.14)',
            background: 'rgba(255,255,255,0.06)',
          }}
        >
          Back
        </Link>
        <div style={{ fontSize: 20, fontWeight: 900 }}>Full Page Detail (#{id})</div>
      </div>

      <div
        style={{
          marginTop: 14,
          borderRadius: 18,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(255,255,255,0.04)',
        }}
      >
        <img
          src={`https://picsum.photos/id/${id}/1100/650`}
          alt={`picsum ${id}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      <div style={{ marginTop: 12, opacity: 0.8, lineHeight: 1.7 }}>
        這是 full page 的 detail，和 <code>/routing</code> 中的 modal 版本不同。
      </div>
    </div>
  )
}
