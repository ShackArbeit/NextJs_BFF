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
    <div>
      <DemoHeader
        title="Suspense Streaming（先出 fallback，再串流內容）"
        description="把無法在 prerender 完成的工作延後到 request time：fallback 先進 Static Shell，真正內容稍後串流進來。"
        concepts={['Suspense', 'fallback UI', 'request-time streaming']}
        observe={[
          '進入此 tab 時，是否會先看到 fallback？',
          '等待 1~2 秒後，內容是否才出現？',
          '重複切換回來是否每次都會 fallback（因為 cache: no-store）？',
        ]}
      />

      <Suspense fallback={<p>⏳ Loading todos...（這段會先進 Static Shell）</p>}>
        <SlowTodos />
      </Suspense>

      <div style={{ marginTop: 12, fontSize: 12, opacity: 0.75 }}>
        Tip：這裡刻意使用 <code>cache: 'no-store'</code> + <code>sleep()</code>，讓你每次都能明顯看到 Streaming 行為。
      </div>
    </div>
  )
}
