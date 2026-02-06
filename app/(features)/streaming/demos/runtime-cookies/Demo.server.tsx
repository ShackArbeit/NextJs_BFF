import { cookies } from 'next/headers'
import { Suspense } from 'react'
import { cacheLife } from 'next/cache'
import DemoHeader from '../../_ui/DemoHeader'
import { sleep, nowLabel } from '../utils'

async function RuntimePanel() {
  await sleep(800)

  const store = await cookies()
  const theme = store.get('theme')?.value ?? '(no cookie: theme)'
  const visit = store.get('visit')?.value ?? '(no cookie: visit)'

  return (
    <div style={{ padding: 12, border: '1px solid #333', borderRadius: 10 }}>
      <div style={{ opacity: 0.8 }}>Resolved at: {nowLabel()}</div>
      <div>
        <b>cookie theme:</b> {theme}
      </div>
      <div>
        <b>cookie visit:</b> {visit}
      </div>
    </div>
  )
}

async function CachedBlock() {
  'use cache'
  cacheLife('hours')

  await sleep(1200)
  const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=3')
  const users = await res.json()

  return (
    <div style={{ padding: 12, border: '1px solid #333', borderRadius: 10 }}>
      <div style={{ opacity: 0.8 }}>
        Cached generatedAt: <b>{nowLabel()}</b>
      </div>
      <ul style={{ marginTop: 8 }}>
        {users.map((u: any) => (
          <li key={u.id}>
            {u.name} - <span style={{ opacity: 0.8 }}>{u.email}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default async function RuntimeCookiesDemo() {
  return (
    <div>
      <DemoHeader
        title="Runtime Data（cookies）"
        description="示範 runtime data 必須在 request time 才能取得，且一定要搭配 Suspense。"
        concepts={['cookies()', 'runtime data', 'Suspense']}
        observe={[
          '是否先看到 fallback，再看到 cookies 內容？',
          'generatedAt 是否每次刷新都不同？',
          'runtime 區塊與 cached 區塊是否行為不同？',
        ]}
        warning="runtime data 無法與 use cache 在同一個 scope 使用。"
      />

      <h3>A) Runtime panel</h3>
      <Suspense fallback={<p>⏳ Loading runtime cookies...</p>}>
        <RuntimePanel />
      </Suspense>

      <div style={{ height: 16 }} />

      <h3>B) Cached block</h3>
      <CachedBlock />
    </div>
  )
}
