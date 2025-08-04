// Production Prisma client with fallback for development
let PrismaClient: any
let prismaInstance: any

try {
  // Try to import real Prisma client
  const { PrismaClient: RealPrismaClient } = require('@prisma/client')
  PrismaClient = RealPrismaClient
} catch (error) {
  console.log('Prisma client not available, using development mode')
  PrismaClient = null
}

// Mock implementation for development (when Prisma is not set up)
const createMockPrisma = () => {
  console.log('Using mock database for development')
  return {
    user: {
      findUnique: async (args: any) => {
        if (args.where?.email === 'demo@example.com') {
          return {
            id: '1',
            email: 'demo@example.com',
            name: 'Demo User',
            password: '$2a$12$mock.hash.for.password.demo',
            avatar: null,
            xp: 1250,
            level: 3,
            streak: 7,
            lastActive: new Date(),
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date()
          }
        }
        return null
      },
      create: async (args: any) => ({
        id: Math.random().toString(36).substr(2, 9),
        email: args.data.email,
        name: args.data.name,
        password: args.data.password,
        avatar: null,
        xp: 0,
        level: 1,
        streak: 0,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }),
      update: async (args: any) => ({
        id: args.where.id,
        email: 'demo@example.com',
        name: 'Demo User',
        password: '$2a$12$mock.hash.for.password',
        avatar: null,
        xp: 1250,
        level: 3,
        streak: 7,
        lastActive: new Date(),
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date()
      }),
      delete: async () => ({}),
      findMany: async () => []
    },
    problem: {
      findMany: async () => [],
      findUnique: async () => null,
      create: async () => ({}),
      count: async () => 0
    },
    submission: {
      create: async () => ({}),
      findMany: async () => [],
      deleteMany: async () => ({})
    },
    course: {
      findMany: async () => [],
      create: async () => ({}),
      deleteMany: async () => ({})
    },
    userProgress: {
      create: async () => ({}),
      findMany: async () => [],
      deleteMany: async () => ({})
    },
    $disconnect: async () => {}
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: any | undefined
}

// Create Prisma instance
if (PrismaClient && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('mock://')) {
  // Production mode with real database
  prismaInstance = globalForPrisma.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
} else {
  // Development mode with mock database
  prismaInstance = globalForPrisma.prisma ?? createMockPrisma()
}

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prismaInstance
}

export const prisma = prismaInstance
