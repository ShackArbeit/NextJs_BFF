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
};

export default function ClientMarryAgeBoard({ posts, action }: ClientMarryAgeBoardProps) {
  const router = useRouter();
  const [isRefreshing, startTransition] = useTransition();

  const handleSuccess = () => {
    startTransition(() => router.refresh());
  };

  return (
    <BoardShell
      title="Client Component calls Server Action"
      description="Server action is passed as a prop; form uses useActionState and startTransition to show pending UI while the action runs."
      badge="useTransition + useActionState"
      accent="amber"
    >
      <BoardForm
        action={action}
        formKey="marryAge"
        mode="action-state-with-transition"
        submitLabel="Send plan"
        pendingLabel="Sending..."
        placeholders={{
          username: "Alex",
          answer: "30",
          reason: "Build a stable career before starting a family.",
        }}
        helperText="Client component uses useActionState for validation/messages and startTransition for smooth pending UI."
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
        />
      </div>
    </BoardShell>
  );
}
