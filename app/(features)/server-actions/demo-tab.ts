// 這個檔案是「前後端共用」的 DemoTab 定義。
// 為什麼不直接從 @prisma/client 匯入？
// - 因為 Client Component（有 'use client'）不能安全地依賴 Prisma runtime。
// - 把 enum-like 常數抽到純 TypeScript 檔案，可同時給 Server 與 Client 使用。
// as const 會把值鎖成字面值型別，而不是一般 string。
export const DemoTab = {
  can_not_do: 'can_not_do',
  rsc_boundary: 'rsc_boundary',
} as const

// 由常數物件推導 union type：
// DemoTab = 'can_not_do' | 'rsc_boundary'
export type DemoTab = (typeof DemoTab)[keyof typeof DemoTab]

// Type Guard：在執行期檢查 unknown，並在編譯期縮小型別。
// 這是 parse/searchParams 這類「外部輸入」最常見的防禦做法。
export function isDemoTab(input: unknown): input is DemoTab {
  return input === DemoTab.can_not_do || input === DemoTab.rsc_boundary
}

export function parseDemoTab(input: unknown): DemoTab | null {
  return isDemoTab(input) ? input : null
}
