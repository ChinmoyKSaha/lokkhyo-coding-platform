// Production Prisma client with fallback for development
import { PrismaClient } from '@prisma/client'

interface UserCreateData {
  email: string
  name?: string
  password: string
}

interface UserWhereUnique {
  where: { email?: string; id?: string }
}

interface UserUpdateArgs {
  where: { id: string }
  data: Record<string, unknown>
}

interface MockPrisma {
  user: {
    findUnique: (args: UserWhereUnique) => Promise<any>
    create: (args: { data: UserCreateData }) => Promise<any>
    update: (args: UserUpdateArgs) => Promise<any>
    delete: () => Promise<any>
    findMany: () => Promise<any[]>
  }
  problem: {
    findMany: () => Promise<any[]>
    findUnique: () => Promise<any>
    create: () => Promise<any>
    count: () => Promise<number>
  }
  submission: {
    create: () => Promise<any>
    findMany: () => Promise<any[]>
    deleteMany: () => Promise<any>
  }
  course: {
    findMany: () => Promise<any[]>
    create: () => Promise<any>
    deleteMany: () => Promise<any>
  }
  userProgress: {
    create: () => Promise<any>
    findMany: () => Promise<any[]>
    deleteMany: () => Promise<any>
  }
  $disconnect: () => Promise<void>
}

type PrismaClientType = PrismaClient | MockPrisma

// Mock implementation for development (when Prisma is not set up)
const createMockPrisma = (): MockPrisma => {
  console.log('Using mock database for development')
  return {
    user: {
      findUnique: async (args: UserWhereUnique) => {
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
      create: async (args: { data: UserCreateData }) => ({
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
      update: async (args: UserUpdateArgs) => ({
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

const mockPrisma = createMockPrisma()

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientType | undefined
}

let prismaInstance: PrismaClientType

// Create Prisma instance
try {
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('mock://')) {
    // Production mode with real database
    prismaInstance = globalForPrisma.prisma ?? new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
  } else {
    // Development mode with mock database
    prismaInstance = globalForPrisma.prisma ?? mockPrisma
  }
} catch {
  // Fallback to mock if Prisma client fails to initialize
  console.log('Prisma client not available, using mock database')
  prismaInstance = mockPrisma
}

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prismaInstance
}

export const prisma = prismaInstance
