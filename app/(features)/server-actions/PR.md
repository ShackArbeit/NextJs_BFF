# 目的
展示 NextJs 16 中 Server Action、useActionState、useTransition 關聯及簡單範例

# 使用的資料庫 => MongoDB Atlas 
## 使用 Mongoose 與 NextJs 連線
### 連線方式在 app/lib/mongoose.ts

## 結構 
## 根目錄是 page.tsx 
## 與 page.tsx 同一層有一個 (demos) 資料夾，裡面有以下的當案
## 與 page.tsx 同一層有一個 action.ts 檔案，是定義各 server action function 的地方
### 在 app/models 裡面有 CityPost.ts 、LanguagePost.ts 、MarrAgePost.ts 、SeasonPost.ts、TaaCoffeePost.ts 等五個檔案，是定義資料庫的結構

### 裡面有以下檔案
### A.action_in_server_coponent.tsx
* **直接在 server component 使用 server action**
* 一個留言板讓多位使用者可以討論自己最喜歡 "台灣的哪一個城市"？
* 欄位：輸入使用者姓名、輸入喜歡哪一個城市、為什麼喜歡這個城市。

### B.action_in_client_coponent.tsx
* **在 Client Component 使用 server action**
* 一個留言板讓多位使用者可以討論覺得 "幾歲結婚最適合"？
* 欄位：輸入使用者姓名、輸入幾歲最適合、為什麼這個歲數最適合。

### C.client_actionstate_form.tsx
* **展示使用 useActionState 的效果**
* 另一個留言板讓多位使用者可以討論覺得 "四季中哪一個季節最喜歡"？
* 欄位：輸入使用者姓名、輸入最喜歡的季節、為什麼這季節最喜歡。

### D.client_transition_button.tsx
* **展示使用 useTransition 的效果**
* 另一個留言板讓多位使用者可以討論覺得 "覺得哪一個語言最難"？
* 欄位：輸入使用者姓名、輸入覺得最難的語言、為什麼這語言最難。

### E.client_actionstate_with_transition.tsx
* **展示使用 useActionState+useTransition 的效果**
* 另一個留言板讓多位使用者可以討論覺得 "喝茶比較健康還是咖啡"？
* 欄位：輸入使用者姓名、輸入覺得是茶或是咖啡、為什麼這最健康。

## 各分頁調用方式
### 在 page.tsx 中使用 searchParams 方向，調用 (demos) 資料夾中的各 .tsx 檔案
* 例如當路由是 `/server-action?tab="action_in_server_coponent"` 就是將 (demos) 中的 `action_in_server_coponent.tsx` 內容呈現。

## 共用 Form 結構

### BoardShell.tsx：共用「頁面外框 / 版型容器」
* **功用**：提供所有留言板共用的 UI 外框（layout）。
* **統一**：標題、說明文字、寬度、間距、卡片樣式等。
* **目的**：避免五個頁面重複寫同一套版面與樣式，讓每個 board page 只要把「內容」塞進去即可。
* **通常會放什麼**：title、description（可選）、children（表單 + 列表）。

### BoardForm.client.tsx：共用「留言表單」元件（Client Component）
* **功用**：提供一個可重用的表單，含三個欄位：username, answer, reason。
* **特性**：因為要示範 useActionState / useTransition，這個表單需要能在 Client 端顯示 pending / error / success，送出時可搭配 hooks。
* **Props**：onSubmitAction 或 action (Server Action function)、placeholder / label、(可選) 初始 state / 提示訊息。
* **目的**：五個留言板用同一個 form 版型，只換題目與 action。

### BoardList.server.tsx：共用「留言列表」元件（Server Component）
* **功用**：顯示某個留言板的所有留言（從 MongoDB 讀出來）。
* **特性**：可以直接 await list 函式取得資料，渲染不需額外 client-side fetch。配合 actions 裡的 revalidatePath()，新增/刪除後列表能更新。
* **內容**：每筆留言顯示使用者、answer、reason、createdAt。
* **刪除**：每筆旁邊可以放 `<form action={softDelete...}>` 的刪除按鈕。
* **目的**：讓資料讀取與列表渲染保持在 server side，簡單又穩。

## 🔗 三者怎麼搭配在一個 board page（概念）
1. **BoardShell** 包住整頁外框。
2. **BoardForm.client** 在上方讓人留言。
3. **BoardList.server** 在下方顯示留言列表。

## 補充：action.ts 中刪除留言的設定
**Soft delete**
* 不真的刪 DB，而是：schema 增加 `isDeleted: boolean`、`deletedAt`。
* 刪除 action 只更新旗標。
* list 時使用 `find({ isDeleted: false })`。
* ✅ 可復原、可追蹤。
* ✅ 即使被亂刪也救得回來。
* ❌ 稍微多一點 schema 欄位。


## Codex 你需要做什麼呢 ?
### 1. 幫我完成 action_in_server_coponent.tsx、action_in_client_coponent.tsx、 client_actionstate_form.tsx、client_transition_button.tsx、client_actionstate_with_transition.tsx 的內容

### 2. 參考 CityPost.ts 的內容，幫我完成 LanguagePost.ts 、MarrAgePost.ts 、SeasonPost.ts、TaaCoffeePost.ts 的內容，並幫我且改這些檔案在 app/server-actions/action.ts 中的引入路徑

### 3. 幫我完成 app/server-actions/_component 中的 BoardShell.tsx 、BoardForm.client.tsx  &  BoardList.server.tsx 的內容