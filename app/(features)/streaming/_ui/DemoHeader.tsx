type DemoHeaderProps = {
  title: string
  description?: string
  concepts?: string[]
  observe?: string[]
  warning?: string
}

export default function DemoHeader({
  title,
  description,
  concepts = [],
  observe = [],
  warning,
}: DemoHeaderProps) {
  return (
    <header className="mb-4 border-bottom border-neutral-800 pb-3 text-white">
      <h1 className="m-0 text-2xl font-bold tracking-tight">{title}</h1>

      {description && (
        <p className="mt-1.5 text-sm leading-relaxed opacity-85">
          {description}
        </p>
      )}
      {concepts.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-2">
          {concepts.map((c) => (
            <span
              key={c}
              className="rounded-full border border-neutral-700 bg-neutral-900 px-2.5 py-1 text-xs opacity-90 transition-hover hover:border-neutral-500"
            >
              {c}
            </span>
          ))}
        </div>
      )}
      {observe.length > 0 && (
        <div className="mt-3 rounded-xl border border-dashed border-neutral-700 bg-neutral-950 p-3 text-[13px] leading-relaxed">
          <div className="mb-1.5 font-bold text-neutral-200 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500" />
            觀察重點
          </div>
          <ul className="m-0 list-inside list-disc space-y-1 pl-1 text-neutral-400">
            {observe.map((o, i) => (
              <li key={i} className="pl-1">
                <span className="text-neutral-300">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {warning && (
        <div className="mt-3 rounded-xl border border-amber-900/50 bg-amber-950/20 p-3 text-[13px] text-amber-200/90">
          <span className="font-bold text-amber-500">注意：</span>
          {warning}
        </div>
      )}
    </header>
  )
}