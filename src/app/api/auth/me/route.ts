import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface JwtPayload {
  userId: string
  email: string
  exp?: number
}

// Try to import the real modules, fall back to mocks if not available
let jwt: {
  verify: (token: string, secret: string) => JwtPayload
}

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  jwt = require('jsonwebtoken')
} catch {
  console.log('Using mock jwt module for development')
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mocks = require('@/lib/auth-mocks')
  jwt = mocks.jwt
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const secret = process.env.JWT_SECRET || 'development-secret-key'
    const decoded = jwt.verify(token, secret)
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        xp: true,
        level: true,
        streak: true,
        avatar: true,
        createdAt: true,
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    )
  }
}
