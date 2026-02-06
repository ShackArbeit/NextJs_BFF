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
    <div>
      <DemoHeader
        title="Auto Prerender（對照組）"
        description="只使用同步 I/O 與純運算，Next.js 可在 build time 完成，直接進 Static Shell。"
        concepts={['prerendering', 'static shell']}
        observe={[
          '頁面是否幾乎瞬間出現？',
          '重新整理是否一樣快？',
          '不需要 Suspense、不需要 use cache',
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
