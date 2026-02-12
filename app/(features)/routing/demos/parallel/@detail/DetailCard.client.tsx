"use client";
import { useState } from "react";
export default function DetailCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  const [zoomed, setZoomed] = useState(false);
  return (
    <div
      onClick={() => setZoomed((v) => !v)}
      className={[
        "cursor-pointer",
        "p-3",
        "rounded-[12px]",
        "border border-white/10",
        "bg-black/20",
        "origin-top-left",
        "transition-transform duration-150 ease-in-out",
        zoomed ? "scale-[1.04]" : "scale-100",
      ].join(" ")}
    >
      <div className="text-[16px] font-black text-white">
        {title}
      </div>

      <div className="mt-[10px] opacity-85 leading-[1.7] text-white">
        {body}
      </div>
    </div>
  );
}
