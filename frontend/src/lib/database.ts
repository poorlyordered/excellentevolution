import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

export async function connectToDatabase(connectionString: string) {
  if (!prisma) {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: connectionString
        }
      }
    })
    await prisma.$connect()
  }
  return prisma
}

export type DatabaseClient = typeof prisma