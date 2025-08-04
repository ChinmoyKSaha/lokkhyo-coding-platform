'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Editor } from '@monaco-editor/react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Play, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft,
  ArrowRight,
  Book, 
  Video, 
  Code,
  Trophy,
  Lock,
  Clock
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

// This would typically come from a database or API
const lessonsData: Record<number, any> = {
  1: {
    id: 1,
    title: "What is JavaScript?",
    type: "video",
    duration: "10 min",
    description: "Introduction to JavaScript and its role in web development",
    content: {
      videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg", // Sample JavaScript intro video
      transcript: `
        Welcome to JavaScript Fundamentals! In this lesson, we'll explore what JavaScript is and why it's such an important programming language.

        JavaScript is a high-level, interpreted programming language that was originally created to make web pages interactive. Today, it's used for:
        
        1. **Frontend Web Development**: Making websites interactive and dynamic
        2. **Backend Development**: Server-side programming with Node.js
        3. **Mobile App Development**: Using frameworks like React Native
        4. **Desktop Applications**: Using Electron
        5. **Game Development**: Browser-based and mobile games
        
        Key characteristics of JavaScript:
        - Dynamic typing
        - First-class functions
        - Prototype-based object orientation
        - Event-driven programming
        - Asynchronous programming support
        
        JavaScript runs in web browsers and can be executed server-side using Node.js. It's one of the most popular programming languages in the world!
      `
    }
  },
  2: {
    id: 2,
    title: "Setting up your development environment",
    type: "video",
    duration: "15 min",
    description: "Installing VS Code, browsers, and developer tools",
    content: {
      videoUrl: "https://www.youtube.com/embed/SPdumpCIWNY", // Sample VS Code setup video
      transcript: `
        Setting up a proper development environment is crucial for productive JavaScript programming. Here's what we'll cover:

        **1. Text Editor/IDE**
        We recommend Visual Studio Code (VS Code) because it's:
        - Free and open source
        - Excellent JavaScript support
        - Rich extension ecosystem
        - Built-in terminal and debugging

        **2. Web Browser**
        Chrome or Firefox with Developer Tools:
        - Console for testing JavaScript
        - Network tab for monitoring requests
        - Elements tab for HTML/CSS inspection
        - Debugger for stepping through code

        **3. Node.js**
        For running JavaScript outside the browser:
        - Download from nodejs.org
        - Includes npm (package manager)
        - Enables server-side JavaScript

        **4. Essential VS Code Extensions**
        - JavaScript (ES6) code snippets
        - Prettier - Code formatter
        - ESLint - Code linting
        - Live Server - Local development server

        **5. Browser Extensions**
        - React Developer Tools (for later)
        - Vue.js devtools (if using Vue)
      `
    }
  },
  3: {
    id: 3,
    title: "Your first JavaScript program",
    type: "interactive",
    duration: "20 min",
    description: "Write and run your first JavaScript code",
    content: {
      instructions: `
        Let's write your first JavaScript program! We'll start with the classic "Hello, World!" and then explore some basic concepts.

        **Exercise 1: Hello World**
        Write a program that displays "Hello, World!" in the console.

        **Exercise 2: Variables and Math**
        Create variables for your name and age, then calculate what year you were born.

        **Exercise 3: User Interaction**
        Use prompt() to ask the user for their name and greet them personally.
      `,
      starterCode: `// Exercise 1: Hello World
// Write your code here to print "Hello, World!" to the console


// Exercise 2: Variables and Math
// Create variables for your name and age
// Calculate and display what year you were born


// Exercise 3: User Interaction  
// Ask for the user's name and greet them
// Hint: Use prompt() to get input and alert() to show output

`,
      solution: `// Exercise 1: Hello World
console.log("Hello, World!");

// Exercise 2: Variables and Math
const name = "John";
const age = 25;
const currentYear = new Date().getFullYear();
const birthYear = currentYear - age;

console.log(\`My name is \${name} and I was born in \${birthYear}\`);

// Exercise 3: User Interaction
const userName = prompt("What's your name?");
alert(\`Hello, \${userName}! Welcome to JavaScript!\`);`
    }
  }
}

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  
  const courseId = parseInt(params.id as string)
  const lessonId = parseInt(params.lessonId as string)
  const lesson = lessonsData[lessonId]
  
  const [code, setCode] = useState('')
  const [showSolution, setShowSolution] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [activeTab, setActiveTab] = useState('content')

  useEffect(() => {
    if (lesson?.content?.starterCode) {
      setCode(lesson.content.starterCode)
    }
  }, [lesson])

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Lesson not found</h1>
        </div>
      </div>
    )
  }

  const handleMarkComplete = () => {
    setIsCompleted(true)
    // Here you would typically save progress to a backend
  }

  const runCode = () => {
    try {
      // Create a safe evaluation environment
      const output: string[] = []
      
      // Override console.log to capture output
      const originalLog = console.log
      console.log = (...args: any[]) => {
        output.push(args.map(arg => String(arg)).join(' '))
      }
      
      // Execute the code (in a real app, you'd use a sandboxed environment)
      eval(code)
      
      // Restore original console.log
      console.log = originalLog
      
      // Show output
      alert('Output:\n' + output.join('\n'))
    } catch (error) {
      alert('Error: ' + (error as Error).message)
    }
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-5 w-5" />
      case 'interactive': return <Code className="h-5 w-5" />
      case 'reading': return <Book className="h-5 w-5" />
      case 'project': return <Trophy className="h-5 w-5" />
      default: return <Play className="h-5 w-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'interactive': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'reading': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'project': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.back()}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Course
              </Button>
              
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Badge className={getTypeColor(lesson.type)}>
                    {getLessonIcon(lesson.type)}
                    <span className="ml-1 capitalize">{lesson.type}</span>
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {lesson.duration}
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {lesson.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {lesson.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {!isCompleted ? (
                <Button onClick={handleMarkComplete}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Complete
                </Button>
              ) : (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {lesson.type === 'video' && (
          <div className="space-y-8">
            {/* Video Content */}
            <Card>
              <CardContent className="p-6">
                <div className="aspect-video mb-6">
                  <iframe
                    src={lesson.content.videoUrl}
                    title={lesson.title}
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                  />
                </div>
                
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="content">Transcript</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="content" className="mt-6">
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                        {lesson.content.transcript}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="notes" className="mt-6">
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <Book className="h-12 w-12 mx-auto mb-4" />
                      <p>Take notes while watching the video to remember key concepts!</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}

        {lesson.type === 'interactive' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
                <CardDescription>Follow the exercises below to practice the concepts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                    {lesson.content.instructions}
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    onClick={() => setShowSolution(!showSolution)}
                    className="w-full"
                  >
                    {showSolution ? 'Hide Solution' : 'Show Solution'}
                  </Button>
                  
                  {showSolution && (
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h4 className="font-semibold mb-2">Solution:</h4>
                      <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {lesson.content.solution}
                      </pre>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Code Editor */}
            <Card>
              <CardHeader>
                <CardTitle>Code Editor</CardTitle>
                <CardDescription>Write your JavaScript code here</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    <Editor
                      height="400px"
                      language="javascript"
                      theme="vs-dark"
                      value={code}
                      onChange={(value) => setCode(value || '')}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        wordWrap: 'on',
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                      }}
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button onClick={runCode} className="flex-1">
                      <Play className="h-4 w-4 mr-2" />
                      Run Code
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setCode(lesson.content.starterCode)}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button variant="outline" disabled={lessonId <= 1}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous Lesson
          </Button>
          
          <Button disabled={lessonId >= 24}>
            Next Lesson
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
