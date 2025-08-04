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

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mock-secret')
    const { type, points } = await request.json()

    // Update user XP and level
    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })

    if (!currentUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const newXP = currentUser.xp + points
    const newLevel = Math.floor(newXP / 1000) + 1 // Simple level calculation

    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        xp: newXP,
        level: newLevel
      }
    })

    return NextResponse.json({
      xp: updatedUser.xp,
      level: updatedUser.level,
      message: `Gained ${points} XP!`
    })
  } catch (error) {
    console.error('Progress update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
