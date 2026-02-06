import DemoHeader from '../../_ui/DemoHeader'
import { getCart } from './actions'
import CartClient from './CartClient.client'

export default async function TagsRevalidateDemo() {
  const cart = await getCart()

  return (
    <div style={{ color: '#fff' }}>
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

      <div style={{ padding: 12, border: '1px solid #333', borderRadius: 10, marginBottom: 12 }}>
        <div>
          <b>generatedAt (cached):</b> {cart.generatedAt}
        </div>
        <ul style={{ marginTop: 10 }}>
          {cart.items.map((it: any) => (
            <li key={it.id}>
              <b>{it.title}</b> — qty: {it.qty}
            </li>
          ))}
        </ul>
      </div>

      <CartClient />
    </div>
  )
}
