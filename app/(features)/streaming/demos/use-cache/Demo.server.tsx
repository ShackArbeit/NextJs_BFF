import DemoHeader from '../../_ui/DemoHeader'
import { cacheLife } from 'next/cache'
import { sleep, nowLabel } from '../utils'

async function getPostsCached() {
  'use cache'
  cacheLife('hours')
  await sleep(4000)
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6')
  const posts = await res.json()

  return {
    generatedAt: nowLabel(), 
    posts,
  }
}

export default async function UseCacheDemo() {
  const data = await getPostsCached()
  const currentTime = nowLabel() 

  return (
    <div className="text-white">
      <DemoHeader
        title="use cache + cacheLife（快取）"

        description={`目前時間：${currentTime} | 示範資料快取與生成時間。`}
        concepts={['use cache', 'cacheLife', 'cached RSC']}
        observe={[
          `目前時間 (Current)：${currentTime}`,
          `快取時間 (Cached)：${data.generatedAt}`,
          '若兩者時間不同，代表資料是從快取取得，而非重新 Fetch',
          '切換 tab 再回來，快取時間應保持不變',
        ]}
        warning="在 dev 模式下，快取行為可能因熱重載而不穩定"
      />

      <div className="p-4 border border-blue-500/50 bg-blue-500/10 rounded-[10px] mb-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-blue-300 font-medium">頁面渲染時間 (Current):</span>
            <code className="bg-slate-800 px-2 py-1 rounded text-sm">{currentTime}</code>
          </div>
          <div className="flex justify-between items-center text-green-400">
            <span className="font-bold underline">快取生成時間 (Cached):</span>
            <code className="bg-slate-800 px-2 py-1 rounded text-sm font-bold">
              {data.generatedAt}
            </code>
          </div>
        </div>
        <p className="text-xs opacity-70 mt-3 italic">
          註：如果以上兩個時間點一致，代表這是第一次抓取或快取已過期。
        </p>
      </div>

  
      <ul className="m-0 pl-5 list-disc space-y-2">
        {data.posts.map((p: any) => (
          <li key={p.id} className="group">
            <b className="block group-hover:text-blue-400 transition-colors">{p.title}</b>
            <div className="text-xs opacity-80 leading-relaxed">{p.body}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}