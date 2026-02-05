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
