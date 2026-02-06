import DemoHeader from '../../_ui/DemoHeader'
import { cacheLife } from 'next/cache'
import { sleep, nowLabel } from '../utils'

async function getPostsCached() {
  'use cache'
  cacheLife('hours')

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
    <div style={{ color: '#fff' }}>
      <DemoHeader
        title="use cache + cacheLife（快取）"
        description="示範 use cache + cacheLife，資料會被快取並顯示生成時間。"
        concepts={['use cache', 'cacheLife', 'cached RSC']}
        observe={[
          '第一次進入會等待 sleep + fetch',
          '切換 tab 再回來時間不會變',
          'generatedAt 代表快取生成時間',
        ]}
        warning="在 dev 模式可能因為熱重載或無快取而不易看出差異"
      />

      <div style={{ padding: 12, border: '1px solid #333', borderRadius: 10, marginBottom: 12 }}>
        <div style={{ opacity: 0.85 }}>
          <b>generatedAt (cached):</b> {data.generatedAt}
        </div>
        <div style={{ fontSize: 12, opacity: 0.75, marginTop: 6 }}>
          切換 tab 再回來，generatedAt 仍維持原值，表示資料為快取結果。
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
