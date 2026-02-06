import type { ReactNode } from "react";

export default function DemoShell({
  title,
  subtitle,
  bullets,
  routeExample,
  children,
}: {
  title: string;
  subtitle: string;
  bullets: string[];
  routeExample: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-2 text-zinc-300">{subtitle}</p>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="text-sm font-semibold text-zinc-200">
              Route Example
            </div>
            <code className="mt-2 block rounded-lg bg-zinc-900 px-3 py-2 text-sm text-zinc-100">
              {routeExample}
            </code>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="text-sm font-semibold text-zinc-200">
              Key Takeaways
            </div>
            <ul className="mt-2 space-y-2 text-sm text-zinc-300">
              {bullets.map((b, idx) => (
                <li key={idx} className="leading-relaxed">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        {children}
      </div>
    </section>
  );
}
