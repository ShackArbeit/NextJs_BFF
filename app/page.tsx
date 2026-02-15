export default function HomePage() {
  return (
    <section className="px-10 py-10">
      <div className="max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Next.js App Router Feature Showcase
        </h2>

        <p className="mt-4 text-zinc-400 leading-relaxed">
          Built with Next.js 16 App Router to demonstrate BFF-style patterns, data fetching, streaming, and routing.
        </p>
        <div className="mt-8 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
          <h3 className="text-lg font-semibold text-white">
            Overview
          </h3>
          <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
            This lab treats Next.js as a Backend-for-Frontend: server components, server actions, and route handlers sit in front of external APIs to shield the UI and shape data safely.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-zinc-800 bg-zinc-900 p-5 hover:border-zinc-600 transition-colors"
            >
              <h4 className="text-base font-semibold text-white">
                {feature.title}
              </h4>
              <p className="mt-2 text-sm text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const FEATURES = [
  {
    title: 'Server Actions',
    description: 'Compare form actions to traditional fetch calls and how state flows on the server.',
  },
  {
    title: 'Data Fetching & Caching',
    description: 'Show how fetch caching and revalidation affect freshness and responsiveness.',
  },
  {
    title: 'Streaming & Suspense',
    description: 'Render partial HTML with streaming boundaries and understand Suspense fallbacks.',
  },
  {
    title: 'React Server Components',
    description: 'Explain what runs on the server vs. client and how they compose together.',
  },
  {
    title: 'Route Handlers',
    description: 'Implement REST-style APIs inside the App Router with typed handlers.',
  },
  {
    title: 'Advanced Routing',
    description: 'Explore nested layouts, intercepting routes, and parallel routes.',
  },
  {
    title: 'Proxy',
    description: 'Use DAL + DTO to proxy external APIs and keep the UI contract safe.',
  },
]
