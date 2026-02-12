import DemoHeader from '../../_ui/DemoHeader'
import { getCart } from './actions'
import CartClient from './CartClient.client'

export default async function TagsRevalidateDemo() {
  const cart = await getCart()

  return (
    <div className="text-white">
      <DemoHeader
        title="cacheTag + revalidateTag（更新快取）"
        description="透過 mutation 讓 cache tag 失效並重新取得資料。"
        concepts={['use cache', 'cacheTag', 'revalidateTag', 'Server Actions']}
        observe={[
          '第一次進入會看到 cached 內容',
          '點 Update 後 generatedAt 會更新',
          'Server Action 觸發 revalidate',
        ]}
      />
      <div className="p-3 border border-[#333] rounded-[10px] mb-3">
        <div>
          <span className="font-bold">generatedAt (cached):</span> {cart.generatedAt}
        </div>
        <ul className="mt-[10px]">
          {cart.items.map((it: any) => (
            <li key={it.id}>
              <span className="font-bold">{it.title}</span> — qty: {it.qty}
            </li>
          ))}
        </ul>
      </div>

      <CartClient />
    </div>
  )
}