'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/src/lib/prisma'
import { DemoTab } from '@prisma/client'

/** -----------------------------
 * Types
 * ------------------------------ */
export type ActionResult =
  | { ok: true; message?: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string[]> }

const ok = (message?: string): ActionResult => ({ ok: true, message })
const fail = (message: string, fieldErrors?: Record<string, string[]>): ActionResult => ({
  ok: false,
  message,
  fieldErrors,
})

/** -----------------------------
 * Helpers
 * ------------------------------ */
function toStr(v: FormDataEntryValue | null): string {
  return typeof v === 'string' ? v : ''
}

function addError(
  errors: Record<string, string[]>,
  field: string,
  msg: string
) {
  errors[field] ??= []
  errors[field].push(msg)
}

export async function parseDemoTab(input: unknown): Promise<DemoTab | null> {
  if (input === DemoTab.can_not_do) return DemoTab.can_not_do
  if (input === DemoTab.rsc_boundary) return DemoTab.rsc_boundary
  return null
}

/** -----------------------------
 * Actions
 * ------------------------------ */

// Create Note: useFormState 會把 prevState 傳進來（我們不一定需要，但保留介面）
export async function createDemoNote(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const tabRaw = formData.get('tab')
  const title = toStr(formData.get('title')).trim()
  const content = toStr(formData.get('content')).trim()

  const fieldErrors: Record<string, string[]> = {}

  const tab = await parseDemoTab(tabRaw)
  if (!tab) addError(fieldErrors, 'tab', 'tab 不合法')

  if (!title) addError(fieldErrors, 'title', '標題必填')
  else {
    if (title.length < 3) addError(fieldErrors, 'title', '標題至少 3 個字')
    if (title.length > 80) addError(fieldErrors, 'title', '標題最多 80 個字')
  }

  if (!content) addError(fieldErrors, 'content', '內容必填')
  else {
    if (content.length < 10) addError(fieldErrors, 'content', '內容至少 10 個字')
    if (content.length > 500) addError(fieldErrors, 'content', '內容最多 500 個字')
  }

  if (Object.keys(fieldErrors).length > 0) {
    return fail('欄位驗證失敗，請檢查輸入。', fieldErrors)
  }

  try {
    await prisma.demoNote.create({
      data: { tab: tab!, title, content },
    })

    // 同一路由用 searchParams 切 tab：revalidate 整個路由即可
    revalidatePath('/server-actions')
    return ok('已新增 Note ✅')
  } catch {
    return fail('新增失敗：資料庫操作錯誤。')
  }
}

export async function createDemoComment(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const noteId = toStr(formData.get('noteId')).trim()
  const author = toStr(formData.get('author')).trim()
  const message = toStr(formData.get('message')).trim()

  const fieldErrors: Record<string, string[]> = {}

  if (!noteId) addError(fieldErrors, 'noteId', 'noteId 必填')

  const finalAuthor = author.length ? author : 'anonymous'
  if (finalAuthor.length > 30) addError(fieldErrors, 'author', '作者最多 30 個字')

  if (!message) addError(fieldErrors, 'message', '留言必填')
  else {
    if (message.length < 2) addError(fieldErrors, 'message', '留言至少 2 個字')
    if (message.length > 200) addError(fieldErrors, 'message', '留言最多 200 個字')
  }

  if (Object.keys(fieldErrors).length > 0) {
    return fail('欄位驗證失敗，請檢查輸入。', fieldErrors)
  }

  try {
    // 可選：先確認 note 存在（更像真實系統）
    const exists = await prisma.demoNote.findUnique({ where: { id: noteId } })
    if (!exists) return fail('新增留言失敗：找不到對應的 Note。')

    await prisma.demoComment.create({
      data: { noteId, author: finalAuthor, message },
    })

    revalidatePath('/server-actions')
    return ok('已新增留言 💬')
  } catch {
    return fail('新增留言失敗：資料庫操作錯誤。')
  }
}

export async function deleteDemoNote(noteId: string): Promise<ActionResult> {
  const id = (noteId ?? '').trim()
  if (!id) return fail('noteId 不可為空')

  try {
    // Mongo + Prisma：不會自動 cascade → 手動刪 children 再刪 parent
    await prisma.demoComment.deleteMany({ where: { noteId: id } })
    await prisma.demoNote.delete({ where: { id } })

    revalidatePath('/server-actions')
    return ok('已刪除 Note 🗑️')
  } catch {
    return fail('刪除失敗：資料庫操作錯誤。')
  }
}

export async function togglePin(noteId: string): Promise<ActionResult> {
  const id = (noteId ?? '').trim()
  if (!id) return fail('noteId 不可為空')

  try {
    const found = await prisma.demoNote.findUnique({ where: { id } })
    if (!found) return fail('找不到該 Note')

    await prisma.demoNote.update({
      where: { id },
      data: { isPinned: !found.isPinned },
    })

    revalidatePath('/server-actions')
    return ok(!found.isPinned ? '已置頂 📌' : '已取消置頂')
  } catch {
    return fail('更新失敗：資料庫操作錯誤。')
  }
}
