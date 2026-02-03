// app/(features)/layout.tsx
export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="min-h-screen px-10 py-10">
      {/* Wide container */}
      <div className="mx-auto w-full max-w-6xl">
        {/* Top header / consistent page chrome */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur">
          <div className="flex items-center justify-between gap-6">
            <div>
              <p className="text-xs font-medium tracking-wide text-zinc-400">
                NEXT.JS APP ROUTER LAB
              </p>
              <h1 className="mt-2 text-xl font-semibold text-white">
                Feature Playground
              </h1>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                Each page demonstrates a specific Next.js capability with a
                practical UI difference you can explain in interviews.
              </p>
            </div>

            {/* Right-side status chip */}
            <div className="hidden sm:flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-zinc-300">
                Runtime: Node.js (default)
              </span>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          {children}
        </div>

        {/* Footer hint */}
        <p className="mt-6 text-xs text-zinc-500">
          Tip: Prioritize explaining "rendering mechanics and architectural impact" 
          over mere technical definitions.
        </p>
      </div>
    </section>
  )
}