'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Editor } from '@monaco-editor/react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Clock, 
  Play, 
  RotateCcw, 
  Save, 
  CheckCircle, 
  XCircle, 
  Lightbulb,
  Trophy,
  Users,
  BarChart3
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { updateUserProgress } from '@/context/AuthContext'

interface Problem {
  id: number
  title: string
  description: string
  difficulty: string
  solved: number
  acceptance: string
  tags: string[]
  estimatedTime: string
  examples: {
    input: string
    output: string
    explanation: string
  }[]
  constraints: string[]
  starterCode: {
    javascript: string
    python: string
    java: string
  }
}

interface TestCase {
  input: any
  expectedOutput: any
  explanation?: string
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
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      }
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists."
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
    // Write your solution here
    
}`,
      python: `def two_sum(nums, target):
    # Write your solution here
    pass`,
      java: `public int[] twoSum(int[] nums, int target) {
    // Write your solution here
    
}`
    }
  }
]

const testCases: Record<number, TestCase[]> = {
  1: [
    {
      input: { nums: [2, 7, 11, 15], target: 9 },
      expectedOutput: [0, 1],
      explanation: "nums[0] + nums[1] = 2 + 7 = 9"
    },
    {
      input: { nums: [3, 2, 4], target: 6 },
      expectedOutput: [1, 2],
      explanation: "nums[1] + nums[2] = 2 + 4 = 6"
    },
    {
      input: { nums: [3, 3], target: 6 },
      expectedOutput: [0, 1],
      explanation: "nums[0] + nums[1] = 3 + 3 = 6"
    }
  ]
}

export default function ProblemPage() {
  const params = useParams()
  const problemId = parseInt(params.id as string)
  const problem = problems.find(p => p.id === problemId)
  const { user, isAuthenticated } = useAuth()
  
  const [selectedLanguage, setSelectedLanguage] = useState<'javascript' | 'python' | 'java'>('javascript')
  const [code, setCode] = useState('')
  const [testResults, setTestResults] = useState<any[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [isSolved, setIsSolved] = useState(false)

  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode[selectedLanguage])
    }
  }, [problem, selectedLanguage])

  if (!problem) {
    return <div className="p-8">Problem not found</div>
  }

  const handleLanguageChange = (language: 'javascript' | 'python' | 'java') => {
    setSelectedLanguage(language)
    setCode(problem.starterCode[language])
  }

  const runCode = async () => {
    setIsRunning(true)
    setTestResults([])
    
    // Simulate test execution
    setTimeout(() => {
      const cases = testCases[problemId] || []
      const results = cases.map((testCase, index) => {
        const passed = Math.random() > 0.2 // 80% chance of passing for demo
        return {
          testCase: index + 1,
          input: JSON.stringify(testCase.input),
          expectedOutput: JSON.stringify(testCase.expectedOutput),
          actualOutput: passed ? JSON.stringify(testCase.expectedOutput) : JSON.stringify("incorrect_output"),
          passed,
          executionTime: Math.floor(Math.random() * 100) + 'ms',
          memory: Math.floor(Math.random() * 50) + 'MB'
        }
      })
      
      setTestResults(results)
      setIsRunning(false)
      
      // Check if all tests passed
      const allPassed = results.every(r => r.passed)
      if (allPassed && !isSolved) {
        setIsSolved(true)
        // Update user progress if authenticated
        if (isAuthenticated) {
          updateUserProgress('problem', 50)
        }
      }
    }, 2000)
  }

  const submitCode = () => {
    if (!isAuthenticated) {
      alert('Please sign in to submit your solution')
      return
    }
    runCode()
  }

  const resetCode = () => {
    setCode(problem.starterCode[selectedLanguage])
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        {/* Problem Description */}
        <div className="p-6 overflow-y-auto border-r border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {problemId}. {problem.title}
                </h1>
                <Badge className={getDifficultyColor(problem.difficulty)}>
                  {problem.difficulty}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
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

            {/* Problem Description */}
            <Card>
              <CardHeader>
                <CardTitle>Problem Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {problem.description}
                </p>
              </CardContent>
            </Card>

            {/* Examples */}
            <Card>
              <CardHeader>
                <CardTitle>Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {problem.examples.map((example, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold">Example {index + 1}:</h4>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg font-mono text-sm">
                      <div><strong>Input:</strong> {example.input}</div>
                      <div><strong>Output:</strong> {example.output}</div>
                      <div><strong>Explanation:</strong> {example.explanation}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Constraints */}
            <Card>
              <CardHeader>
                <CardTitle>Constraints</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                  {problem.constraints.map((constraint, index) => (
                    <li key={index} className="font-mono text-sm">• {constraint}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Hint */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Hint
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!showHint ? (
                  <Button 
                    variant="outline" 
                    onClick={() => setShowHint(true)}
                    className="w-full"
                  >
                    Show Hint
                  </Button>
                ) : (
                  <p className="text-gray-700 dark:text-gray-300">
                    Use a hash map to store the complement of each number as you iterate through the array.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex flex-col h-screen">
          {/* Editor Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Select value={selectedLanguage} onValueChange={(value) => handleLanguageChange(value as 'javascript' | 'python' | 'java')}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={resetCode}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                  <Button variant="outline" size="sm">
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  onClick={runCode}
                  disabled={isRunning}
                >
                  <Play className="h-4 w-4 mr-1" />
                  {isRunning ? 'Running...' : 'Run'}
                </Button>
                <Button onClick={submitCode} disabled={isRunning}>
                  <Trophy className="h-4 w-4 mr-1" />
                  Submit
                </Button>
              </div>
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1">
            <Editor
              height="60%"
              language={selectedLanguage}
              theme="vs-dark"
              value={code || problem.starterCode[selectedLanguage]}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                readOnly: false,
                automaticLayout: true,
              }}
            />
          </div>

          {/* Test Results */}
          <div className="h-80 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-y-auto">
            <Tabs defaultValue="testcases" className="h-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="testcases">Test Cases</TabsTrigger>
                <TabsTrigger value="console">Console</TabsTrigger>
              </TabsList>
              
              <TabsContent value="testcases" className="mt-4 space-y-3">
                {testResults.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    Run your code to see test results
                  </div>
                ) : (
                  testResults.map((result, index) => (
                    <Card key={index} className={`border-l-4 ${result.passed ? 'border-l-green-500' : 'border-l-red-500'}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {result.passed ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                            <span className="font-semibold">Test Case {result.testCase}</span>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {result.executionTime} • {result.memory}
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm font-mono">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Input: </span>
                            <span>{result.input}</span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Expected: </span>
                            <span>{result.expectedOutput}</span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Actual: </span>
                            <span className={result.passed ? 'text-green-600' : 'text-red-600'}>
                              {result.actualOutput}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="console" className="mt-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                      {isRunning ? (
                        <div>Running your code...</div>
                      ) : testResults.length > 0 ? (
                        <div>
                          Execution completed. {testResults.filter(r => r.passed).length}/{testResults.length} test cases passed.
                        </div>
                      ) : (
                        <div>Console output will appear here...</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
