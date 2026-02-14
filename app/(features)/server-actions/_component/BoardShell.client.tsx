"use client";

import type { ReactNode } from "react";

type Accent = "emerald" | "sky" | "amber" | "violet";

const accentStyles: Record<Accent, string> = {
  emerald:
    "from-emerald-500/15 to-emerald-900/20 border-emerald-500/30 shadow-emerald-500/20",
  sky: "from-sky-500/15 to-sky-900/20 border-sky-500/30 shadow-sky-500/20",
  amber: "from-amber-500/15 to-amber-900/20 border-amber-500/30 shadow-amber-500/20",
  violet:
    "from-violet-500/15 to-violet-900/20 border-violet-500/30 shadow-violet-500/20",
};

type BoardShellProps = {
  title: string;
  description?: string;
  badge?: string;
  accent?: Accent;
  children: ReactNode;
};

export default function BoardShellClient({
  title,
  description,
  badge,
  accent = "emerald",
  children,
}: BoardShellProps) {
  return (
    <section
      className={`mb-12 rounded-2xl border bg-gradient-to-br p-6 shadow-lg ring-1 ring-white/5 ${accentStyles[accent]}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Server Actions</p>
          <h2 className="mt-1 text-xl font-semibold text-white">{title}</h2>
          {description ? (
            <p className="mt-1 max-w-3xl text-sm text-zinc-300">{description}</p>
          ) : null}
        </div>
        {badge ? (
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white shadow-sm">
            {badge}
          </span>
        ) : null}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
        {children}
      </div>
    </section>
  );
}
