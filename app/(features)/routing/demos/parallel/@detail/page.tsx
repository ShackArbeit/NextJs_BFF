import DetailCard from "./DetailCard.client";
type Post = { id: number; title: string; body: string };
export default async function DetailSlot({
  searchParams,
}: {
  searchParams: Promise<{ postId?: string }>;
}) {
  const { postId } = await searchParams;
  const id = Number(postId ?? 1);

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const post = (await res.json()) as Post;
  return (
    <div>
      <div className="font-black mb-[10px] text-white">
          @detail (文章 #{id})
      </div>
      <DetailCard title={post.title} body={post.body} />
      
    </div>
  );
}
