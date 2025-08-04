import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Try to import the real modules, fall back to mocks if not available
let jwt: any

try {
  jwt = require('jsonwebtoken')
} catch (error) {
  console.log('Using mock jwt module for development')
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

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'development-secret-key') as any
    
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
