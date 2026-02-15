"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import type { ActionState, PostDTO } from "../action";
import BoardForm from "./BoardForm.client";
import BoardList from "./BoardList.client";
import BoardShell from "./BoardShell.client";

type ClientMarryAgeBoardProps = {
  posts: PostDTO[];
  action: (
    prevState: ActionState | undefined,
    formData: FormData
  ) => Promise<ActionState<PostDTO>>;
  onDelete: (id: string) => Promise<any>;
};

export default function ClientMarryAgeBoard({ posts, action, onDelete }: ClientMarryAgeBoardProps) {
  const router = useRouter();
  const [isRefreshing, startTransition] = useTransition();

  const handleSuccess = () => {
    startTransition(() => router.refresh());
  };

  const handleDelete = async (id: string) => {
    await onDelete(id);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <BoardShell
      title="Client Component calls Server Action"
      description="Server Action 以Prop 形式傳遞，表單搭配 useActionState 與 startTransition 讓 Action 成功後顯示 Pending（同步）等 UI"
      badge="useTransition + useActionState"
      accent="amber"
    >
      <BoardForm
        action={action}
        formKey="marryAge"
        mode="action-state-with-transition"
        submitLabel="提交留言"
        pendingLabel="提交中..."
        placeholders={{
          username: "Alex",
          answer: "30",
          reason: "Build a stable career before starting a family.",
        }}
        helperText="請說明你認為想結婚的年齡與原因"
        accent="amber"
        onSuccess={handleSuccess}
      />

      <div className="space-y-2">
        {isRefreshing ? (
          <p className="text-sm text-amber-100/80">Refreshing responses...</p>
        ) : null}
        <BoardList
          board="marryAge"
          posts={posts}
          emptyHint="No one shared their plan yet. Be the first!"
          accent="amber"
          onDelete={handleDelete}
        />
      </div>
    </BoardShell>
  );
}
