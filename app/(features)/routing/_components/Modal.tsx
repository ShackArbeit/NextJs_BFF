"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export default function Modal({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const router = useRouter();

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={() => router.back()}
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[min(920px,100%)] overflow-hidden rounded-2xl border border-white/10 bg-[#0f1219]/95 text-white shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3.5">
          <div className="font-bold">{title}</div>
          <button
            onClick={() => router.back()}
            className="cursor-pointer rounded-[10px] border border-white/15 bg-white/5 px-2.5 py-1.5 text-sm transition-colors hover:bg-white/10 active:scale-95"
          >
            關閉
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
