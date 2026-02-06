import DetailCard from './DetailCard.client'

type Post = { id: number; title: string; body: string }

export default async function DetailSlot({
  searchParams,
}: {
  searchParams: Promise<{ postId?: string }>
}) {
  const { postId } = await searchParams
  const id = Number(postId ?? 1)

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  const post = (await res.json()) as Post

  return (
    <div>
      <div style={{ fontWeight: 900, marginBottom: 10, color: 'white' }}>
        @detail (Post #{id})
      </div>
      <DetailCard title={post.title} body={post.body} />

      <div style={{ marginTop: 12, opacity: 0.7, fontSize: 12, color: 'white' }}>
        點擊卡片可放大，再點一次回到原尺寸。
      </div>
    </div>
  )
}
