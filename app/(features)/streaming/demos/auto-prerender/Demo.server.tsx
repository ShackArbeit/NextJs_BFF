import fs from 'node:fs'
import path from 'node:path'
import DemoHeader from '../../_ui/DemoHeader'

export default async function AutoPrerenderDemo() {
  const filePath = path.join(process.cwd(), 'package.json')
  const raw = fs.readFileSync(filePath, 'utf-8')

  const pkg = JSON.parse(raw)
  const depsCount = pkg?.dependencies ? Object.keys(pkg.dependencies).length : 0
  console.log("depCount:",depsCount)
  const devDepsCount = pkg?.devDependencies ? Object.keys(pkg.devDependencies).length : 0
  console.log("devDepsCount:",devDepsCount)

  const computed = Array.from({ length: 8 }, (_, i) => (i + 1) * 7).map((n) => n * 2)

  return (
    <div className="text-white">
      <DemoHeader
        title="Auto Prerender（自動預渲染）"
        description="只有純計算與檔案讀取（無 request runtime data），Next.js 可在 build time 產生 Static Shell。"
        concepts={['prerendering', 'static shell']}
        observe={[
          '重新整理或切換 tab，內容仍穩定',
          '沒有 request-time 資料存取',
          '未使用 Suspense 或 use cache',
        ]}
      />
      <div className="mb-3 rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 leading-relaxed">
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold">Project Name</span>
            <span className="font-mono text-blue-400">{pkg?.name ?? '(unknown)'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold">Dependencies</span>
            <span className="text-lg font-semibold">{depsCount}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold">Dev Dependencies</span>
            <span className="text-lg font-semibold">{devDepsCount}</span>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
        <h3 className="mb-3 text-sm font-bold text-neutral-400">Pure compute output:</h3>
        <div className="flex flex-wrap gap-2">
          {computed.map((n) => (
            <span
              key={n}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 bg-neutral-950 font-mono text-sm shadow-inner transition-transform hover:scale-110"
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
