import BoardForm from "../_component/BoardForm.client";
import BoardList from "../_component/BoardList.server";
import BoardShell from "../_component/BoardShell";
import { createLanguagePost, listLanguagePosts } from "../action";

export default async function ClientTransitionButton() {
  const posts = await listLanguagePosts(30);

  return (
    <BoardShell
      title="useTransition：控制提交流程"
      description="改用 useTransition 包住 server action，手動控管 pending 狀態與提交節奏。適合需要更多 UI 回應的場景。"
      badge="想學的語言"
      accent="violet"
    >
      <BoardForm
        action={createLanguagePost}
        formKey="language"
        mode="transition"
        submitLabel="我要投稿"
        pendingLabel="送出中..."
        placeholders={{
          username: "語言咖",
          answer: "西班牙語",
          reason: "旅行時能更貼近當地文化",
        }}
        helperText="重點：以 useTransition 包住 action，在 client 端掌握 pending、可自由做 loading skeleton。"
        accent="violet"
      />

      <BoardList
        board="language"
        posts={posts}
        emptyHint="還沒有留言，分享你想學的語言！"
        accent="violet"
      />
    </BoardShell>
  );
}
