// app/layout.tsx
import './globals.css'
import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100 antialiased">
        <div className="flex min-h-screen">
          <aside className="w-64 shrink-0 border-r border-zinc-800 bg-zinc-900">
            <div className="px-6 py-5 border-b border-zinc-800">
              <h1 className="text-lg font-semibold tracking-tight text-white">
                Next.js Feature Lab
              </h1>
              <p className="mt-1 text-xs text-zinc-400">
                App Router Showcase
              </p>
            </div>

            <nav className="px-4 py-4 space-y-1 text-sm">
              <NavItem href="/" label="Overview" />
              <NavItem href="/architecture" label="Architecture (BFF)" />
              <NavItem href="/server-actions" label="Server Actions" />
              <NavItem href="/data-fetching" label="Data Fetching" />
              <NavItem href="/streaming" label="Streaming & Suspense" />
              <NavItem href="/rsc-vs-client" label="RSC vs Client" />
              <NavItem href="/route-handlers" label="Route Handlers" />
              <NavItem href="/routing" label="Advanced Routing" />
              <NavItem href="/middleware" label="Middleware" />
            </nav>
          </aside>

          <main className="flex-1 bg-zinc-950">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

function NavItem({
  href,
  label,
}: {
  href: string
  label: string
}) {
  return (
    <Link
      href={href}
      className="block rounded-md px-3 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
    >
      {label}
    </Link>
  )
}
