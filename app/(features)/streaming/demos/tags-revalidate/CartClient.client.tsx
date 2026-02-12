'use client'

import { useTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateCart } from './actions'

export default function CartClient() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [msg, setMsg] = useState<string>('')
  const [activeId, setActiveId] = useState<number | null>(null)

  return (
    <div className="grid gap-[10px] text-white">
      <div className="flex flex-wrap gap-2">
        {[101, 102, 103].map((id) => {
          const isUpdating = pending && activeId === id
          
          return (
            <button
              key={id}
              disabled={pending} 
              onClick={() => {
                setActiveId(id) 
                startTransition(async () => {
                  setMsg('更新卡片內容...')
                  const res = await updateCart(id)
                  setMsg(`更新 項目 Id=${res.updatedItemId}, 於=${res.at} (重新渲染 UI...)`)
                  router.refresh()
                })
              }}
              className={`
                px-3 py-[10px] rounded-[10px] border transition-all duration-200 text-white
                ${isUpdating 
                  ? 'bg-blue-600 border-blue-400 animate-pulse' 
                  : pending
                    ? 'bg-[#111] border-[#333] opacity-50 cursor-not-allowed' 
                    : 'bg-[#171717] border-[#444] cursor-pointer hover:bg-[#222] hover:border-[#666] active:scale-95' 
                }
              `}
            >
              <span className="flex items-center gap-2">
                {isUpdating && (
                  <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {isUpdating ? 'Updating...' : `Update item ${id}`}
              </span>
            </button>
          )
        })}
      </div>
      <div className="text-[12px] opacity-85">
        {msg || '點 Update 會觸發 Server Action（updateCart）與 router.refresh()，更新 generatedAt'}
      </div>
    </div>
  )
}