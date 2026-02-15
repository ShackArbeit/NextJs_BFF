import Link from "next/link";
import type { ReactElement } from "react";
import { Suspense } from "react";
import ActionInServerComponent from "./(demos)/action_in_server_coponent";
import ActionInClientComponent from "./(demos)/action_in_client_coponent";

type TabKey = "action_in_server_coponent" | "action_in_client_coponent";

const tabs: Array<{
  key: TabKey;
  label: string;
  hint: string;
  component: () => ReactElement | Promise<ReactElement>;
}> = [
  {
    key: "action_in_server_coponent",
    label: "Server Component + useActionState",
    hint: "Pending UI + simulated delay in a server route",
    component: ActionInServerComponent,
  },
  {
    key: "action_in_client_coponent",
    label: "Client Component + useTransition",
    hint: "startTransition keeps UI responsive while pending",
    component: ActionInClientComponent,
  },
];

type PageProps = {
  searchParams:
    | Promise<Record<string, string | string[] | undefined>>
    | Record<string, string | string[] | undefined>;
};

export default async function Page({ searchParams }: PageProps) {
  return (
    <div className="mx-auto max-w-6xl px-8 py-10 space-y-8">
      <header className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-sky-500/5 to-violet-500/10 p-8 shadow-lg shadow-black/30">
        <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">Feature</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Server Actions Demo</h1>
        <p className="mt-2 max-w-3xl text-sm text-zinc-300">
          Two focused demos: a server component that uses server actions with useActionState for
          pending feedback, and a client component that calls the same action via props and wraps
          submission in useTransition to keep the UI responsive.
        </p>
      </header>

      <Suspense
        fallback={
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-sm text-zinc-300">
            Loading...
          </div>
        }
      >
        <TabContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function TabContent({ searchParams }: PageProps) {
  const resolvedParams =
    searchParams instanceof Promise ? await searchParams : searchParams ?? {};

  const tabParam = resolvedParams.tab;
  const tabKey =
    typeof tabParam === "string" && tabs.some((t) => t.key === tabParam)
      ? (tabParam as TabKey)
      : tabs[0].key;

  const activeTab = tabs.find((t) => t.key === tabKey) ?? tabs[0];
  const ActiveComponent = activeTab.component;

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab.key;
          return (
            <Link
              key={tab.key}
              href={`/server-actions?tab=${tab.key}`}
              className={`group rounded-xl border px-4 py-3 text-sm transition ${
                isActive
                  ? "border-emerald-400/60 bg-emerald-500/10 text-white shadow-inner shadow-emerald-500/20"
                  : "border-white/5 bg-white/5 text-zinc-300 hover:border-white/15 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="font-semibold">{tab.label}</span>
              <p className="text-xs text-zinc-400 group-hover:text-zinc-300">{tab.hint}</p>
            </Link>
          );
        })}
      </div>

      <Suspense
        fallback={
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-sm text-zinc-300">
            Loading tab...
          </div>
        }
      >
        
        <ActiveComponent key={activeTab.key} />
      </Suspense>
    </>
  );
}
