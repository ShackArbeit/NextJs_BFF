import { PrismaClient, DemoTab } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Start seeding...')

  await prisma.demoComment.deleteMany()
  await prisma.demoNote.deleteMany()

  /* -----------------------------
   * tab: can_not_do
   * ----------------------------- */

  await prisma.demoNote.create({
    data: {
      tab: DemoTab.can_not_do,
      title: '為什麼 Server Component 不能使用 useState？',
      content:
        'Server Component 在 server 執行，沒有瀏覽器狀態與 re-render 機制，因此無法使用 useState。',
      comments: {
        create: [
          { author: 'Interviewer', message: '那狀態要怎麼處理？' },
          { author: 'Shack', message: '切 Client Component，只包需要互動的部分。' },
          { message: 'useState 是 client-side state' },
        ],
      },
    },
  })

  await prisma.demoNote.create({
    data: {
      tab: DemoTab.can_not_do,
      title: '為什麼 Server Component 不能用 useEffect？',
      content:
        'useEffect 是瀏覽器生命週期 hook，Server Component 只會在 server render。',
      comments: {
        create: [
          { message: '所以資料 fetching 要在 server 直接做' },
          { message: 'useEffect 是 hydration 後才會跑' },
        ],
      },
    },
  })

  await prisma.demoNote.create({
    data: {
      tab: DemoTab.can_not_do,
      title: '為什麼不能在 Server Component 綁 onClick？',
      content:
        '事件處理需要瀏覽器 DOM 與 JavaScript runtime，Server Component 只產生 HTML。',
      comments: {
        create: [
          { message: '所以表單 submit 才能用 Server Actions' },
          { message: 'onClick 一定要在 Client Component' },
          { message: '這題面試超常出' },
        ],
      },
    },
  })

  /* -----------------------------
   * tab: rsc_boundary
   * ----------------------------- */

  await prisma.demoNote.create({
    data: {
      tab: DemoTab.rsc_boundary,
      title: 'RSC 的核心原則是什麼？',
      content:
        '預設使用 Server Component，只有需要互動的地方才切 Client Component。',
      comments: {
        create: [
          { author: 'Shack', message: '這是 App Router 的設計哲學' },
          { message: '否則就退化成傳統 SPA' },
        ],
      },
    },
  })

  await prisma.demoNote.create({
    data: {
      tab: DemoTab.rsc_boundary,
      title: 'Client Component 應該切在多小？',
      content:
        'Client Component 應該是最小可互動單位，而不是整個 page。',
      comments: {
        create: [
          { message: '避免整頁 use client' },
          { message: 'Client bundle 會變大' },
          { message: 'Server Component 可以直接存取 DB' },
        ],
      },
    },
  })

  await prisma.demoNote.create({
    data: {
      tab: DemoTab.rsc_boundary,
      title: 'Server Action 在 RSC 架構中的角色',
      content:
        'Server Action 提供一個安全的方式，讓 Client Component 觸發 server-side 邏輯。',
      comments: {
        create: [
          { message: '不用再自己寫 API Route' },
          { message: '型別安全 + 自動 serialisation' },
        ],
      },
    },
  })

  console.log('✅ Seed data created successfully')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
})
