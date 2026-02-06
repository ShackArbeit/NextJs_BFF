import type { ReactNode } from "react";

export default function RoutingLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode; // from @modal slot
}) {
  return (
    <div style={{ padding: 24 }}>
      {children}
      {modal}
    </div>
  );
}
