import type { ReactNode } from "react";
import Link from "next/link";

export default function DemoCard({
  title,
  desc,
  href,
  badge,
  children,
}: {
  title: string;
  desc: string;
  href: string;
  badge?: string;
  children?: ReactNode;
}) {
  return (
    <div
      style={{
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.04)",
        padding: 16,
      }}
    >
      <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
        <div style={{ fontSize: 18, fontWeight: 800 }}>{title}</div>
        {badge ? (
          <span
            style={{
              fontSize: 12,
              padding: "2px 8px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.06)",
              opacity: 0.9,
            }}
          >
            {badge}
          </span>
        ) : null}
      </div>

      <div style={{ marginTop: 8, opacity: 0.85, lineHeight: 1.6 }}>{desc}</div>

      <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link
          href={href}
          style={{
            display: "inline-block",
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.18)",
            background: "linear-gradient(135deg, rgba(99,102,241,0.35), rgba(236,72,153,0.25))",
            color: "white",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Open →
        </Link>
      </div>

      {children ? <div style={{ marginTop: 14 }}>{children}</div> : null}
    </div>
  );
}
