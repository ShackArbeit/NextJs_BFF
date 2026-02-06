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
    <div style={{ color: '#fff' }}>
      <DemoHeader
        title="Runtime Data（cookies）"
        description="cookies() 是 runtime data，必須在 request time 取得，需配合 Suspense。"
        concepts={['cookies()', 'runtime data', 'Suspense']}
        observe={[
          '先看到 fallback，稍後才讀到 cookies',
          'generatedAt 每次 request 都會變',
          'runtime 與 cached 區塊更新頻率不同',
        ]}
        warning="runtime data 不能在 use cache 區塊中使用"
      />

      <h3>A) Runtime panel</h3>
      <Suspense fallback={<p>Loading runtime cookies...</p>}>
        <RuntimePanel />
      </Suspense>

      <div style={{ height: 16 }} />

      <h3>B) Cached block</h3>
      <CachedBlock />
    </div>
  )
}
