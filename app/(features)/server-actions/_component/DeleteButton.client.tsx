"use client";

import { useState, useTransition } from "react";

type DeleteButtonProps = {
  action: () => Promise<any>;
  label?: string;
};

export default function DeleteButton({ action, label = "刪除" }: DeleteButtonProps) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        const ok = window.confirm("確定要刪除這則留言嗎？");
        if (!ok) return;
        startTransition(async () => {
          try {
            await action();
          } catch (err: any) {
            setError(err?.message ?? "刪除失敗");
          }
        });
      }}
    >
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-200 shadow-sm transition hover:bg-rose-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 disabled:opacity-60"
      >
        {pending ? "刪除中..." : label}
      </button>
      {error ? <p className="mt-1 text-[11px] text-rose-200">{error}</p> : null}
    </form>
  );
}
