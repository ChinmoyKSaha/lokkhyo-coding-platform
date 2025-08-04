// Mock implementation for development when dependencies are not installed

interface JWTMock {
  sign: (payload: any, secret: string, options?: any) => string
  verify: (token: string, secret: string) => any
}

interface BcryptMock {
  hash: (data: string, saltRounds: number) => Promise<string>
  compare: (data: string, encrypted: string) => Promise<boolean>
}

export const jwt: JWTMock = {
  sign: (payload, secret, options = {}) => {
    console.log('Mock JWT sign called')
    // Create a simple base64 encoded token for development
    const header = Buffer.from(JSON.stringify({ typ: 'JWT', alg: 'HS256' })).toString('base64')
    const payloadStr = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })).toString('base64')
    const signature = Buffer.from('mock-signature').toString('base64')
    return `${header}.${payloadStr}.${signature}`
  },
  verify: (token, secret) => {
    console.log('Mock JWT verify called')
    try {
      const parts = token.split('.')
      if (parts.length !== 3) throw new Error('Invalid token')
      const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString())
      if (payload.exp < Date.now()) throw new Error('Token expired')
      return payload
    } catch (error) {
      throw new Error('Invalid token')
    }
  }
}

export const bcrypt: BcryptMock = {
  hash: async (data, saltRounds) => {
    console.log('Mock bcrypt hash called')
    // Simple mock hash for development
    return `$2a$${saltRounds}$mock.hash.${Buffer.from(data).toString('base64').slice(0, 22)}`
  },
  compare: async (data, encrypted) => {
    console.log('Mock bcrypt compare called')
    // For demo purposes:
    // - 'password' matches the demo user hash
    // - any password matches hashes created by our mock hash function
    return data === 'password' || encrypted.includes('mock.hash')
  }
}
