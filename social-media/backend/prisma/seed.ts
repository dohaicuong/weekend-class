import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

main()

async function main() {
  const users = [
    { id: '1', email: 'beatyshot@gmail.com', password: 'vasasvsva', name: 'Yuki' },
    { id: '2', email: 'beatyneko@gmail.com', password: 'vg3qevawq', name: 'Yami' },
  ]

  for (const user of users) {
    await db.user.create({ data: user })
  }
  console.log('done')

  db.$disconnect()
}