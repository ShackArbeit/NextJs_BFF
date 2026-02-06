'use client'

import { useTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateCart } from './actions'

export default function CartClient() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [msg, setMsg] = useState<string>('')

  return (
    <div style={{ display: 'grid', gap: 10, color: '#fff' }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {[101, 102, 103].map((id) => (
          <button
            key={id}
            disabled={pending}
            onClick={() =>
              startTransition(async () => {
                setMsg('Updating cart...')
                const res = await updateCart(id)
                setMsg(`Updated itemId=${res.updatedItemId}, at=${res.at} (refreshing UI...)`)
                // Refresh server components to show updated generatedAt.
                router.refresh()
              })
            }
            style={{
              padding: '10px 12px',
              borderRadius: 10,
              border: '1px solid #444',
              background: pending ? '#111' : '#171717',
              color: '#fff',
              cursor: pending ? 'not-allowed' : 'pointer',
            }}
          >
            {pending ? 'Updating...' : `Update item ${id}`}
          </button>
        ))}
      </div>

      <div style={{ fontSize: 12, opacity: 0.85 }}>
        {msg || '點 Update 會觸發 Server Action（updateCart）與 router.refresh()，更新 generatedAt'}
      </div>
    </div>
  )
}
