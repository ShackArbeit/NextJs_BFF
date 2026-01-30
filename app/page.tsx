// app/page.tsx
import Link from "next/link";

type NavItem = {
  title: string;
  description: string;
  href: string;
  tag: string;
};

const NAV_ITEMS: NavItem[] = [
  { title: "Routing & Layouts", description: "App Router 的路由、Layout、Link、Route Groups 基礎展示。", href: "/routing-layouts", tag: "App Router" },
  { title: "Rendering", description: "RSC / Client boundary / composition patterns 與 Runtime 概念。", href: "/rendering", tag: "RSC" },
  { title: "Data Fetching & Caching", description: "default cache / no-store / revalidate 模式展示。", href: "/data-fetching-caching", tag: "Cache" },
  { title: "Server Actions", description: "傳統 mutation vs Server Action、DTO 驗證、revalidate 更新 UI。", href: "/server-actions", tag: "Mutation" },
  { title: "Route Handlers", description: "Route Handlers 做 BFF API：CRUD、錯誤處理與格式統一。", href: "/route-handlers", tag: "BFF" },
  { title: "Optimizations", description: "next/image、next/font、Metadata 等 built-in 最佳化項目。", href: "/optimizations", tag: "Perf" },
  { title: "Advanced Routing", description: "Parallel / Intercepting / Nested Layout 等進階路由能力。", href: "/advanced-routing", tag: "Advanced" },
  { title: "Middleware", description: "redirect/rewrite、headers 與 i18n 概念展示。", href: "/middleware", tag: "Edge" },
];

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-zinc-300 ${className}`}>
      {children}
    </span>
  );
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-zinc-950 text-zinc-300 selection:bg-indigo-500/30">
      {/* 背景光暈 - 強化深色層次 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="relative rounded-3xl border border-white/[0.08] bg-zinc-900/50 p-8 md:p-14 backdrop-blur-sm">
          <div className="flex flex-col gap-6">
            <Badge className="w-fit border-indigo-500/20 bg-indigo-500/10 text-indigo-300">
              Next.js App Router • Feature Showroom
            </Badge>

            {/* 突顯感標題：使用漸層色 */}
            <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight text-white md:text-6xl">
              用可操作 Demo 展示對{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                Next.js
              </span>{" "}
              的深度理解
            </h1>

            <p className="max-w-2xl text-pretty text-lg leading-8 text-zinc-400">
              本專案以 Next.js 扮演 <span className="text-zinc-100 font-medium">BFF（Backend For Frontend）</span>。
              展示從資料獲取、伺服器元件到邊緣運算的完整應用，結合 
              <span className="text-zinc-100 font-medium"> Prisma + MongoDB Atlas</span> 雲端架構。
            </p>

            <div className="flex flex-wrap gap-2 opacity-80">
              {["RSC", "Streaming", "Revalidate", "Middleware"].map(t => (
                <Badge key={t}># {t}</Badge>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <a href="#" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200">
                GitHub Repo
              </a>
              <a href="#" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Live Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Cards Section */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">開發導航</h2>
            <p className="mt-2 text-zinc-500">點擊卡片進入主題，透過控制台觀察數據流與渲染行為。</p>
          </div>
          <Badge className="hidden md:block border-zinc-700 bg-transparent text-zinc-500">
            Tip：建議先看 Data Fetching / Server Actions
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-900/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-zinc-900/80"
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500">{item.tag}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-400">
                    {item.description}
                  </p>
                </div>
                
                <div className="mt-8 flex items-center gap-2 text-xs font-medium text-indigo-500 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                  Explore Demo <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 rounded-2xl border border-indigo-500/10 bg-indigo-500/[0.02] p-6 italic">
          <p className="text-sm leading-7 text-zinc-500">
            <strong className="text-indigo-400 not-italic">面試要點：</strong> 
            強調 DAL + DTO 的架構設計。展示如何利用 Next.js 特性將複雜的業務邏輯從 Middleware 中抽離，
            並確保資料流在 Server 與 Client 之間的安全傳遞。
          </p>
        </div>
      </section>
    </main>
  );
}