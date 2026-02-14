export const runtime = "nodejs";

import ClientMarryAgeBoard from "../_component/ClientMarryAgeBoard";
import { createMarryAgePost, listMarryAgePosts } from "../action";

export default async function ActionInClientComponent() {
  const posts = await listMarryAgePosts(30);

  return (
    <ClientMarryAgeBoard
      action={createMarryAgePost}
      posts={posts}
    />
  );
}
