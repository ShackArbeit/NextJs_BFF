import { cookies } from 'next/headers'
import { Suspense } from 'react'
import { cacheLife } from 'next/cache'
import DemoHeader from '../../_ui/DemoHeader'
import { sleep, nowLabel } from '../utils'
async function RuntimePanel() {
  await sleep(1500)
  const store = await cookies()
  // console.log('Cookie Store:',store)
  const theme = store.get('theme')?.value ?? '(無 Cookie：theme)'
  const visit = store.get('visit')?.value ?? '(無 Cookie：visit)'

  return (
    <div className="p-3 border border-zinc-700 rounded-xl bg-zinc-900/50">
      <div className="opacity-80 text-sm mb-2 text-zinc-400">解析時間：{nowLabel()}</div>
      <div className="space-y-1">
        <div className="text-zinc-200">
          <span className="font-bold text-blue-400">Cookie 主題 (theme)：</span> {theme}
        </div>
        <div className="text-zinc-200">
          <span className="font-bold text-blue-400">Cookie 訪問次數 (visit)：</span> {visit}
        </div>
      </div>
    </div>
  )
}

async function CachedBlock() {
  'use cache'
  cacheLife('hours')
  await sleep(3000)
  const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=3')
  const users = await res.json()
  return (
    <div className="p-3 border border-zinc-700 rounded-xl bg-zinc-900/50">
      <div className="opacity-80 text-sm text-zinc-400">
        快取生成時間：<span className="font-bold text-green-400">{nowLabel()}</span>
      </div>
      <ul className="mt-3 space-y-1 divide-y divide-zinc-800">
        {users.map((u: any) => (
          <li key={u.id} className="pt-1 first:pt-0">
            <span className="text-zinc-100">{u.name}</span>
            <span className="mx-2 text-zinc-500">-</span>
            <span className="opacity-80 text-zinc-400 text-sm">{u.email}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default async function RuntimeCookiesDemo() {
  return (
    <div className="text-white space-y-6">
      <DemoHeader
        title="執行階段數據（Cookies）"
        description="cookies() 屬於執行階段數據 (Runtime Data)，必須在請求時取得，建議配合 Suspense 使用。"
        concepts={['cookies()', '執行階段數據', 'Suspense']}
        observe={[
          '會先看到加載狀態 (Fallback)，隨後才顯示內容',
          '解析時間在每次重新整理後都會更新',
          '執行階段區塊與快取區塊的更新頻率不同',
        ]}
        warning="執行階段數據 (Runtime Data) 不能在「use cache」區塊內直接使用"
      />

      <section>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span className="bg-blue-500 w-1 h-5 rounded-full" />
          A) 執行階段面板 (Runtime Panel)
        </h3>
        <Suspense fallback={<p className="text-zinc-500 animate-pulse">正在讀取 Cookie 數據...</p>}>
          <RuntimePanel />
        </Suspense>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span className="bg-green-500 w-1 h-5 rounded-full" />
          B) 快取區塊 (Cached Block)
        </h3>
        <CachedBlock />
      </section>
    </div>
  )
}