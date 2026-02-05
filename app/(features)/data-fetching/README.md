# Data Fetching（Next.js 核心觀念展示）

此區塊用來展示 Next.js App Router 中
**所有重要的 Data Fetching 核心模式**，
並刻意集中在「單一路由 + query 切換」的設計。

---

## 如何瀏覽

路由入口：

/data-fetching

使用 query 參數切換不同示範：

/data-fetching?tab=fetch-in-server

---

## 運作方式說明

- `page.tsx`
  - 透過 `searchParams.tab` 判斷目前顯示哪一個 demo
  - 使用 `<Link>` 切換，不使用 client router

- `/demos`
  - 每一個檔案只負責「一個核心觀念」
  - 不處理路由、不處理 UI 狀態

---

## 為什麼這樣設計？

- 可快速掃描所有概念
- URL 即為狀態（Shareable / Debug-friendly）
- 清楚區分：
  - Server vs Client
  - Cache vs No Cache
  - Blocking vs Streaming

---

## 使用的資料來源

所有示範皆使用公開 API：

https://jsonplaceholder.typicode.com

不涉及資料庫或 ORM 設定，專注於 Next.js 行為本身。

# 以下為專案的說明圖

Data Fetching（App Router）
│
├─ Server Fetching
│  ├─ Server Component
│  │  ├─ fetch / ORM
│  │  ├─ 不需要 API Route
│  │  └─ 不需要 useEffect
│  │
│  └─ Cache 行為
│     ├─ force-cache
│     └─ cache(async fn)
│
├─ Client Fetching
│  ├─ 'use client'
│  ├─ useEffect / SWR / React Query
│  ├─ loading / error state
│  └─ 適合互動性高的 UI
│
├─ Server + Client 混合
│  ├─ Server 建立 Promise（不 await）
│  ├─ Promise 傳給 Client
│  ├─ Client 使用 use()
│  └─ 外層 Suspense
│
├─ Streaming（HTML 串流）
│  ├─ 快的內容先 render
│  ├─ 慢的包在 Suspense
│  ├─ Skeleton / fallback
│  └─ 提升 TTFB 與 UX
│
└─ Cache Components（新觀念）
   ├─ Static / Dynamic 不再綁定 route
   ├─ Cache 行為下放到 component
   ├─ cache + Suspense 控制共用
   └─ 明確定義「何時渲染、是否共用」
