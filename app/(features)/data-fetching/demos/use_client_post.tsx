"use client"

import { use } from "react"

interface Post {
  title: string
  fetchedAt: string
}

export default function ClientPost({
  promise,
}: {
  promise: Promise<Post>
}) {
  const post = use(promise)
 
  return (
    <div className="py-2 space-y-2">
      <p className="text-xl font-semibold text-lime-50 tracking-wide">
        {post.title}
      </p>
   
    </div>
  )
}
