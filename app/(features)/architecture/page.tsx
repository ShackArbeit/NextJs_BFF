// app/(features)/architecture/page.tsx
export default function ArchitecturePage() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <header className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-white">
          Architecture: Next.js as a BFF
        </h2>
        <p className="text-sm text-zinc-400 leading-relaxed">
          This project positions Next.js App Router as a{" "}
          <span className="text-zinc-200 font-medium">BFF (Backend for Frontend)</span>
          : UI + orchestration + server-side capabilities, while still keeping the
          data layer clean and maintainable.
        </p>
      </header>

      {/* Diagram */}
      <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-sm font-semibold text-white">System Diagram</h3>
          <span className="text-xs text-zinc-400">
            UI → Next.js (BFF) → DAL → Prisma → MongoDB Atlas
          </span>
        </div>

        <pre className="mt-4 overflow-auto rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-xs text-zinc-200 leading-relaxed">
{`┌──────────────────────────────┐
│        Browser / Client      │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      Next.js App Router      │  (BFF)
│  - Server Components (RSC)   │
│  - Client Components        │
│  - Server Actions           │
│  - Route Handlers (REST)    │
└──────────────┬───────────────┘
               │ orchestration only
               ▼
┌──────────────────────────────┐
│   DAL (Data Access Layer)    │
│  - centralized DB queries    │
│  - no UI concerns            │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Prisma Client + DTO mapping  │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│     MongoDB Atlas (Cloud)    │
└──────────────────────────────┘`}
        </pre>

        <p className="mt-3 text-xs text-zinc-500">
          Interview tip: emphasize “clean boundaries” and “orchestration” rather
          than only listing features.
        </p>
      </section>

      {/* Cards */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card
          title="1) Next.js = BFF (in this demo)"
          badge="Positioning"
          items={[
            "Use App Router for UI + server-side orchestration.",
            "Server Actions and Route Handlers are the BFF endpoints.",
            "MongoDB Atlas is used to avoid self-hosting DB for a demo.",
          ]}
        />

        <Card
          title="2) DAL + DTO over “logic everywhere”"
          badge="Maintainability"
          items={[
            "UI pages do not touch Prisma directly.",
            "DAL centralizes data access and isolates DB decisions.",
            "DTO shapes data for UI to avoid leaking DB schema details.",
          ]}
        />

        <Card
          title="3) Middleware is thin by design"
          badge="Boundary"
          items={[
            "Middleware is best for redirects/auth/headers/locale.",
            "Avoid turning middleware into a data-processing layer.",
            "Business logic belongs in services/actions/handlers + DAL.",
          ]}
        />
      </section>

      {/* Talking points */}
      <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h3 className="text-sm font-semibold text-white">
           Key Points
        </h3>

        <ul className="mt-4 space-y-2 text-sm text-zinc-300">
          <li className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-200" />
            <span>
              I use Next.js as a <span className="text-white font-medium">BFF</span> to
              keep frontend experiences close to the UI while maintaining clean boundaries.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-200" />
            <span>
              Data access is centralized in <span className="text-white font-medium">DAL</span>,
              and UI receives shaped data via <span className="text-white font-medium">DTO</span>.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-200" />
            <span>
              I avoid overusing middleware; it stays <span className="text-white font-medium">thin</span>{" "}
              and focused on request-level concerns.
            </span>
          </li>
        </ul>
      </section>
    </div>
  )
}

function Card({
  title,
  badge,
  items,
}: {
  title: string
  badge: string
  items: string[]
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-base font-semibold text-white">{title}</h4>
        <span className="shrink-0 rounded-md border border-zinc-700 bg-zinc-950 px-2 py-1 text-[11px] text-zinc-300">
          {badge}
        </span>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-zinc-300">
        {items.map((text) => (
          <li key={text} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-zinc-300">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
