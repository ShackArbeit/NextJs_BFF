'use client'

import { useTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateCart } from './actions'

export default function CartClient() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [msg, setMsg] = useState<string>('')

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {[101, 102, 103].map((id) => (
          <button
            key={id}
            disabled={pending}
            onClick={() =>
              startTransition(async () => {
                setMsg('Updating cart...')
                const res = await updateCart(id)
                setMsg(`✅ updatedItemId=${res.updatedItemId}, at=${res.at} (refreshing UI...)`)
                // 讓 server component 重新抓資料（generatedAt 會更新）
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
        {msg || '點按鈕 → Server Action → updateTag(cart) → router.refresh() 立刻看到新 generatedAt'}
      </div>
    </div>
  )
}
