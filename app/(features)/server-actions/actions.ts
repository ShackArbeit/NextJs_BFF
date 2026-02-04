'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/src/lib/prisma'
import { isDemoTab, type DemoTab } from './demo-tab'

/**
 * Server Action 回傳格式（前後端共同契約）
 * - ok=true：代表這次動作成功，可附帶成功訊息。
 * - ok=false：代表失敗，可附帶整體訊息與欄位級錯誤。
 *
 * 為什麼要統一格式？
 * 1) Client Component 可以用同一套 UI 呈現成功/失敗。
 * 2) 減少每個 action 自由發揮，避免欄位名稱不一致。
 * 3) 對 useActionState 來說，state shape 穩定會更好維護。
 */
export type ActionResult =
  | { ok: true; message?: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string[]> }

const ok = (message?: string): ActionResult => ({ ok: true, message })
const fail = (message: string, fieldErrors?: Record<string, string[]>): ActionResult => ({
  ok: false,
  message,
  fieldErrors,
})

/**
 * FormData 的值型別是 FormDataEntryValue | null（可能是 string 或 File）。
 * 這裡只接受字串，其他型別一律視為空字串，避免後續 trim 報錯。
 */
function toStr(v: FormDataEntryValue | null): string {
  return typeof v === 'string' ? v : ''
}

/**
 * 累積欄位錯誤：
 * 同一欄位可放多則規則訊息（例如「必填」+「長度不足」）。
 */
function addError(errors: Record<string, string[]>, field: string, msg: string) {
  errors[field] ??= []
  errors[field].push(msg)
}

/**
 * 將未知輸入（通常是 URL query 或 FormData）轉成受控 union type。
 * 這是資料入口的第一道防線，避免錯誤值直接流進 DB 查詢。
 */
function parseDemoTab(input: unknown): DemoTab | null {
  return isDemoTab(input) ? input : null
}

/**
 * 建立 Note 的 Server Action
 *
 * 為什麼函式簽名是 (_prevState, formData)？
 * - 因為 useActionState(action, initialState) 會在呼叫 action 時，
 *   自動把「上一輪 state」當第一參數帶入。
 * - 第二個參數才是表單送出的 FormData。
 */
export async function createDemoNote(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const tabRaw = formData.get('tab')
  const title = toStr(formData.get('title')).trim()
  const content = toStr(formData.get('content')).trim()

  const fieldErrors: Record<string, string[]> = {}
  const tab = parseDemoTab(tabRaw)

  if (!tab) addError(fieldErrors, 'tab', 'tab 無效')

  if (!title) addError(fieldErrors, 'title', '標題為必填')
  else {
    if (title.length < 3) addError(fieldErrors, 'title', '標題至少 3 個字')
    if (title.length > 80) addError(fieldErrors, 'title', '標題最多 80 個字')
  }

  if (!content) addError(fieldErrors, 'content', '內容為必填')
  else {
    if (content.length < 10) addError(fieldErrors, 'content', '內容至少 10 個字')
    if (content.length > 500) addError(fieldErrors, 'content', '內容最多 500 個字')
  }

  if (Object.keys(fieldErrors).length > 0) {
    return fail('表單驗證失敗，請修正後重試', fieldErrors)
  }

  try {
    await prisma.demoNote.create({
      data: { tab: tab as DemoTab, title, content },
    })

    /**
     * revalidatePath 原理：
     * - RSC / App Router 會快取渲染結果與資料讀取。
     * - Action 成功後呼叫 revalidatePath，可讓指定路徑快取失效。
     * - 下一次 render 時，該路徑就會重新讀 DB 拿到最新資料。
     */
    revalidatePath('/server-actions')
    return ok('新增 Note 成功')
  } catch {
    return fail('新增 Note 失敗，請稍後再試')
  }
}

/**
 * 建立 Comment 的 Server Action
 * 流程與 createDemoNote 類似，但多做了「父層 Note 是否存在」檢查。
 */
export async function createDemoComment(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const noteId = toStr(formData.get('noteId')).trim()
  const author = toStr(formData.get('author')).trim()
  const message = toStr(formData.get('message')).trim()

  const fieldErrors: Record<string, string[]> = {}

  if (!noteId) addError(fieldErrors, 'noteId', 'noteId 為必填')

  const finalAuthor = author.length ? author : 'anonymous'
  if (finalAuthor.length > 30) addError(fieldErrors, 'author', '作者名稱最多 30 個字')

  if (!message) addError(fieldErrors, 'message', '留言為必填')
  else {
    if (message.length < 2) addError(fieldErrors, 'message', '留言至少 2 個字')
    if (message.length > 200) addError(fieldErrors, 'message', '留言最多 200 個字')
  }

  if (Object.keys(fieldErrors).length > 0) {
    return fail('表單驗證失敗，請修正後重試', fieldErrors)
  }

  try {
    // 防止產生「孤兒 comment」（指向不存在的 note）。
    const exists = await prisma.demoNote.findUnique({ where: { id: noteId } })
    if (!exists) return fail('找不到對應的 Note，無法新增留言')

    await prisma.demoComment.create({
      data: { noteId, author: finalAuthor, message },
    })

    revalidatePath('/server-actions')
    return ok('新增留言成功')
  } catch {
    return fail('新增留言失敗，請稍後再試')
  }
}

/**
 * 刪除 Note 的 Server Action
 * 在 Mongo/Prisma 這類情境下，常見做法是先刪子資料（comments）再刪父資料（note）。
 */
export async function deleteDemoNote(noteId: string): Promise<ActionResult> {
  const id = (noteId ?? '').trim()
  if (!id) return fail('noteId 不可為空')

  try {
    await prisma.demoComment.deleteMany({ where: { noteId: id } })
    await prisma.demoNote.delete({ where: { id } })

    revalidatePath('/server-actions')
    return ok('刪除 Note 成功')
  } catch {
    return fail('刪除 Note 失敗，請稍後再試')
  }
}

/**
 * 切換置頂狀態（pin/unpin）的 Server Action
 */
export async function togglePin(noteId: string): Promise<ActionResult> {
  const id = (noteId ?? '').trim()
  if (!id) return fail('noteId 不可為空')

  try {
    const found = await prisma.demoNote.findUnique({ where: { id } })
    if (!found) return fail('找不到對應的 Note')

    await prisma.demoNote.update({
      where: { id },
      data: { isPinned: !found.isPinned },
    })

    revalidatePath('/server-actions')
    return ok(!found.isPinned ? '已設為置頂' : '已取消置頂')
  } catch {
    return fail('更新置頂狀態失敗，請稍後再試')
  }
}
