"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const tabs = [
  { key: "parallel", label: "Parallel Routing" },
  { key: "intercepting", label: "Intercepting Routing" },
  { key: "iter", label: "Parallel Plus Intercepting" },
] as const;

export default function DemoTabs() {
  const sp = useSearchParams();
  const active = sp.get("tab") ?? "parallel";

  return (
    <div className="flex flex-wrap gap-[10px]">
      {tabs.map((t) => {
        const isActive = active === t.key;
        return (
          <Link
            key={t.key}
            href={`/routing?tab=${t.key}`}
            className={[
              "no-underline text-white",
              "px-[12px] py-[10px]",
              "rounded-full",
              "border border-white/15",
              "font-bold",
              "transition-all duration-200",
              isActive
                ? "bg-white/10 opacity-100"
                : "bg-white/5 opacity-80 hover:opacity-100 hover:bg-white/10",
            ].join(" ")}
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}
