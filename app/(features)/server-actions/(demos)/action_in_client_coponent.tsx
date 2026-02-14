import BoardForm from "../_component/BoardForm.client";
import BoardList from "../_component/BoardList.server";
import BoardShell from "../_component/BoardShell";
import { createMarryAgePost, listMarryAgePosts } from "../action";

export default async function ActionInClientComponent() {
  const posts = await listMarryAgePosts(30);

  return (
    <BoardShell
      title="Client Component 呼叫 Server Action"
      description="把 server action 當作 props 傳進 client component，利用 useActionState 直接在瀏覽器顯示 pending / success / error。"
      badge="要幾歲結婚？"
      accent="amber"
    >
      <BoardForm
        action={createMarryAgePost}
        formKey="marryAge"
        mode="action-state"
        submitLabel="送出想法"
        pendingLabel="送出中..."
        placeholders={{
          username: "Alex",
          answer: "30 歲",
          reason: "覺得打好基礎後再成家",
        }}
        helperText="Client Component 內仍可安全呼叫 server action，Next.js 會自動建立互動管道。"
        accent="amber"
      />

      <BoardList
        board="marryAge"
        posts={posts}
        emptyHint="還沒有人分享理想的結婚年紀！"
        accent="amber"
      />
    </BoardShell>
  );
}
