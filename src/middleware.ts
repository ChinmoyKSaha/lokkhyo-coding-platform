import { NextRequest, NextResponse } from 'next/server'

// Try to import the real modules, fall back to mocks if not available
let jwt: any

try {
  jwt = require('jsonwebtoken')
} catch (error) {
  console.log('Using mock jwt module for development')
  // Simple mock for middleware
  jwt = {
    verify: (token: string, secret: string) => {
      if (!token) throw new Error('No token')
      const parts = token.split('.')
      if (parts.length !== 3) throw new Error('Invalid token')
      return JSON.parse(Buffer.from(parts[1], 'base64').toString())
    }
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
      jwt.verify(token, process.env.JWT_SECRET || 'development-secret-key')
      return NextResponse.next()
    } catch (error) {
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
