# Server Actions 模組說明

本資料夾路徑：`app/(features)/server-actions`

這個模組示範的是：
- App Router 以 **Server Component 為預設**
- 互動邊界放在 **Client Component**
- 透過 **Server Actions** 直接處理表單提交、資料驗證、寫入 DB、revalidate

---

## 檔案總覽與相互關係

### 1) 頁面入口與 tab 路由
- `page.tsx`
  - 模組入口頁。
  - 讀取 `searchParams.tab`，決定顯示哪個 demo。
  - 會渲染：
    - `demos/can_not_do.demo.tsx`
    - `demos/rsc_boundary.demo.tsx`
  - 使用 `demo-tab.ts` 的型別與 parser，避免 tab 字串亂入。

- `demo-tab.ts`
  - 定義 tab 常數與型別：`can_not_do`、`rsc_boundary`。
  - 提供 `isDemoTab`（type guard）與 `parseDemoTab`（解析/防呆）。
  - 被 `page.tsx` 與 `actions.ts` 共用，確保 UI 與 action 的 tab 規則一致。

### 2) Server Actions 核心
- `actions.ts`
  - `'use server'` 檔案，集中所有 server action。
  - 匯出 action：
    - `createDemoNote`
    - `createDemoComment`
    - `deleteDemoNote`
    - `togglePin`
  - 主要責任：
    1. 解析 `FormData`
    2. 驗證欄位
    3. 呼叫 Prisma 寫入/更新/刪除
    4. `revalidatePath('/server-actions')` 讓頁面重新取得最新資料
  - 定義 `ActionResult`（`ok/message/fieldErrors`）作為 client 顯示回饋的標準格式。

### 3) Demo 頁（Server Component）
- `demos/can_not_do.demo.tsx`
  - 主題：Server Component 不能做哪些事（事件處理、state/effect、瀏覽器 API）。
  - 在 server 端用 Prisma 讀取 notes/comments（`tab = can_not_do`）。
  - 內嵌 client 邊界：
    - `CreateNoteForm`
    - `CreateCommentForm`
    - `NoteActions`

- `demos/rsc_boundary.demo.tsx`
  - 主題：RSC boundary（Server default, Client when needed）。
  - 結構與資料流同上，但資料篩選 `tab = rsc_boundary`。
  - 重點在說明：資料展示由 server 負責，互動由 client 邊界承接。

### 4) UI 互動元件（Client Component）
- `ui/CreateNoteForm.tsx`
  - `'use client'`。
  - 用 `useActionState(createDemoNote, initialState)` 綁定 `<form action>`。
  - 負責送出新 note，顯示欄位錯誤與成功/失敗訊息。

- `ui/CreateCommentForm.tsx`
  - `'use client'`。
  - 用 `useActionState(createDemoComment, initialState)` 送出 comment。
  - 透過 hidden input 帶 `noteId` 給 server action。

- `ui/NoteActions.tsx`
  - `'use client'`。
  - 用 `useTransition` 觸發非阻塞互動。
  - 按鈕觸發：
    - `togglePin(noteId)`
    - `deleteDemoNote(noteId)`

---

## 實際資料流（從 UI 到 DB 再回畫面）

1. 使用者在 `CreateNoteForm` / `CreateCommentForm` / `NoteActions` 互動。  
2. Client component 呼叫 `actions.ts` 的 server action。  
3. Server action 驗證資料，透過 Prisma 寫入/更新/刪除。  
4. Server action 執行 `revalidatePath('/server-actions')`。  
5. `can_not_do.demo.tsx` 或 `rsc_boundary.demo.tsx` 重新在 server 端查詢資料並 render。  
6. 使用者看到更新後 UI。

---

## 設計重點（給使用者/面試可講）

- **型別一致性**：`demo-tab.ts` 同時提供 UI 與 action 使用，避免字串漂移。  
- **責任分離**：Server component 負責資料查詢與渲染；Client component 只負責互動。  
- **Action 標準化**：`ActionResult` 統一回傳格式，讓錯誤呈現穩定。  
- **資料新鮮度**：mutation 後用 `revalidatePath` 觸發重新取得資料，避免畫面舊資料。
