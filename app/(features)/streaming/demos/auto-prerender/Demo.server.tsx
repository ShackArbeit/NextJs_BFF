import fs from 'node:fs'
import path from 'node:path'
import DemoHeader from '../../_ui/DemoHeader'

export default async function AutoPrerenderDemo() {
  const filePath = path.join(process.cwd(), 'package.json')
  const raw = fs.readFileSync(filePath, 'utf-8')

  const pkg = JSON.parse(raw)
  const depsCount = pkg?.dependencies ? Object.keys(pkg.dependencies).length : 0
  const devDepsCount = pkg?.devDependencies ? Object.keys(pkg.devDependencies).length : 0

  const computed = Array.from({ length: 8 }, (_, i) => (i + 1) * 7).map((n) => n * 2)

  return (
    <div style={{ color: '#fff' }}>
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

      <div style={{ padding: 12, border: '1px solid #333', borderRadius: 10, marginBottom: 12 }}>
        <div>
          <b>package.json name:</b> {pkg?.name ?? '(unknown)'}
        </div>
        <div>
          <b>dependencies:</b> {depsCount}
        </div>
        <div>
          <b>devDependencies:</b> {devDepsCount}
        </div>
      </div>

      <div style={{ padding: 12, border: '1px solid #333', borderRadius: 10 }}>
        <b>Pure compute output:</b>
        <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {computed.map((n) => (
            <span
              key={n}
              style={{
                border: '1px solid #444',
                padding: '6px 10px',
                borderRadius: 999,
                background: '#111',
              }}
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
