import BoardForm from "../_component/BoardForm.client";
import BoardList from "../_component/BoardList.server";
import BoardShell from "../_component/BoardShell";
import { createTeaCoffeePost, listTeaCoffeePosts } from "../action";

export default async function ClientActionStateWithTransition() {
  const posts = await listTeaCoffeePosts(30);

  return (
    <BoardShell
      title="useActionState + useTransition"
      description="先透過 useActionState 取得伺服器回應，再搭配 useTransition 把提交包進 transition，讓 UI 變化更平滑。"
      badge="奶茶或咖啡？"
      accent="emerald"
    >
      <BoardForm
        action={createTeaCoffeePost}
        formKey="teaCoffee"
        mode="action-state-with-transition"
        submitLabel="加入討論"
        pendingLabel="送出中..."
        placeholders={{
          username: "飲品控",
          answer: "珍奶",
          reason: "珍珠的嚼勁讓人放鬆",
        }}
        helperText="useActionState 追蹤結果，useTransition 控制 pending，雙管齊下讓體驗更滑順。"
        accent="emerald"
      />

      <BoardList
        board="teaCoffee"
        posts={posts}
        emptyHint="還沒有人表態奶茶或咖啡，快來投一票！"
        accent="emerald"
      />
    </BoardShell>
  );
}
