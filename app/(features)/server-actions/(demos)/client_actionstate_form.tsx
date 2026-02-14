import BoardForm from "../_component/BoardForm.client";
import BoardList from "../_component/BoardList.server";
import BoardShell from "../_component/BoardShell";
import { createSeasonPost, listSeasonPosts } from "../action";

export default async function ClientActionStateForm() {
  const posts = await listSeasonPosts(30);

  return (
    <BoardShell
      title="useActionState：表單內建狀態"
      description="利用 useActionState 把 server action 的回應直接映射到 UI，欄位錯誤也能同步顯示。"
      badge="最愛的季節"
      accent="sky"
    >
      <BoardForm
        action={createSeasonPost}
        formKey="season"
        mode="action-state"
        submitLabel="分享季節"
        pendingLabel="送出中..."
        placeholders={{
          username: "Mia",
          answer: "秋天",
          reason: "因為氣溫剛好又有楓葉",
        }}
        helperText="重點：用 useActionState 取得伺服器回傳的 errors / message，立即呈現在畫面上。"
        accent="sky"
      />

      <BoardList
        board="season"
        posts={posts}
        emptyHint="還沒有人表態最愛的季節，快來留言！"
        accent="sky"
      />
    </BoardShell>
  );
}
