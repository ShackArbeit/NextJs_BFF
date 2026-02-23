import { headers } from "next/headers";

type ExternalPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function getBaseUrl(): Promise<string> {
  const envBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (envBaseUrl) return envBaseUrl;

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  return `${proto}://${host}`;
}

async function getProxyPosts(): Promise<ExternalPost[]> {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/proxy/posts`, { cache: "no-store" });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Proxy fetch failed: ${res.status} ${text}`);
  }

  return (await res.json()) as ExternalPost[];
}

export default async function ProxyDemo() {
  const posts = await getProxyPosts();

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-6">
      <section className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-zinc-950 p-6 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="flex items-center gap-2 mb-4">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          <h2 className="text-sm font-bold tracking-widest uppercase text-zinc-400">
            Flow: Proxy pattern
          </h2>
        </div>

        <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {[
            { step: "01", title: "Client / Server Component", desc: "Client or RSC calls /api/proxy/posts." },
            { step: "02", title: "Route Handler forwards", desc: "Route handler sends the request to the external API." },
            { step: "03", title: "Sanitized response", desc: "UI receives scrubbed JSON and renders it." },
          ].map((item, i) => (
            <li key={i} className="flex flex-col border-l border-zinc-800 pl-4 py-1">
              <span className="text-blue-500 font-mono font-bold">{item.step}</span>
              <span className="text-zinc-200 font-medium">{item.title}</span>
              <span className="text-zinc-500 text-xs mt-1">{item.desc}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 6).map((p) => (
          <article
            key={p.id}
            className="group relative flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-zinc-700 hover:bg-zinc-900"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="inline-flex items-center rounded-md bg-zinc-800 px-2 py-1 text-[10px] font-medium text-zinc-400 ring-1 ring-inset ring-zinc-700/50">
                  RAW_DATA_IN
                </div>
                <div className="flex gap-1">
                  <span className="rounded bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-medium text-blue-400">ID: {p.id}</span>
                  <span className="rounded bg-purple-500/10 px-1.5 py-0.5 text-[10px] font-medium text-purple-400">UID: {p.userId}</span>
                </div>
              </div>

              <h3 className="mt-4 text-base font-semibold leading-6 text-zinc-100 group-hover:text-blue-400 transition-colors">
                {p.title}
              </h3>

              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-400">
                {p.body}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800/50">
              <div className="flex items-center gap-2 text-[11px] text-amber-500/80">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Note: avoid leaking external-only fields (like userId) directly to UI.</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
