"use client";

import { useSelectedLayoutSegment } from "next/navigation";

export default function HideParallelPanels() {
  const segment = useSelectedLayoutSegment();
  if (segment !== "photos") {
    return null;
  }

  return <style>{`.iter-parallel-panels { display: none; }`}</style>;
}
