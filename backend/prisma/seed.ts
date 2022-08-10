import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'テストユーザー1',
    gender: 1,
    dateOfBirth: '1996-09-26'
  },
  {
    name: 'テストユーザー2',
    gender: 1,
    dateOfBirth: '1997-09-26'
  },
  {
    name: 'テストユーザー3',
    gender: 2,
    dateOfBirth: '1998-09-26'
  },
]

const main = async () => {
  console.log(`💫 Start seeding ...`)

  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }

  console.log(`💫 Seeding finished`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
