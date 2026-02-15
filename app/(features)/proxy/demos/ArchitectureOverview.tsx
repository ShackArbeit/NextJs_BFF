export default function ArchitectureOverview() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-white">
          Overview: Next.js as BFF
        </h2>
        <p className="text-sm text-zinc-400 leading-relaxed">
          Using Next.js App Router as a Backend-for-Frontend to own UI rendering and sit in front of external APIs. The BFF isolates clients from schema changes and adds caching, auth, and shaping.
        </p>
      </header>

      <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-sm font-semibold text-white">System picture</h3>
          <span className="text-xs text-zinc-400">
            Next.js (BFF) + DAL + DTO + external API (JSONPlaceholder)
          </span>
        </div>

        <pre className="mt-4 overflow-auto rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-xs text-zinc-200 leading-relaxed">
{`+---------------------------+
| Client UI                 |
+---------------------------+

+---------------------------+
| Next.js App Router (BFF)  |
| - Server Components (RSC) |
| - Client Components       |
| - Server Actions          |
| - Route Handlers (API)    |
+---------------------------+

+---------------------------+
| DAL (Fetcher)             |
| - Centralize API calls    |
| - Cache & errors          |
+---------------------------+

+---------------------------+
| DTO                       |
| - Shape data for UI       |
| - Isolate external schema |
+---------------------------+

+---------------------------+
| JSONPlaceholder (API)     |
+---------------------------+`}
        </pre>

      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card
          title="1) Next.js as BFF"
          badge="Role"
          items={[
            "App Router renders UI while BFF shields the client from external APIs.",
            "Server Actions and Route Handlers are the main BFF surfaces.",
            "External APIs (ex: JSONPlaceholder) stay behind the BFF boundary.",
          ]}
        />

        <Card
          title="2) DAL + DTO in the middle"
          badge="Data flow"
          items={[
            "UI never calls external APIs directly; everything goes through the DAL.",
            "DAL owns retries, errors, headers, and caching.",
            "DTO decides which fields go out; UI consumes the stable DTO shape.",
          ]}
        />

        <Card
          title="3) Simplify the middle layer"
          badge="Design"
          items={[
            "Middleware can add auth or tracing before hitting Actions / DAL.",
            "Business logic sits in Actions or the DAL instead of UI components.",
            "Keep components clean; test external schema changes at the boundary.",
          ]}
        />
      </section>


    </div>
  );
}

function Card({
  title,
  badge,
  items,
}: {
  title: string;
  badge: string;
  items: string[];
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
  );
}
