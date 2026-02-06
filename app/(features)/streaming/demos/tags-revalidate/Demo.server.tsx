import DemoHeader from '../../_ui/DemoHeader'
import { getCart } from './actions'
import CartClient from './CartClient.client'

export default async function TagsRevalidateDemo() {
  const cart = await getCart()

  return (
    <div>
      <DemoHeader
        title="cacheTag + updateTag（Update cart）"
        description="示範快取資料如何在 mutation 後立即失效並重新產生。"
        concepts={['use cache', 'cacheTag', 'updateTag', 'Server Actions']}
        observe={[
          '第一次進來是否很慢？',
          '切走再回來是否變快且 generatedAt 不變？',
          '點擊 Update 是否立刻看到新的 generatedAt？',
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
