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


# Next.js Fetching Data & Streaming

本文件整理 Next.js（App Router）中 **Fetching Data** 與 **Streaming** 的核心概念，  
包含 Server / Client Components、快取策略、資料取得模式與 UX 設計重點，  
適合用於 **專案架構說明** 與 **面試複習**。

---

## 📌 Overview

Next.js 在 App Router 中，資料取得主要以 **Server Components 為核心**，  
搭配 **快取（cache）**、**去重（deduplication）** 與 **串流（streaming）**，  
達成高效能與良好使用者體驗。

---

## 🧩 Server Components

### Fetching Data

- 使用 `async / await`
- 可直接使用：
  - `fetch` API
  - ORM / Database
  - Node.js API（如 `fs`）
- 僅在 Server 執行，不會被 bundle 到 Client

### fetch API 特性

- `fetch` response 預設不快取
- Next.js 會：
  - pre-render route
  - cache 最終 HTML output
- 使用 `cache: 'no-store'` 可強制動態渲染

### ORM / Database

- 僅能在 Server Components 使用
- 安全存取資料庫
- 適合搭配 React `cache()` 進行結果快取

---

## 🧠 Deduplication & Cache

### Request Memoization

- 同一 render request 中：
  - 相同 URL + options 的 GET / HEAD 會合併
- Scope：**單次 request**

### Data Cache（Next.js）

- 透過 `cache: 'force-cache'`
- 可跨 request 共用資料

### React `cache()`

- 適用於：
  - ORM
  - Database
  - 非 fetch 資料來源
- 用來避免重複 DB Query

---

## 🔁 Data Fetching Patterns

### Sequential Fetching（依序）

- 後一個請求依賴前一個結果
- 第一個 request 會 block 後續所有流程
- 常見於：
  - ID / Token 依賴情境

### Parallel Fetching（平行）

- 同時啟動多個 request
- 使用 `Promise.all`
- 提升效能
- 注意：
  - 任一失敗 → 全部失敗（可改用 `Promise.allSettled`）

### Preloading（預先載入）

- 提前呼叫 fetch（不 await）
- 常搭配條件 render
- 透過 `void fetch()` 啟動請求
- 在真正 render 前資料已準備好

---

## 💻 Client Components

### React `use()` Hook（Streaming）

- Server Component：
  - fetch data
  - 傳 Promise 給 Client
- Client Component：
  - 使用 `use(promise)` 讀取
- **必須搭配 `<Suspense>`**

### Community Libraries

- SWR
- React Query
- 特點：
  - Client-side cache
  - Revalidation
  - 狀態管理（loading / error）

---

## 🌊 Streaming

### 為什麼需要 Streaming？

- 避免慢 API 阻塞整頁渲染
- 提升：
  - TTFB
  - Perceived performance
  - 使用者體驗

---

## 🧱 Streaming 實作方式

### `loading.js`（Route Level）

- 適用於：
  - page
  - layout
- 特點：
  - 自動包 `<Suspense>`
  - 控制整個 route 的 loading 狀態
- 使用者導航時立即顯示 loading UI

### `<Suspense>`（Component Level）

- 精細控制哪些區塊延後顯示
- `fallback` 作為 loading UI
- 常用於：
  - Lists
  - Charts
  - Slow API Components

---

## 🎨 UX Considerations

- 設計有意義的 loading state
  - Skeleton
  - Spinner
  - 部分真實內容（標題、封面）
- 避免空白畫面
- 開發階段可使用：
  - React Devtools 檢查 Suspense / loading 狀態

---

## 🧠 Mental Model Summary

> **Server 負責資料與效能，Client 負責互動與體驗**  
> **Streaming 是為了解決「慢資料拖垮整頁」的問題**

---

## 📎 Keywords（面試關鍵字）

- Server Components
- Client Components
- fetch cache
- React cache()
- Request memoization
- Streaming
- Suspense
- loading.js
- Parallel fetching
- Preloading

---

## ✅ 適用場景

- Next.js App Router 專案
- 中大型系統效能優化
- Next.js 面試架構說明
- 技術文件 / 教學 Repo

---
