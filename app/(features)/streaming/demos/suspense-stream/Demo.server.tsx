import DemoHeader from '../../_ui/DemoHeader'
import { Suspense } from 'react'
import { sleep, nowLabel } from '../utils'

async function SlowTodos() {
  await sleep(1800)

  const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=8', {
    cache: 'no-store',
  })
  const todos = await res.json()

  return (
    <div style={{ padding: 12, border: '1px solid #333', borderRadius: 10 }}>
      <div style={{ opacity: 0.85 }}>
        <b>resolvedAt (request-time):</b> {nowLabel()}
      </div>

      <ul style={{ marginTop: 10, paddingLeft: 18 }}>
        {todos.map((t: any) => (
          <li key={t.id} style={{ marginBottom: 6 }}>
            <b style={{ opacity: 0.95 }}>{t.title}</b>{' '}
            <span style={{ fontSize: 12, opacity: 0.7 }}>
              ({t.completed ? 'done' : 'pending'})
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default async function SuspenseStreamDemo() {
  return (
    <div style={{ color: '#fff' }}>
      <DemoHeader
        title="Suspense Streaming（串流 + fallback）"
        description="先渲染 static shell，再在 request time 串流內容。"
        concepts={['Suspense', 'fallback UI', 'request-time streaming']}
        observe={[
          '切換 tab 會先看到 fallback',
          '約 1~2 秒後資料載入',
          "這個 demo 使用 cache: 'no-store'",
        ]}
      />

      <Suspense fallback={<p>Loading todos...（streaming）</p>}>
        <SlowTodos />
      </Suspense>

      <div style={{ marginTop: 12, fontSize: 12, opacity: 0.75 }}>
        提示：這裡用 <code>cache: 'no-store'</code> + <code>sleep()</code> 模擬 request-time streaming
      </div>
    </div>
  )
}
