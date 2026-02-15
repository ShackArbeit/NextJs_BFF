export const runtime = "nodejs";

import ClientMarryAgeBoard from "../_component/ClientMarryAgeBoard";
import { createMarryAgePost, listMarryAgePosts, softDeletePost } from "../action";

export default async function ActionInClientComponent() {
  const posts = await listMarryAgePosts(30);

  async function deleteMarryAgePost(id: string) {
    "use server";
    await softDeletePost("marryAge", id);
  }

  return (
    <ClientMarryAgeBoard
      action={createMarryAgePost}
      posts={posts}
      onDelete={deleteMarryAgePost}
    />
  );
}
