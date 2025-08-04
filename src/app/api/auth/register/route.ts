import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Try to import the real modules, fall back to mocks if not available
let bcrypt: any
let jwt: any

try {
  bcrypt = require('bcryptjs')
  jwt = require('jsonwebtoken')
} catch (error) {
  console.log('Using mock auth modules for development')
  const mocks = require('@/lib/auth-mocks')
  bcrypt = mocks.bcrypt
  jwt = mocks.jwt
}

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        xp: true,
        level: true,
        streak: true,
        createdAt: true,
      }
    })

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'development-secret-key',
      { expiresIn: '7d' }
    )

    const response = NextResponse.json({
      message: 'User created successfully',
      user,
      token
    })

    // Set HTTP-only cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    return response
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
