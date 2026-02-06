"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const tabs = [
  { key: "parallel", label: "Parallel Routes" },
  { key: "intercepting", label: "Intercepting Routes" },
  { key: "iter", label: "Intercepting + Parallel" },
] as const;

export default function DemoTabs() {
  const sp = useSearchParams();
  const active = sp.get("tab") ?? "parallel";

  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      {tabs.map((t) => {
        const isActive = active === t.key;
        return (
          <Link
            key={t.key}
            href={`/routing?tab=${t.key}`}
            style={{
              textDecoration: "none",
              color: "white",
              padding: "10px 12px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.14)",
              background: isActive ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.04)",
              fontWeight: 700,
              opacity: isActive ? 1 : 0.8,
            }}
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}
