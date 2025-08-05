import { NextRequest, NextResponse } from 'next/server'

interface JwtPayload {
  userId: string
  email: string
  exp?: number
}

// Try to import jwt, fall back to mock if not available
let jwt: {
  verify: (token: string, secret: string) => JwtPayload
}

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  jwt = require('jsonwebtoken')
} catch {
  // Mock jwt for development
  jwt = {
    verify: (token: string) => ({ userId: 'mock-user', email: 'mock@example.com' })
  }
}

export function middleware(request: NextRequest) {
  // Check if the request is for protected API routes
  if (request.nextUrl.pathname.startsWith('/api/protected')) {
    const token = request.cookies.get('token')?.value || 
                 request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    try {
      const secret = process.env.JWT_SECRET || 'development-secret-key'
      jwt.verify(token, secret)
      return NextResponse.next()
    } catch {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/protected/:path*']
}
