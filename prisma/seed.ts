import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const DemoTab = {
  can_not_do: 'can_not_do',
  rsc_boundary: 'rsc_boundary',
} as const

async function main() {
  console.log('Start seeding...')

  await prisma.demoComment.deleteMany()
  await prisma.demoNote.deleteMany()

  // Keep only 1/3 of original demo data: 6 notes -> 2 notes
  await prisma.demoNote.create({
    data: {
      tab: DemoTab.can_not_do,
      title: 'Server Components cannot use useState',
      content:
        'Server Components render on the server and do not keep client-side interactive state.',
      comments: {
        create: [{ author: 'Interviewer', message: 'State should move to a Client Component.' }],
      },
    },
  })

  await prisma.demoNote.create({
    data: {
      tab: DemoTab.rsc_boundary,
      title: 'Use Client Component only when needed',
      content:
        'Default to Server Components, then add a Client boundary only for hooks, events, or browser APIs.',
      comments: {
        create: [{ message: 'This keeps the client bundle smaller.' }],
      },
    },
  })

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error('Seed failed', e)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
