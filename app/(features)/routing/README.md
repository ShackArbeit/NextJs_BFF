# Routing Feature Demos (Next.js App Router)

本資料夾示範 Next.js App Router 的兩個高階路由能力：

1) Parallel Routes
- 透過 `@slot` 同時渲染多個區塊（例如 feed + detail）。
- 代表性路徑：`/routing/demos/parallel`

2) Intercepting Routes
- 透過 `(.)` / `(..)` 在某個父層「攔截」子路由，常用於 Modal / Drawer。
- 代表性路徑：
  - Full page: `/routing/demos/photos/[id]`
  - Intercepted modal: 從 `/routing` 或 `/routing/demos/photos` 點進 detail 時，會在 `/routing` 上以 modal 呈現（由 `routing/@modal/(.)...` 實作）

---

## 為什麼 routing/page.tsx 用 searchParams(tab)？
`/routing?page.tsx` 主要是「導覽 + 說明卡」：
- 使用 `searchParams.tab` 決定目前展示哪一組示範入口與說明
- 但真正的 Parallel / Intercepting demo 仍透過「路由結構」展示（才符合 Next.js 的原理）

例如：
- `/routing?tab=parallel`：顯示 Parallel Routes 的說明與入口
- `/routing?tab=intercepting`：顯示 Intercepting Routes 的說明與入口
- `/routing?tab=iter`：顯示兩者結合的入口

---

## 使用的外部免費 API
- Picsum（圖片）
  - List: https://picsum.photos/v2/list?page=1&limit=12
  - Image: https://picsum.photos/id/{id}/800/500
- JSONPlaceholder（文字內容）
  - Posts: https://jsonplaceholder.typicode.com/posts?_limit=8

---

## 執行步驟
1. 建立本 README 所列檔案結構
2. 完成 `/routing`：tab 導覽 + 卡片連結
3. 完成 `/routing/demos/parallel`：@feed / @detail slots
4. 完成 `/routing/demos/photos`：圖片列表與 detail
5. 完成 `routing/@modal/(.)demos/photos/[id]`：攔截 detail 為 modal
6. 完成 `/routing/demos/iter-with-parallel`：同一頁面有 list + modal（Parallel + Intercepting）

---

## 測試建議
- 直接開 `/routing`
- 切換 tab：
  - `/routing?tab=parallel`
  - `/routing?tab=intercepting`
  - `/routing?tab=iter`
- 點圖片進 detail：
  - 從 `/routing` 進去：應該出現 modal（攔截）
  - 直接貼 `/routing/demos/photos/10`：應該是 full page
