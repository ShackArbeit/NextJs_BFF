import Link from "next/link";

export type TabKey = "Whole Structure" | "proxy" | "dal-dto";

export default function TabNav({ activeTab }: { activeTab: TabKey }) {
  const tabs: Array<{ key: TabKey; label: string; desc: string }> = [
    {
      key: "Whole Structure",
      label: "架構概覽",
      desc: "先點擊了解基本概念",
    },
    {
      key: "proxy",
      label: "Proxy 路由處理",
      desc: "BFF 作為外部 API 閘道",
    },
    {
      key: "dal-dto",
      label: "DAL + DTO",
      desc: "資料存取與轉換定義",
    },
  ];

  return (
    <nav className="mt-6 grid gap-3 md:grid-cols-2">
      {tabs.map((t) => {
        const isActive = t.key === activeTab;
        return (
          <Link
            key={t.key}
            href={{ pathname: "/proxy", query: { tab: t.key } }}
            className={[
              "rounded-2xl border px-5 py-4 transition",
              isActive
                ? "border-emerald-500/50 bg-emerald-500/10"
                : "border-zinc-800 bg-zinc-900 hover:bg-zinc-800",
            ].join(" ")}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold">{t.label}</div>
                <div className="mt-1 text-sm text-zinc-300">{t.desc}</div>
              </div>
              <div
                className={[
                  "rounded-full px-3 py-1 text-xs",
                  isActive
                    ? "bg-emerald-500/20 text-emerald-200"
                    : "bg-zinc-800 text-zinc-200",
                ].join(" ")}
              >
                tab={t.key}
              </div>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
