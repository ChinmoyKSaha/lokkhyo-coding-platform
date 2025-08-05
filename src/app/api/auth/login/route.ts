import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Try to import the real modules, fall back to mocks if not available
let bcrypt: {
  compare: (password: string, hash: string) => Promise<boolean>
}
let jwt: {
  sign: (payload: object, secret: string, options?: object) => string
}

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  bcrypt = require('bcryptjs')
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  jwt = require('jsonwebtoken')
} catch {
  console.log('Using mock auth modules for development')
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mocks = require('@/lib/auth-mocks')
  bcrypt = mocks.bcrypt
  jwt = mocks.jwt
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Update last active
    await prisma.user.update({
      where: { id: user.id },
      data: { lastActive: new Date() }
    })

    // Create JWT token
    const secret = process.env.JWT_SECRET || 'development-secret-key'
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      secret,
      { expiresIn: '7d' }
    )

    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      xp: user.xp,
      level: user.level,
      streak: user.streak,
      avatar: user.avatar,
    }

    const response = NextResponse.json({
      message: 'Login successful',
      user: userResponse,
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
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
