import BoardForm from "../_component/BoardForm.client";
import BoardList from "../_component/BoardList.server";
import BoardShell from "../_component/BoardShell";
import { createCityPost, listCityPosts } from "../action";

export default async function ActionInServerComponent() {
  const posts = await listCityPosts(30);

  return (
    <BoardShell
      title="Server Component + Server Action"
      description="Server Component 直接透過 form action 連結 Action。useActionState 則用來驅動 Pending 與錯誤提示的 UI，同時該 Action 會模擬延遲響應的效果。"
      badge="useActionState pending"
      accent="emerald"
    >
      <BoardForm
        action={createCityPost}
        formKey="city"
        mode="action-state"
        submitLabel="提交想法"
        pendingLabel="提交中..."
        placeholders={{
          username: "你的名字是!",
          answer: "東京 / 首爾 / 京都",
          reason: "都是不錯的亞洲旅遊城市",
        }}
        helperText="請輸入你最喜歡的城市以及為什麼吧!"
        accent="emerald"
      />

      <BoardList
        board="city"
        posts={posts}
        emptyHint="No one has shared a favorite city yet."
        accent="emerald"
      />
    </BoardShell>
  );
}
