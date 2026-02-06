# Middleware Feature Demo (Next.js App Router)

## 目的
這個 feature 用「同一個 page + querystring tabs」的方式，展示兩種 BFF/資料取得策略的差異：

1) Proxy/BFF Route Handler（tab=proxy）
- 概念：前端呼叫我方 API（`/api/proxy/posts`），由伺服器轉送到外部服務（JSONPlaceholder）。
- 優點：前端只依賴我方 endpoint，外部 API 變更或需要加 header/token 可集中處理。
- 風險：如果只是「轉送原樣資料」，等於把不受控資料直接暴露給前端；容易造成資料污染、欄位不一致、甚至把不該回傳的欄位帶出去。
  - 也常見於「把 proxy 當萬能解」：所有東西都 route handler 轉發，沒有資料契約與欄位收斂。

2) DAL + DTO（tab=dal-dto）
- 概念：用 DAL（Data Access Layer）統一資料來源與存取方式；用 DTO（Data Transfer Object）定義輸出資料契約，並在回傳前做欄位白名單/驗證/收斂。
- 優點：
  - 更安全：明確定義「我只回傳哪些欄位」，避免外部 API/DB 夾帶多餘資訊。
  - 更穩定：外部欄位變動時，只要修 DTO / mapping，不會讓整個 UI 被污染。
  - 可測試：DTO mapping / guard 很適合寫 unit test。

> 注意：Next.js 的 `middleware.ts` 並沒有官方宣告「廢棄」。這裡的「middleware」feature 是指「請不要濫用 middleware 做所有事」，在 App Router 中更常把 BFF/轉送邏輯放在 **Route Handlers**（`app/api/**/route.ts`）或 Server Actions/Server Components 的資料層中。

---

## 操作方式
- Proxy demo：
  - 打開 `/middleware?tab=proxy`
  - 由 Server Component fetch 我方 route handler：`/api/proxy/posts`
  - route handler 再轉送到 JSONPlaceholder：`https://jsonplaceholder.typicode.com/posts`

- DAL + DTO demo：
  - 打開 `/middleware?tab=dal-dto`
  - 由 DAL 直接打 JSONPlaceholder
  - DTO 只允許回傳 `{ id, title, summary }`，避免把 body 或其他欄位原樣暴露

---

## 檔案重點
- `page.tsx`
  - 讀取 `searchParams.tab`
  - 用 `<Link>` 切 tab
  - 依 tab render 不同 demo component

- `app/api/proxy/posts/route.ts`
  - 代表「BFF Proxy endpoint」
  - 示範轉送外部 API 並回傳

- `demos/_shared/dto.ts`
  - 不使用 zod，也能做簡單 runtime guard + 欄位白名單收斂
