'use client'

import { use } from 'react'

export default function ClientPost({
  promise,
}: {
  promise: Promise<any>
}) {
  const post = use(promise)
  return <p className="text-lg font-semibold text-lime-50">{post.title}</p>
}
