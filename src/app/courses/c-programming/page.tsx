'use client'

import { useState } from 'react'
import { ArrowLeft, Play, CheckCircle, Clock, Users, Star, BookOpen, Code, FileText } from 'lucide-react'
import Link from 'next/link'

const courseData = {
  id: 2,
  title: "C Programming Fundamentals",
  description: "Master the foundational concepts of C programming, from basic syntax to advanced topics like pointers and memory management.",
  image: "/api/placeholder/600/300",
  level: "Beginner",
  duration: "6 weeks",
  students: "15,234",
  rating: 4.9,
  totalLessons: 32,
  totalProjects: 6,
  price: "Free",
  instructor: {
    name: "Dr. Sarah Johnson",
    avatar: "/api/placeholder/50/50",
    title: "Senior Software Engineer"
  }
}

const modules = [
  {
    id: 1,
    title: "Introduction to C Programming",
    lessons: [
      { id: 1, title: "What is C Programming?", duration: "8:30", type: "video", completed: true },
      { id: 2, title: "Setting up Development Environment", duration: "12:45", type: "video", completed: true },
      { id: 3, title: "Your First C Program", duration: "10:20", type: "video", completed: false },
      { id: 4, title: "Understanding Compilation Process", duration: "15:30", type: "video", completed: false },
      { id: 5, title: "Basic Program Structure", duration: "9:15", type: "exercise", completed: false }
    ]
  },
  {
    id: 2,
    title: "Basic Data Types and Variables",
    lessons: [
      { id: 6, title: "Variables and Constants", duration: "11:40", type: "video", completed: false },
      { id: 7, title: "Integer Data Types", duration: "13:20", type: "video", completed: false },
      { id: 8, title: "Floating Point Numbers", duration: "10:50", type: "video", completed: false },
      { id: 9, title: "Character Data Type", duration: "8:30", type: "video", completed: false },
      { id: 10, title: "Type Conversion and Casting", duration: "14:15", type: "exercise", completed: false }
    ]
  },
  {
    id: 3,
    title: "Input and Output Operations",
    lessons: [
      { id: 11, title: "printf() Function", duration: "12:30", type: "video", completed: false },
      { id: 12, title: "scanf() Function", duration: "14:20", type: "video", completed: false },
      { id: 13, title: "Format Specifiers", duration: "16:40", type: "video", completed: false },
      { id: 14, title: "File Input/Output Basics", duration: "18:30", type: "video", completed: false },
      { id: 15, title: "I/O Practice Exercises", duration: "20:00", type: "exercise", completed: false }
    ]
  },
  {
    id: 4,
    title: "Control Structures",
    lessons: [
      { id: 16, title: "Conditional Statements (if-else)", duration: "15:20", type: "video", completed: false },
      { id: 17, title: "Switch Case Statements", duration: "12:45", type: "video", completed: false },
      { id: 18, title: "Loops - for, while, do-while", duration: "18:30", type: "video", completed: false },
      { id: 19, title: "Nested Loops and Patterns", duration: "16:20", type: "video", completed: false },
      { id: 20, title: "Loop Control: break and continue", duration: "10:30", type: "exercise", completed: false }
    ]
  },
  {
    id: 5,
    title: "Arrays and Strings",
    lessons: [
      { id: 21, title: "Introduction to Arrays", duration: "14:30", type: "video", completed: false },
      { id: 22, title: "Multi-dimensional Arrays", duration: "16:45", type: "video", completed: false },
      { id: 23, title: "String Handling in C", duration: "18:20", type: "video", completed: false },
      { id: 24, title: "String Functions Library", duration: "15:30", type: "video", completed: false },
      { id: 25, title: "Array and String Projects", duration: "25:00", type: "project", completed: false }
    ]
  },
  {
    id: 6,
    title: "Functions and Scope",
    lessons: [
      { id: 26, title: "Function Basics", duration: "13:40", type: "video", completed: false },
      { id: 27, title: "Function Parameters and Return Values", duration: "15:30", type: "video", completed: false },
      { id: 28, title: "Local vs Global Variables", duration: "12:20", type: "video", completed: false },
      { id: 29, title: "Recursive Functions", duration: "17:45", type: "video", completed: false },
      { id: 30, title: "Function Library Creation", duration: "20:00", type: "project", completed: false }
    ]
  },
  {
    id: 7,
    title: "Pointers and Memory Management",
    lessons: [
      { id: 31, title: "Introduction to Pointers", duration: "16:30", type: "video", completed: false },
      { id: 32, title: "Pointer Arithmetic", duration: "14:20", type: "video", completed: false },
      { id: 33, title: "Dynamic Memory Allocation", duration: "18:45", type: "video", completed: false },
      { id: 34, title: "Pointers and Arrays", duration: "15:30", type: "video", completed: false },
      { id: 35, title: "Memory Management Project", duration: "30:00", type: "project", completed: false }
    ]
  }
]

const projects = [
  {
    id: 1,
    title: "Calculator Program",
    description: "Build a basic calculator with arithmetic operations",
    difficulty: "Easy",
    estimatedTime: "2 hours"
  },
  {
    id: 2,
    title: "Grade Management System",
    description: "Create a student grade tracking system using arrays",
    difficulty: "Medium",
    estimatedTime: "4 hours"
  },
  {
    id: 3,
    title: "Text File Processor",
    description: "Build a program to read, modify, and write text files",
    difficulty: "Medium",
    estimatedTime: "3 hours"
  },
  {
    id: 4,
    title: "Library Management System",
    description: "Comprehensive system using structures and file handling",
    difficulty: "Hard",
    estimatedTime: "8 hours"
  },
  {
    id: 5,
    title: "Dynamic Memory Allocator",
    description: "Implement custom memory allocation functions",
    difficulty: "Expert",
    estimatedTime: "6 hours"
  },
  {
    id: 6,
    title: "Mini Compiler",
    description: "Build a simple compiler for basic arithmetic expressions",
    difficulty: "Expert",
    estimatedTime: "12 hours"
  }
]

export default function CProgrammingCoursePage() {
  const [activeTab, setActiveTab] = useState('lessons')
  const [expandedModule, setExpandedModule] = useState<number | null>(1)

  const completedLessons = modules.reduce((acc, module) => 
    acc + module.lessons.filter(lesson => lesson.completed).length, 0
  )
  const progressPercentage = (completedLessons / courseData.totalLessons) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/courses" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Link>
        </div>
      </div>

      {/* Course Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{courseData.title}</h1>
              <p className="text-xl mb-6 text-blue-100">{courseData.description}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-400" />
                  <span className="font-semibold">{courseData.rating}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{courseData.students} students</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{courseData.duration}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{courseData.totalLessons} lessons</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold">{Math.round(progressPercentage)}%</div>
                  <div className="text-sm text-blue-100">Complete</div>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                  <div 
                    className="bg-white rounded-full h-2 transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-blue-100">
                  {completedLessons} of {courseData.totalLessons} lessons completed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('lessons')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'lessons'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Lessons
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'projects'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Projects
            </button>
          </nav>
        </div>

        {/* Lessons Tab */}
        {activeTab === 'lessons' && (
          <div className="space-y-6">
            {modules.map((module) => (
              <div key={module.id} className="bg-white rounded-lg shadow-sm border">
                <button
                  onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                    <p className="text-sm text-gray-500">
                      {module.lessons.length} lessons • {module.lessons.filter(l => l.completed).length} completed
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-sm font-semibold text-blue-600">{module.id}</span>
                    </div>
                    <div className={`transform transition-transform ${expandedModule === module.id ? 'rotate-180' : ''}`}>
                      ▼
                    </div>
                  </div>
                </button>
                
                {expandedModule === module.id && (
                  <div className="px-6 pb-4">
                    <div className="space-y-3">
                      {module.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
                        >
                          <div className="flex items-center">
                            {lesson.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                            ) : lesson.type === 'video' ? (
                              <Play className="h-5 w-5 text-blue-500 mr-3" />
                            ) : lesson.type === 'exercise' ? (
                              <Code className="h-5 w-5 text-purple-500 mr-3" />
                            ) : (
                              <FileText className="h-5 w-5 text-orange-500 mr-3" />
                            )}
                            <div>
                              <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                              <p className="text-sm text-gray-500 capitalize">{lesson.type}</p>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {lesson.duration}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    project.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    project.difficulty === 'Hard' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {project.difficulty}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {project.estimatedTime}
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Start Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
