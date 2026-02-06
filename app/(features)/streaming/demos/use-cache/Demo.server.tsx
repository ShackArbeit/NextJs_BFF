import DemoHeader from '../../_ui/DemoHeader'
import { cacheLife } from 'next/cache'
import { sleep, nowLabel } from '../utils'

async function getPostsCached() {
  'use cache'
  cacheLife('hours') // ✅ 讓快取維持久一點，效果更明顯

  // ✅ 放大：第一次進來會慢；命中快取後通常不會再等這麼久
  await sleep(1600)

  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6')
  const posts = await res.json()

  return {
    generatedAt: nowLabel(),
    posts,
  }
}

export default async function UseCacheDemo() {
  const data = await getPostsCached()

  return (
    <div>
      <DemoHeader
        title="use cache + cacheLife（第一次慢、之後快）"
        description="把外部 API 的結果快取起來：第一次需要等待，之後切換回來通常會瞬間顯示。"
        concepts={['use cache', 'cacheLife', 'cached RSC']}
        observe={[
          '第一次進入此 tab 是否明顯慢（sleep + fetch）？',
          '切到其他 tab 再回來，是否變快？',
          'generatedAt 是否維持不變（代表快取命中）？',
        ]}
        warning="在 dev 模式下，重新啟動 dev server 或某些熱更新可能會讓快取失效，所以第一次可能又會變慢。"
      />

      <div style={{ padding: 12, border: '1px solid #333', borderRadius: 10, marginBottom: 12 }}>
        <div style={{ opacity: 0.85 }}>
          <b>generatedAt (cached):</b> {data.generatedAt}
        </div>
        <div style={{ fontSize: 12, opacity: 0.75, marginTop: 6 }}>
          觀察：如果你切換 tab 再回來，generatedAt 還是一樣，通常代表你命中快取。
        </div>
      </div>

      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {data.posts.map((p: any) => (
          <li key={p.id} style={{ marginBottom: 8 }}>
            <b>{p.title}</b>
            <div style={{ fontSize: 12, opacity: 0.8 }}>{p.body}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
