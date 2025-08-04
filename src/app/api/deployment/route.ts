import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const deploymentInfo = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      database: {
        connected: !!process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('mock://'),
        url: process.env.DATABASE_URL ? 'configured' : 'not configured',
        type: process.env.DATABASE_URL?.includes('supabase') ? 'Supabase' : 
              process.env.DATABASE_URL?.includes('mock://') ? 'Mock (Development)' : 'Unknown'
      },
      authentication: {
        jwtSecret: !!process.env.JWT_SECRET,
        nextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        nextAuthUrl: process.env.NEXTAUTH_URL || 'not configured'
      },
      features: {
        codeExecution: !!process.env.JUDGE0_API_KEY,
        githubOAuth: !!(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET)
      },
      deployment: {
        platform: process.env.VERCEL ? 'Vercel' : 'Other',
        region: process.env.VERCEL_REGION || 'unknown',
        url: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'localhost'
      }
    }

    return NextResponse.json(deploymentInfo)
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error', 
        error: 'Deployment check failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
