# RSC vs Client（Tab Demos）

這個 feature 用 `searchParams`（query string）控制 tab，並對應 `demos/` 的檔案名稱做切換：

- `/rsc-vs-client?tab=whatis_RSC_Payload`
- `/rsc-vs-client?tab=stream_fromServer_to_Client`
- `/rsc-vs-client?tab=Server_with_Client`
- `/rsc-vs-client?tab=data_fromServer_to_Client`

---

## 檔案架構（含 demos 功用）

```txt
app/
└─ (features)/
   └─ rsc-vs-client/
      ├─ README.md
      ├─ page.tsx
      │  ├─ 讀取 searchParams.tab（用檔名當 tab 值）
      │  ├─ 用 <Link> 建立 tabs，點擊後切換 query string
      │  └─ 依 tab 動態渲染 demos/ 對應元件
      └─ demos/
         ├─ whatis_RSC_Payload.tsx
         │  ├─ 介紹 RSC Payload 是什麼
         │  ├─ Server Component / Client Component 各自扮演的角色
         │  └─ 用文字 + 簡易圖表（概念層）
         ├─ stream_fromServer_to_Client.tsx
         │  ├─ 示範「Server 先拿到 Promise」，Client 用 React `use()` 直接消化
         │  ├─ 用 Suspense 做 streaming 體感（先看到骨架，再看到資料）
         │  └─ 重點：不是等全部資料回來才 render（體驗層）
         ├─ Server_with_Client.tsx
         │  ├─ 示範 Server / Client 元件交錯組合（composition）
         │  ├─ 規則：Client 不能直接 import Server
         │  └─ 正確做法：Server-rendered UI 用 children / props slot 傳入 Client
         └─ data_fromServer_to_Client.tsx
            ├─ Server fetch 外部 API（JSONPlaceholder）
            ├─ 把 JSON-safe 的資料（可序列化）用 props 傳給 Client
            └─ 點出序列化邊界（Date/function/class 都不行）

# Next.js Server & Client Components Guide

本文件整理 Next.js 中 **Server Components** 與 **Client Components** 的核心觀念、使用時機與實務模式，適用於 **App Router（app/）** 架構。

---

## 一、基本概念

### 預設行為
- `app/` 底下的 **layouts** 與 **pages** 預設都是 **Server Components**
- Server Components 可以：
  - 在伺服器端抓資料
  - 使用環境變數與 API Key
  - 減少送到瀏覽器的 JavaScript
  - 串流（stream）HTML 到客戶端

### Client Components 的角色
- 當需要互動或瀏覽器 API 時，才使用 Client Components
- 透過 `"use client"` 宣告

---

## 二、何時使用哪一種 Component？

### 使用 Client Components 的時機
當你需要以下功能時：

- React state 與事件處理  
  - `useState`
  - `onClick`, `onChange`
- React lifecycle hooks  
  - `useEffect`
- 瀏覽器專屬 API  
  - `window`
  - `localStorage`
  - `navigator.geolocation`
- 自訂 Hooks（Custom Hooks）

---

### 使用 Server Components 的時機
當你需要：

- 從資料庫或後端 API 抓資料
- 使用 API keys、tokens、secrets（不暴露給前端）
- 減少 client bundle 大小
- 改善 First Contentful Paint（FCP）
- 逐步串流內容（Streaming）

---

## 三、Server 與 Client 如何協作（核心流程）

### Server Side
- Server Components 會被渲染成 **RSC Payload**
- RSC Payload 包含：
  - Server Components 的渲染結果
  - Client Components 的佔位資訊
  - 傳遞給 Client Components 的 props

---

### Client Side（首次載入）
1. HTML 立即顯示（尚未互動）
2. RSC Payload 對齊 Server / Client component tree
3. JavaScript 對 Client Components 進行 **Hydration**

---

### Hydration 是什麼？
> 將事件處理器掛到既有的 HTML 上，使畫面變成可互動

---

### 後續導覽（Client Navigation）
- 只下載 RSC Payload（已快取）
- Client Components 完全在瀏覽器端重新渲染
- 不再使用 server-rendered HTML

---

## 四、`"use client"` 的重要規則

```ts
'use client'
