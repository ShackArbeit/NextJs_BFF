// app/page.tsx
export default function HomePage() {
  return (
    <section className="px-10 py-10">
      <div className="max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Next.js App Router Feature Showcase
        </h2>

        <p className="mt-4 text-zinc-400 leading-relaxed">
          This project is a hands-on demonstration of modern{' '}
          <span className="text-zinc-200 font-medium">Next.js App Router</span>{' '}
          capabilities, designed specifically for technical interviews.
        </p>

        {/* Highlight box */}
        <div className="mt-8 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
          <h3 className="text-lg font-semibold text-white">
            Architectural Positioning
          </h3>
          <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
            In this project, Next.js is intentionally used as a{' '}
            <span className="text-zinc-200 font-medium">
              BFF (Backend for Frontend)
            </span>
            . While Next.js supports both Node.js and Edge runtimes, large-scale
            systems should still rely on independent backend services.
          </p>
        </div>

        {/* Feature list */}
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
    description: 'Compare form actions with traditional client-side fetch.',
  },
  {
    title: 'Data Fetching & Caching',
    description: 'Demonstrate fetch cache, revalidation, and data freshness.',
  },
  {
    title: 'Streaming & Suspense',
    description: 'Show partial rendering with dynamic HTML streaming.',
  },
  {
    title: 'React Server Components',
    description: 'Explain RSC boundaries and rendering responsibilities.',
  },
  {
    title: 'Route Handlers',
    description: 'REST-style APIs implemented in the App Router.',
  },
  {
    title: 'Advanced Routing',
    description: 'Nested layouts, route groups, and routing patterns.',
  },
]
