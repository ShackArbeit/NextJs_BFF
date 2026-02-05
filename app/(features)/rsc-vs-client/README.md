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
