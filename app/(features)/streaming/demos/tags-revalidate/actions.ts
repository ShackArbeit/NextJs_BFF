'use server'

import { cacheTag, updateTag, cacheLife } from 'next/cache'
import { sleep, nowLabel } from '../utils'

export async function getCart() {
  'use cache'
  cacheTag('cart')
  cacheLife('hours')

  await sleep(1500)

  const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
  const todos = await res.json()

  return {
    generatedAt: nowLabel(),
    items: todos.map((t: any) => ({
      id: t.id,
      title: t.title,
      qty: (t.id % 3) + 1,
    })),
  }
}

export async function updateCart(itemId: number) {
  'use server'

  await sleep(800)
  updateTag('cart')

  return { ok: true, updatedItemId: itemId, at: nowLabel() }
}
