import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

main()

async function main() {
  db.disconnect()
}