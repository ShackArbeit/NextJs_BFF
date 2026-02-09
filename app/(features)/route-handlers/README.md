# app/(features)/router-handlers — Frontend Demos (searchParams tabs)

這個 feature 頁用來展示「前端如何呼叫 app/api 的 Route Handlers」，並用 `searchParams.tab` 做 tab 切換，形成一個可用於面試/作品集的互動式 Playground。

## 我做了什麼

### 1) 用 `searchParams.tab` 實作 tab 切換
- `page.tsx` 是一個 Server Component
- 透過 `searchParams.tab` 取得當前 tab key
- 用 `<Link href="/router-handlers?tab=xxx">` 切換 URL
- 用 `demoMap`（tab key -> React Component）渲染對應 demo

這樣做的好處：
- URL 具備可分享性（同事/面試官一點就看到指定 demo）
- 不需要額外 state management
- 符合 App Router 的思路（routing-driven UI）

### 2) demos/ 每個 tsx 對應一個 app/api 主題
`demos/` 底下每個檔案都是 Client Component（`"use client"`），負責：
- 以 `fetch()` 呼叫對應的 `/api/...`
- 把結果用 `<pre>` 印出來，方便觀察 HTTP status / JSON / ts
- 部分 demo 提供按鈕或 input，讓你可以改參數重跑

目前 demos 對應如下（key 與檔名一致）：
- `http_methods.tsx` → `/api/http-methods`
- `request_nextrequest.tsx` → `/api/request-vs-nextrequest?foo=bar&count=1`
- `dynamic_params.tsx` → `/api/dynamic-params/:id`
- `caching.tsx` → `/api/caching`
- `headers_cookies.tsx` → `/api/headers-cookies`
- `redirect_rewrite.tsx` → `/api/redirect-rewrite`
- `request_body.tsx` → `/api/request-body`（POST）
- `handler_vs_actions.tsx` → `/api/handler-vs-server-actions`

## 如何使用

1. 進入頁面：`/router-handlers`
2. 點 tab 或直接改網址參數：
   - `/router-handlers?tab=caching`
   - `/router-handlers?tab=dynamic_params`
3. 觀察每個 demo 的輸出結果（status、json、tip、ts）

## 擴充方式

新增一個 Route Handlers 主題時：
1. 在 `app/api/<new-topic>/route.ts` 建 API
2. 在 `demos/<new_topic>.tsx` 建 demo（fetch 你的 API）
3. 在 `page.tsx` 的 `demoMap` 與 tabs 陣列加上該項目


# Next.js App Router 筆記：Route Handlers、route.js（API）、generateStaticParams（重點整理）

## 1) Route Handlers

### 作用與定位
- Route Handlers 讓你用 **Web Request / Response APIs** 為特定路由建立自訂請求處理器。
- **僅能在 `app/` 目錄使用**，相當於 Pages Router 的 **API Routes**；通常**不需要**同時用 API Routes + Route Handlers。

### 檔案與路由規則
- 以 `route.js` / `route.ts` 定義。
- 可放在 `app/` 內任何層級（類似 `page.js`、`layout.js` 的巢狀結構）。
- **同一個 route segment 層級不能同時存在 `route.*` 與 `page.*`**（會衝突）。
- `route.*` 或 `page.*` 會接管該路由的 **所有 HTTP verbs**。

### 支援的 HTTP Methods
- 支援：`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`
- 呼叫不支援的方法會回 **405 Method Not Allowed**。

### NextRequest / NextResponse（擴充 API）
- Next.js 在原生 Request/Response 上擴充為 `NextRequest` / `NextResponse`，提供更便利的進階能力。

### 快取行為（Caching）
- **預設不快取**。
- 可選擇讓 **GET** 進入快取（例如透過 route config：`dynamic = 'force-static'`）。
- **非 GET 方法不會被快取**（即使跟已快取的 GET 放在同一個檔案）。

### 與 Cache Components 的關係
- 啟用 Cache Components 時，GET Route Handlers 的模型與一般 UI routes 類似：
  - 預設 request-time 執行
  - 若不存取動態或 runtime 資料可在 build-time prerender
  - 可用 `use cache` 讓動態資料也能納入靜態回應（需抽到 helper function）
- Prerender 會在以下情境停止並改為 request-time：
  - network requests、DB queries、async FS
  - request object properties（如 `url`, `headers`, `cookies`, `body`）
  - runtime APIs（如 `cookies()`, `headers()`, `connection()`）
  - 非決定性操作（如 `Math.random()`）

### 特殊 Route Handlers（metadata）
- `sitemap.ts`, `opengraph-image.tsx`, `icon.tsx` 等特殊檔案預設為**靜態**，
  除非使用 Dynamic APIs 或 dynamic config options。

### TypeScript：RouteContext
- 可用全域 helper `RouteContext` 為 context 參數做型別標註，取得強型別 params。
- 型別會在 `next dev` / `next build` / `next typegen` 期間產生；產生後 `RouteContext` 可直接使用（不必 import）。

---

## 2) route.js / route.ts API Reference

### Route 檔案的核心概念
- `route.ts` / `route.js` 是用來定義該路由的自訂 request handlers（Route Handlers）。

### Methods 與 OPTIONS 行為
- 支援：`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`
- 若你沒有定義 `OPTIONS`，Next.js 會自動補上並依已定義的方法設定 `Allow` header。

### 參數（Parameters）
- `request`（可選）：實際上是 `NextRequest`（Web Request 的擴充）
  - 方便存取 cookies
  - 提供解析過的 URL：`nextUrl`
- `context`（可選）：
  - `params`：**Promise**，解析為當前動態路由參數物件

### 常見能力範例（概念層）
- Cookies：可透過 `next/headers` 的 `cookies` 讀/寫/刪，或用 `Set-Cookie` 回應 header。
- Headers：可透過 `next/headers` 的 `headers` 讀取；若要設定需回傳新的 Response。
- Revalidate：可用 route segment config `revalidate` 來重驗證快取資料。
- Redirect：可在 handler 中使用 `redirect()`。
- Dynamic Segments：Route Handlers 可使用動態路由區段來產生動態 API 行為。
- URL Query Parameters：`NextRequest` 提供 `nextUrl.searchParams` 方便處理 query string。
- Streaming：常見於 LLM（如 OpenAI）生成內容；也可直接用底層 Web Streams API。
- Request Body：可用標準 Web API（如 `request.json()`）讀取 body。
- FormData：可用 `request.formData()` 讀取（資料多為字串；可搭配驗證工具做型別化）。
- CORS：用標準 response headers 設定。
- Webhooks：可用 Route Handler 接第三方 webhook；不同於 Pages API Routes，通常不需要 bodyParser 額外設定。
- Non-UI Responses：可回傳非 UI 內容（如 xml）；`sitemap.xml`、`robots.txt`、icons、OG images 有內建支援。
- Segment Config Options：Route Handlers 支援與 pages/layouts 相同的 segment config（如 `dynamic`, `revalidate`, `runtime` 等）。

### 版本變更（Version History）
- v15.0.0-RC：`context.params` 改為 Promise（提供 codemod）
- v15.0.0-RC：GET handlers 預設快取從 static 改為 dynamic
- v13.2.0：Route Handlers 引入

---
## 3) generateStaticParams

### 目的
- 搭配動態路由區段，讓路由在 **build-time** 靜態產生，而非 request-time 才按需產生。

### 可用範圍
- Pages：`page.tsx` / `page.js`
- Layouts：`layout.tsx` / `layout.js`
- Route Handlers：`route.ts` / `route.js`

### 核心行為
- 回傳一個「物件陣列」，每個物件代表一條路由要填入的動態 params。
- 可支援：
  - 單一動態區段（例如 `[id]`）
  - 多段動態區段（例如 `[category]/[product]`）
  - catch-all（例如 `[...slug]`）

### Good to know（重要規則）
- 可用 `dynamicParams` 控制：造訪未由 `generateStaticParams` 產生的動態路徑時如何處理（例如是否 404）。
- 要在 runtime 進行 revalidate（ISR）時：
  - 需回傳空陣列，或使用 `dynamic = 'force-static'`（依文件描述）
- `next dev`：導覽到路由時會呼叫 `generateStaticParams`
- `next build`：在對應 Layouts/Pages 產生前會先執行
- ISR revalidation 期間：`generateStaticParams` **不會再被呼叫**
- 在 Pages Router 中，它取代 `getStaticPaths`

### With Cache Components（動態路由）
- 使用 Cache Components 時，`generateStaticParams` **必須至少回傳一個 param**
  - 回傳空陣列會造成 build error
  - 目的：讓 Cache Components 可在 build-time 驗證路由不會在 runtime 不當存取 `cookies()`, `headers()`, `searchParams`
- 若 build-time 不知道真實 params，可回傳 placeholder param 做驗證，但可能降低驗證效果並導致 runtime error（文件提醒）。

### With Route Handlers（靜態 API 回應）
- 可用 `generateStaticParams` 在 build-time 靜態產生特定 params 的 API 回應。
- 啟用 Cache Components 時可搭配 `use cache` 取得更好的快取效果（通常放在 helper function）。

### 多個動態區段的 params 產生策略
- 你可以為當前 layout/page **上方** 的動態區段產生 params，但不能為下方產生。
- 兩種做法：
  1. **Bottom-up**：在最底層（child segment）一次產生多個動態區段的 params。
  2. **Top-down**：先由父層產生 parent params，再讓子層的 `generateStaticParams` 針對每個 parent params 執行一次，用父層 params 推導子層 params。
- `generateStaticParams` 的參數 `params` 可同步存取，且只包含父層區段 params。
- 型別補全可搭配 TS `Awaited` 與 Page/Layout Props helper。

### 快取與 memoization 提醒
- `fetch` 對相同資料的請求會在所有 `generate*` 函式、Layouts、Pages、Server Components 之間自動 memoize。
- 若無法使用 `fetch`，可使用 React cache。

---
