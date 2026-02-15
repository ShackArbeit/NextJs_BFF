"use client";

import type { FormEvent } from "react";
import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import type { ActionState, PostDTO } from "../action";

type FieldKey = "username" | "answer" | "reason";
type FormMode = "action-state" | "transition" | "action-state-with-transition";
type Accent = "emerald" | "sky" | "amber" | "violet";

type BoardFormProps = {
  action: (
    prevState: ActionState | undefined,
    formData: FormData
  ) => Promise<ActionState<PostDTO>>;
  formKey?: string;
  title?: string;
  helperText?: string;
  placeholders?: Partial<Record<FieldKey, string>>;
  submitLabel?: string;
  pendingLabel?: string;
  accent?: Accent;
  defaultState?: ActionState | undefined;
  mode?: FormMode;
  onSuccess?: (res: ActionState<PostDTO>) => void;
};

const accentMap: Record<Accent, string> = {
  emerald:
    "bg-emerald-500 text-emerald-950 hover:bg-emerald-400 focus-visible:ring-emerald-300",
  sky: "bg-sky-500 text-sky-950 hover:bg-sky-400 focus-visible:ring-sky-300",
  amber: "bg-amber-400 text-amber-950 hover:bg-amber-300 focus-visible:ring-amber-200",
  violet:
    "bg-violet-500 text-violet-950 hover:bg-violet-400 focus-visible:ring-violet-300",
};

const inputBase =
  "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 shadow-inner focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20";

export default function BoardForm({
  action,
  title,
  helperText,
  placeholders,
  submitLabel = "提交",
  pendingLabel = "提交中...",
  accent = "emerald",
  defaultState,
  mode = "action-state",
  formKey,
  onSuccess,
}: BoardFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticState, setOptimisticState] = useState<ActionState | undefined>(defaultState);
  const [visibleState, setVisibleState] = useState<ActionState | undefined>(defaultState);
  const [isTransitionPending, startTransition] = useTransition();

  const [state, formAction, isActionPending] = useActionState(
    async (prevState: ActionState | undefined, formData: FormData) => {
      const res = await action(prevState, formData);
      if (res.ok) {
        formRef.current?.reset();
        onSuccess?.(res);
      }
      return res;
    },
    defaultState ?? { ok: false, message: "" }
  );

  const currentState = mode === "transition" ? optimisticState : state;
  const pending =
    mode === "action-state"
      ? isActionPending
      : mode === "action-state-with-transition"
        ? isActionPending || isTransitionPending
        : isTransitionPending;

  useEffect(() => {
    setVisibleState(currentState);
    if (currentState?.ok && currentState.message) {
      const timer = setTimeout(() => {
        setVisibleState((prev) => (prev === currentState ? undefined : prev));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentState]);

  const actionStateSubmit = formAction;
  const transitionSubmit = (formData: FormData) => {
    startTransition(() => {
      action(undefined, formData).then((res) => {
        setOptimisticState(res);
        if (res.ok) {
          formRef.current?.reset();
          onSuccess?.(res);
        }
      });
    });
  };

  const actionStateWithTransitionSubmit = (formData: FormData) => {
    startTransition(() => {
      actionStateSubmit(formData);
    });
  };

  const handleSubmit =
    mode === "transition"
      ? (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          transitionSubmit(formData);
        }
      : mode === "action-state-with-transition"
        ? (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            actionStateWithTransitionSubmit(formData);
          }
        : undefined;

  const actionProp = mode === "action-state" ? actionStateSubmit : undefined;

  const renderError = (key: FieldKey) =>
    currentState?.errors?.[key] ? (
      <p className="mt-1 text-xs text-rose-300">{currentState.errors[key]}</p>
    ) : null;

  const statusTone =
    visibleState && visibleState.message
      ? visibleState.ok
        ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-100"
        : "border-rose-400/40 bg-rose-400/10 text-rose-100"
      : "";

  return (
    <div
      key={formKey}
      className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-inner shadow-black/30 backdrop-blur"
    >
      {title ? <h3 className="text-lg font-semibold text-white">{title}</h3> : null}
      {helperText ? <p className="mt-1 text-sm text-zinc-400">{helperText}</p> : null}

      <form
        ref={formRef}
        action={actionProp as any}
        onSubmit={handleSubmit}
        className="mt-4 space-y-4"
      >
        <div>
          <label className="text-sm text-zinc-300">你的稱呼</label>
          <input
            name="username"
            required
            placeholder={placeholders?.username ?? "e.g. Alex / Zoe"}
            className={inputBase}
            aria-invalid={Boolean(currentState?.errors?.username)}
          />
          {renderError("username")}
        </div>

        <div>
          <label className="text-sm text-zinc-300">你的回答</label>
          <input
            name="answer"
            required
            placeholder={placeholders?.answer ?? "簡短輸入你的回答"}
            className={inputBase}
            aria-invalid={Boolean(currentState?.errors?.answer)}
          />
          {renderError("answer")}
        </div>

        <div>
          <label className="text-sm text-zinc-300">原因</label>
          <textarea
            name="reason"
            required
            rows={3}
            placeholder={placeholders?.reason ?? "分享你的想法與理由"}
            className={`${inputBase} resize-none`}
            aria-invalid={Boolean(currentState?.errors?.reason)}
          />
          {renderError("reason")}
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            type="submit"
            disabled={pending}
            className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold shadow-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:opacity-60 disabled:shadow-none ${accentMap[accent]}`}
          >
            {pending ? pendingLabel : submitLabel}
          </button>
          <p className="text-xs text-zinc-500">
            {mode === "transition"
              ? "useTransition：使用 startTransition 提交"
              : mode === "action-state-with-transition"
                ? "useActionState + useTransition"
                : "useActionState：綁定 action"}
          </p>
        </div>
      </form>

      {visibleState?.message ? (
        <div className={`mt-4 rounded-lg border px-4 py-3 text-sm ${statusTone}`}>
          <p className="font-medium">
            {visibleState.ok ? "成功" : "失敗"} · {visibleState.message}
          </p>
        </div>
      ) : null}
    </div>
  );
}
