export const runtime = "nodejs";
import BoardForm from "../_component/BoardForm.client";
import BoardList from "../_component/BoardList.server";
import BoardShell from "../_component/BoardShell";
import { createCityPost, listCityPosts } from "../action";

export default async function ActionInServerComponent() {
  const posts = await listCityPosts(30);

  return (
    <BoardShell
      title="Server Component 直掛 Server Action"
      description="最基本的 server action 使用法：在 Server Component 中載入 server action，表單由 client 元件接手處理。送出後 revalidatePath 直接刷新資料。"
      badge="城市留言板 · form action"
      accent="emerald"
    >
      <BoardForm
        action={createCityPost}
        formKey="city"
        mode="action-state"
        submitLabel="分享城市"
        pendingLabel="送出中..."
        placeholders={{
          username: "旅人",
          answer: "京都 / 台北 / 紐約",
          reason: "因為氛圍剛剛好",
        }}
        helperText="Server Component + useActionState：最貼近官方文件的寫法。"
        accent="emerald"
      />

      <BoardList
        board="city"
        posts={posts}
        emptyHint="還沒有人分享喜歡的城市，來當第一個吧！"
        accent="emerald"
      />
    </BoardShell>
  );
}
