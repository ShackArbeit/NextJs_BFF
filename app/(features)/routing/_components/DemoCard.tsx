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
    <div className="rounded-[18px] border border-white/10 bg-white/5 p-4 transition-all duration-200 hover:bg-white/10 hover:-translate-y-1">
      <div className="flex items-baseline gap-[10px]">
        <div className="text-[18px] font-extrabold">
          {title}
        </div>

        {badge ? (
          <span className="text-[12px] px-[8px] py-[2px] rounded-full border border-white/15 bg-white/10 opacity-90">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="mt-2 opacity-85 leading-relaxed">
        {desc}
      </div>
      <div className="mt-[14px] flex flex-wrap gap-[10px]">
        <Link
          href={href}
          className="
            inline-block
            px-[12px] py-[10px]
            rounded-[12px]
            border border-white/20
            font-bold text-white
            bg-[linear-gradient(135deg,rgba(99,102,241,0.35),rgba(236,72,153,0.25))]
            transition-all duration-200
            hover:brightness-110
            hover:scale-[1.03]
          "
        >
          Open →
        </Link>
      </div>

      {/* Children */}
      {children ? (
        <div className="mt-[14px]">
          {children}
        </div>
      ) : null}
    </div>
  );
}
