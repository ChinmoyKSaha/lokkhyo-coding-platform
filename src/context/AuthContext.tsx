'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  username: string
  email: string
  avatar?: string
  firstName?: string
  lastName?: string
  joinedAt: string
  points: number
  completedCourses: number
  completedProblems: number
  completedProjects: number
  streak: number
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  signUp: (userData: SignUpData) => Promise<{ success: boolean; message: string }>
  signOut: () => void
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; message: string }>
}

interface SignUpData {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data for demo purposes
const mockUsers: User[] = [
  {
    id: '1',
    username: 'your_username',
    email: 'demo@example.com',
    firstName: 'Demo',
    lastName: 'User',
    avatar: '/api/placeholder/40/40',
    joinedAt: '2024-01-15',
    points: 6890,
    completedCourses: 3,
    completedProblems: 89,
    completedProjects: 8,
    streak: 5
  }
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem('auth_user')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadUser()
  }, [])

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('auth_user')
    }
  }, [user])

  const signIn = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock authentication logic
    if (email === 'demo@example.com' && password === 'demo123') {
      const mockUser = mockUsers[0]
      setUser(mockUser)
      setIsLoading(false)
      return { success: true, message: 'Successfully signed in!' }
    }
    
    setIsLoading(false)
    return { success: false, message: 'Invalid email or password' }
  }

  const signUp = async (userData: SignUpData): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock validation
    if (userData.email && userData.password && userData.username) {
      const newUser: User = {
        id: Date.now().toString(),
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        avatar: '/api/placeholder/40/40',
        joinedAt: new Date().toISOString(),
        points: 0,
        completedCourses: 0,
        completedProblems: 0,
        completedProjects: 0,
        streak: 0
      }
      
      setUser(newUser)
      setIsLoading(false)
      return { success: true, message: 'Account created successfully!' }
    }
    
    setIsLoading(false)
    return { success: false, message: 'Please fill in all required fields' }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('auth_user')
  }

  const updateProfile = async (data: Partial<User>): Promise<{ success: boolean; message: string }> => {
    if (!user) {
      return { success: false, message: 'User not authenticated' }
    }

    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const updatedUser = { ...user, ...data }
    setUser(updatedUser)
    setIsLoading(false)
    
    return { success: true, message: 'Profile updated successfully!' }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Mock function to simulate loading user progress
export const updateUserProgress = (type: 'problem' | 'project' | 'course', points: number = 0) => {
  const savedUser = localStorage.getItem('auth_user')
  if (savedUser) {
    try {
      const user = JSON.parse(savedUser)
      const updatedUser = { ...user }
      
      switch (type) {
        case 'problem':
          updatedUser.completedProblems += 1
          updatedUser.points += points || 50
          break
        case 'project':
          updatedUser.completedProjects += 1
          updatedUser.points += points || 200
          break
        case 'course':
          updatedUser.completedCourses += 1
          updatedUser.points += points || 500
          break
      }
      
      localStorage.setItem('auth_user', JSON.stringify(updatedUser))
      return updatedUser
    } catch (error) {
      console.error('Error updating user progress:', error)
    }
  }
  return null
}
