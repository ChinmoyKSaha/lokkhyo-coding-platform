import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    return NextResponse.json({
      status: 'success',
      message: 'Backend API is working!',
      timestamp: new Date().toISOString(),
      endpoints: {
        authentication: [
          'POST /api/auth/register',
          'POST /api/auth/login', 
          'POST /api/auth/logout',
          'GET /api/auth/me'
        ],
        problems: [
          'GET /api/problems',
          'POST /api/problems'
        ],
        codeExecution: [
          'POST /api/execute'
        ],
        userProgress: [
          'POST /api/user/progress'
        ]
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Backend test failed', details: String(error) },
      { status: 500 }
    )
  }
}
