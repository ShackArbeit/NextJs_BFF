# Middleware 示範（Next.js App Router）

## 概要
此示範以「單一頁面 + 查詢參數 tab」呈現兩種 BFF／資料治理策略的差異。

1) Proxy / BFF Route Handler（`tab=proxy`）
- 概念：前端呼叫自己的 API（`/api/proxy/posts`），伺服器轉送到外部來源（JSONPlaceholder）。
- 優點：前端只依賴一個端點，外部 API 若需要 header/token 可在伺服器集中處理。
- 風險：若只做「透明轉送」，仍可能把外部欄位、內容直接曝露給前端；建議配合 DTO／映射做資料治理。

2) DAL + DTO（`tab=dal-dto`）
- 概念：用 DAL（Data Access Layer）統一資料取得方式；DTO（Data Transfer Object）定義輸出的欄位與格式，並在回傳前做驗證／裁剪。
- 優點：
  - 安全：先定義「哪些欄位可以出站」，避免外部 API/DB 帶來過多資料。
  - 穩定：外部欄位若有變化，調整 DAL/DTO mapping 即可，不需前端同步改動。
  - 易測：DTO mapping／guard 方便寫單元測試。

> 註：這裡的 “middleware” 是 BFF 流程示範，非 Next.js `middleware.ts`。在 App Router 中，更常用 Route Handlers（`app/api/**/route.ts`）與 Server Actions/Server Components 來放置 BFF/轉接邏輯。

---

## 如何體驗
- Proxy demo：打開 `/proxy?tab=proxy`
  - Server Component fetch 自家 route handler：`/api/proxy/posts`
  - Route handler 轉送到 JSONPlaceholder：`https://jsonplaceholder.typicode.com/posts`

- DAL + DTO demo：打開 `/proxy?tab=dal-dto`
  - DAL 串接 JSONPlaceholder
  - DTO 只允許輸出 `{ id, title, summary }`，避免直接曝露 body 等欄位

---

## 檔案導覽
- `page.tsx`
  - 解析 `searchParams.tab`
  - 用 `<Link>` 切換 tab
  - 依 tab render 對應的 demo component

- `app/api/proxy/posts/route.ts`
  - 範例 BFF Proxy endpoint
  - 示範轉送外部 API 並回傳

- `demos/shared/dto.ts`
  - 簡易 runtime guard + 欄位映射，未使用 zod 以減少示範噪音
