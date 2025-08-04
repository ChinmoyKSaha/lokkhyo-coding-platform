'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Search,
  Filter,
  CheckCircle,
  Clock,
  Users,
  BarChart3,
  Trophy,
  Code,
  Zap,
  Flame
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

interface Problem {
  id: number
  title: string
  description: string
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert'
  solved: number
  acceptance: string
  tags: string[]
  estimatedTime: string
  category: string
  isCompleted?: boolean
  isPremium?: boolean
}

const problems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    difficulty: "Easy",
    solved: 124523,
    acceptance: "49.2%",
    tags: ["Array", "Hash Table"],
    estimatedTime: "15 min",
    category: "Arrays",
    isCompleted: false
  },
  {
    id: 2,
    title: "Add Two Numbers",
    description: "You are given two non-empty linked lists representing two non-negative integers.",
    difficulty: "Medium",
    solved: 89342,
    acceptance: "38.7%",
    tags: ["Linked List", "Math", "Recursion"],
    estimatedTime: "25 min",
    category: "Linked Lists",
    isCompleted: false
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    difficulty: "Medium",
    solved: 67891,
    acceptance: "33.8%",
    tags: ["Hash Table", "String", "Sliding Window"],
    estimatedTime: "30 min",
    category: "Strings",
    isCompleted: true
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    difficulty: "Hard",
    solved: 23456,
    acceptance: "36.2%",
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    estimatedTime: "45 min",
    category: "Binary Search",
    isCompleted: false
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    description: "Given a string s, return the longest palindromic substring in s.",
    difficulty: "Medium",
    solved: 45678,
    acceptance: "32.1%",
    tags: ["String", "Dynamic Programming"],
    estimatedTime: "35 min",
    category: "Dynamic Programming",
    isCompleted: false
  },
  {
    id: 6,
    title: "Regular Expression Matching",
    description: "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*'.",
    difficulty: "Hard",
    solved: 12345,
    acceptance: "27.4%",
    tags: ["String", "Dynamic Programming", "Recursion"],
    estimatedTime: "50 min",
    category: "Dynamic Programming",
    isCompleted: false
  },
  {
    id: 7,
    title: "Reverse Integer",
    description: "Given a signed 32-bit integer x, return x with its digits reversed.",
    difficulty: "Medium",
    solved: 78901,
    acceptance: "26.8%",
    tags: ["Math"],
    estimatedTime: "20 min",
    category: "Math",
    isCompleted: false
  },
  {
    id: 8,
    title: "String to Integer (atoi)",
    description: "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.",
    difficulty: "Medium",
    solved: 34567,
    acceptance: "16.4%",
    tags: ["String"],
    estimatedTime: "30 min",
    category: "Strings",
    isCompleted: false
  },
  {
    id: 9,
    title: "Palindrome Number",
    description: "Given an integer x, return true if x is palindrome integer.",
    difficulty: "Easy",
    solved: 156789,
    acceptance: "52.3%",
    tags: ["Math"],
    estimatedTime: "15 min",
    category: "Math",
    isCompleted: true
  },
  {
    id: 10,
    title: "Container With Most Water",
    description: "You are given an integer array height of length n. There are n vertical lines drawn.",
    difficulty: "Medium",
    solved: 67890,
    acceptance: "54.1%",
    tags: ["Array", "Two Pointers", "Greedy"],
    estimatedTime: "25 min",
    category: "Two Pointers",
    isCompleted: false
  },
  {
    id: 11,
    title: "Merge k Sorted Lists",
    description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.",
    difficulty: "Hard",
    solved: 18765,
    acceptance: "48.7%",
    tags: ["Linked List", "Divide and Conquer", "Heap", "Merge Sort"],
    estimatedTime: "40 min",
    category: "Linked Lists",
    isCompleted: false
  },
  {
    id: 12,
    title: "Valid Parentheses",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: "Easy",
    solved: 234567,
    acceptance: "40.1%",
    tags: ["String", "Stack"],
    estimatedTime: "20 min",
    category: "Stack",
    isCompleted: false
  },
  {
    id: 13,
    title: "Trapping Rain Water",
    description: "Given n non-negative integers representing an elevation map where the width of each bar is 1.",
    difficulty: "Hard",
    solved: 15432,
    acceptance: "54.9%",
    tags: ["Array", "Two Pointers", "Dynamic Programming", "Stack", "Monotonic Stack"],
    estimatedTime: "45 min",
    category: "Dynamic Programming",
    isCompleted: false
  },
  {
    id: 14,
    title: "Sliding Window Maximum",
    description: "You are given an array of integers nums, there is a sliding window of size k.",
    difficulty: "Hard",
    solved: 9876,
    acceptance: "46.3%",
    tags: ["Array", "Queue", "Sliding Window", "Heap", "Monotonic Queue"],
    estimatedTime: "50 min",
    category: "Sliding Window",
    isCompleted: false
  },
  {
    id: 15,
    title: "Best Time to Buy and Sell Stock",
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day.",
    difficulty: "Easy",
    solved: 345678,
    acceptance: "54.7%",
    tags: ["Array", "Dynamic Programming"],
    estimatedTime: "15 min",
    category: "Dynamic Programming",
    isCompleted: true
  }
]

const categories = [
  "All Categories",
  "Arrays",
  "Strings", 
  "Linked Lists",
  "Trees",
  "Dynamic Programming",
  "Binary Search",
  "Two Pointers",
  "Stack",
  "Queue",
  "Graph",
  "Math",
  "Sliding Window",
  "Backtracking",
  "Greedy"
]

const difficulties = ["All Levels", "Easy", "Medium", "Hard", "Expert"]

export default function ProblemsPage() {
  const { user, isAuthenticated } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Levels')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [filteredProblems, setFilteredProblems] = useState(problems)
  const [showCompleted, setShowCompleted] = useState(false)

  useEffect(() => {
    let filtered = problems

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(problem => 
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'All Levels') {
      filtered = filtered.filter(problem => problem.difficulty === selectedDifficulty)
    }

    // Filter by category
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(problem => problem.category === selectedCategory)
    }

    // Filter by completion status
    if (showCompleted) {
      filtered = filtered.filter(problem => problem.isCompleted)
    }

    setFilteredProblems(filtered)
  }, [searchTerm, selectedDifficulty, selectedCategory, showCompleted])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'expert': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return <Code className="h-4 w-4" />
      case 'medium': return <Zap className="h-4 w-4" />
      case 'hard': return <Flame className="h-4 w-4" />
      case 'expert': return <Trophy className="h-4 w-4" />
      default: return <Code className="h-4 w-4" />
    }
  }

  const stats = {
    total: problems.length,
    easy: problems.filter(p => p.difficulty === 'Easy').length,
    medium: problems.filter(p => p.difficulty === 'Medium').length,
    hard: problems.filter(p => p.difficulty === 'Hard').length,
    expert: problems.filter(p => p.difficulty === 'Expert').length,
    solved: problems.filter(p => p.isCompleted).length
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Practice Problems
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Improve your coding skills with our curated collection of programming problems
              </p>
            </div>
            
            {/* Stats */}
            <div className="mt-6 lg:mt-0 grid grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.easy}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Easy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.medium}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Medium</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{stats.hard}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Hard</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.expert}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Expert</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.solved}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Solved</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search and Quick Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search problems by title, description, or tags..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant={showCompleted ? "default" : "outline"}
                onClick={() => setShowCompleted(!showCompleted)}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Completed
              </Button>
            </div>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedDifficulty === 'Easy' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDifficulty(selectedDifficulty === 'Easy' ? 'All Levels' : 'Easy')}
              className="text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
            >
              <Code className="h-4 w-4 mr-1" />
              Easy ({stats.easy})
            </Button>
            <Button
              variant={selectedDifficulty === 'Medium' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDifficulty(selectedDifficulty === 'Medium' ? 'All Levels' : 'Medium')}
              className="text-yellow-600 border-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
            >
              <Zap className="h-4 w-4 mr-1" />
              Medium ({stats.medium})
            </Button>
            <Button
              variant={selectedDifficulty === 'Hard' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDifficulty(selectedDifficulty === 'Hard' ? 'All Levels' : 'Hard')}
              className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Flame className="h-4 w-4 mr-1" />
              Hard ({stats.hard})
            </Button>
            <Button
              variant={selectedDifficulty === 'Expert' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDifficulty(selectedDifficulty === 'Expert' ? 'All Levels' : 'Expert')}
              className="text-purple-600 border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              <Trophy className="h-4 w-4 mr-1" />
              Expert ({stats.expert})
            </Button>
          </div>
        </div>

        {/* Problems Grid */}
        <div className="grid gap-6">
          {filteredProblems.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No problems found
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Try adjusting your filters or search terms
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredProblems.map((problem) => (
              <Link key={problem.id} href={`/problems/${problem.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-transparent hover:border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            {problem.isCompleted && (
                              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            )}
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {problem.id}. {problem.title}
                            </h3>
                          </div>
                          <Badge className={getDifficultyColor(problem.difficulty)}>
                            {getDifficultyIcon(problem.difficulty)}
                            <span className="ml-1">{problem.difficulty}</span>
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                          {problem.description}
                        </p>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-4">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{problem.solved.toLocaleString()} solved</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BarChart3 className="h-4 w-4" />
                            <span>{problem.acceptance} acceptance</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{problem.estimatedTime}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {problem.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>

        {/* Pagination */}
        {filteredProblems.length > 0 && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button variant="outline" className="bg-blue-50 text-blue-600 border-blue-600">
                1
              </Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
