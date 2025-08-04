import { NextRequest, NextResponse } from 'next/server'

const LANGUAGE_IDS = {
  javascript: 63, // Node.js
  python: 71,     // Python 3
  java: 62,       // Java
  cpp: 54,        // C++
  c: 50           // C
}

interface Judge0Response {
  token: string
  status: {
    id: number
    description: string
  }
  stdout?: string
  stderr?: string
  compile_output?: string
  time?: string
  memory?: number
}

export async function POST(request: NextRequest) {
  try {
    const { code, language, input } = await request.json()

    const languageId = LANGUAGE_IDS[language as keyof typeof LANGUAGE_IDS]
    if (!languageId) {
      return NextResponse.json(
        { error: 'Unsupported language' },
        { status: 400 }
      )
    }

    // Submit code to Judge0
    const submission = await fetch(`${process.env.JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': process.env.JUDGE0_API_KEY!,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
        stdin: input || '',
        cpu_time_limit: 2,
        memory_limit: 128000
      })
    })

    if (!submission.ok) {
      throw new Error('Failed to submit code to Judge0')
    }

    const result: Judge0Response = await submission.json()

    // Process result
    const response = {
      status: result.status.description,
      output: result.stdout || '',
      error: result.stderr || result.compile_output || '',
      time: result.time || '0',
      memory: result.memory || 0,
      success: result.status.id === 3 // Accepted
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Code execution error:', error)
    
    return NextResponse.json(
      { error: 'Code execution failed' },
      { status: 500 }
    )
  }
}
