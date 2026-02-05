# app/api — Route Handlers Playground

這個資料夾用來示範 **Next.js App Router 的 Route Handlers**（`route.ts`），把常見面試/實務觀念拆成可直接跑、可用前端 demos 呼叫的 API。

## 我做了什麼

我在 `app/api/` 底下建立了 8 組主題式子資料夾（每組對應一個 Route Handlers 觀念），並提供最小可運行的 `route.ts`：

- `http-methods/route.ts`
  - 示範可支援的 HTTP Methods：`GET/POST/PUT/PATCH/DELETE/OPTIONS/HEAD`
- `request-vs-nextrequest/route.ts`
  - 示範 `Request`（Web Standard）基本使用與 query parsing
  -（後續若要延伸，可改成 `NextRequest` 來展示 `nextUrl` / `cookies` 等 Next.js 友善 API）
- `dynamic-params/[id]/route.ts`
  - 示範 Dynamic Route 與 `params` 取得方式
- `caching/route.ts`
  - 示範 `revalidate` / `next: { revalidate }` 的 caching 行為
- `headers-cookies/route.ts`
  - 示範 `next/headers` 的 `headers()` / `cookies()`
  - 示範用 `NextResponse` 寫回 cookie
- `redirect-rewrite/route.ts`
  - 示範 `NextResponse.redirect()`（302）
  - 並說明 rewrite 多數情況更常在 Middleware 操作
- `request-body/route.ts`
  - 示範 `req.json()` 讀取 Request Body（POST）
  - 並用 jsonplaceholder 做 upstream 呼叫，避免牽涉資料庫
- `handler-vs-server-actions/route.ts`
  - 用 JSON 梳理 Route Handler vs Server Actions 的使用場景差異

## 設計原則

- 每個主題一個資料夾，命名清楚、好搜尋（也方便 demos 對應）。
- API 回傳盡量包含：
  - `concept`（主題）
  - `tip`（重點摘要）
  - `ts`（時間戳，方便觀察 caching/動態行為）
- 適度使用外部 API（jsonplaceholder）來加速展示，不依賴 DB。

## 如何測試

啟動後可直接打 API：

- `/api/http-methods`
- `/api/request-vs-nextrequest?foo=bar&count=1`
- `/api/dynamic-params/123`
- `/api/caching`
- `/api/headers-cookies`
- `/api/redirect-rewrite?mode=explain`
- `/api/request-body`（由 demo 送 POST）
- `/api/handler-vs-server-actions`
