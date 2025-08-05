import Link from "next/link"
import { Clock, Users, Star, Trophy, Play, CheckCircle, Lock, Book, Code, Video, FileText } from "lucide-react"

// This would typically come from a database or API
const courseData = {
  1: {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Learn the basics of JavaScript programming from variables to functions and beyond.",
    level: "Beginner",
    duration: "6 weeks",
    students: "15,234",
    rating: 4.8,
    instructor: "Sarah Johnson",
    instructorAvatar: "/api/placeholder/60/60",
    instructorBio: "Senior Frontend Developer at Google with 8+ years of experience",
    price: "Free",
    totalLessons: 24,
    totalProjects: 3,
    whatYouWillLearn: [
      "JavaScript syntax and basic programming concepts",
      "Variables, data types, and operators",
      "Functions and scope management",
      "Arrays and objects manipulation",
      "DOM manipulation and event handling",
      "Asynchronous programming with promises",
      "Modern ES6+ features and best practices"
    ],
    modules: [
      {
        id: 1,
        title: "Getting Started with JavaScript",
        lessons: [
          {
            id: 1,
            title: "What is JavaScript?",
            type: "video",
            duration: "10 min",
            completed: true,
            description: "Introduction to JavaScript and its role in web development"
          },
          {
            id: 2,
            title: "Setting up your development environment",
            type: "video",
            duration: "15 min",
            completed: true,
            description: "Installing VS Code, browsers, and developer tools"
          },
          {
            id: 3,
            title: "Your first JavaScript program",
            type: "interactive",
            duration: "20 min",
            completed: false,
            description: "Write and run your first JavaScript code"
          },
          {
            id: 4,
            title: "Understanding the console",
            type: "interactive",
            duration: "15 min",
            completed: false,
            description: "Learn to use browser developer tools and console"
          }
        ]
      },
      {
        id: 2,
        title: "Variables and Data Types",
        lessons: [
          {
            id: 5,
            title: "Variables: let, const, and var",
            type: "video",
            duration: "18 min",
            completed: false,
            description: "Understanding different ways to declare variables"
          },
          {
            id: 6,
            title: "Primitive data types",
            type: "interactive",
            duration: "25 min",
            completed: false,
            description: "Numbers, strings, booleans, null, undefined, and symbols"
          },
          {
            id: 7,
            title: "Type conversion and coercion",
            type: "interactive",
            duration: "30 min",
            completed: false,
            description: "How JavaScript handles different data types"
          },
          {
            id: 8,
            title: "Practice: Variable playground",
            type: "exercise",
            duration: "45 min",
            completed: false,
            description: "Hands-on exercises with variables and data types"
          }
        ]
      },
      {
        id: 3,
        title: "Operators and Expressions",
        lessons: [
          {
            id: 9,
            title: "Arithmetic operators",
            type: "video",
            duration: "12 min",
            completed: false,
            description: "Math operations in JavaScript"
          },
          {
            id: 10,
            title: "Comparison and logical operators",
            type: "interactive",
            duration: "20 min",
            completed: false,
            description: "Making decisions with operators"
          },
          {
            id: 11,
            title: "Assignment operators",
            type: "interactive",
            duration: "15 min",
            completed: false,
            description: "Different ways to assign values"
          },
          {
            id: 12,
            title: "Operator precedence",
            type: "reading",
            duration: "10 min",
            completed: false,
            description: "Understanding order of operations"
          }
        ]
      },
      {
        id: 4,
        title: "Control Flow",
        lessons: [
          {
            id: 13,
            title: "Conditional statements: if, else if, else",
            type: "video",
            duration: "22 min",
            completed: false,
            description: "Making decisions in your code"
          },
          {
            id: 14,
            title: "Switch statements",
            type: "interactive",
            duration: "18 min",
            completed: false,
            description: "Alternative to multiple if statements"
          },
          {
            id: 15,
            title: "Ternary operator",
            type: "interactive",
            duration: "12 min",
            completed: false,
            description: "Shorthand conditional expressions"
          },
          {
            id: 16,
            title: "Project: Number guessing game",
            type: "project",
            duration: "90 min",
            completed: false,
            description: "Build your first interactive JavaScript game"
          }
        ]
      },
      {
        id: 5,
        title: "Loops and Iteration",
        lessons: [
          {
            id: 17,
            title: "For loops",
            type: "video",
            duration: "20 min",
            completed: false,
            description: "Repeating code execution"
          },
          {
            id: 18,
            title: "While and do-while loops",
            type: "interactive",
            duration: "18 min",
            completed: false,
            description: "Condition-based loops"
          },
          {
            id: 19,
            title: "Break and continue statements",
            type: "interactive",
            duration: "15 min",
            completed: false,
            description: "Controlling loop execution"
          },
          {
            id: 20,
            title: "Nested loops",
            type: "interactive",
            duration: "25 min",
            completed: false,
            description: "Loops within loops"
          }
        ]
      },
      {
        id: 6,
        title: "Functions",
        lessons: [
          {
            id: 21,
            title: "Function declarations and expressions",
            type: "video",
            duration: "25 min",
            completed: false,
            description: "Creating reusable code blocks"
          },
          {
            id: 22,
            title: "Parameters and arguments",
            type: "interactive",
            duration: "20 min",
            completed: false,
            description: "Passing data to functions"
          },
          {
            id: 23,
            title: "Return statements",
            type: "interactive",
            duration: "18 min",
            completed: false,
            description: "Getting results from functions"
          },
          {
            id: 24,
            title: "Final Project: Calculator app",
            type: "project",
            duration: "120 min",
            completed: false,
            description: "Build a fully functional calculator"
          }
        ]
      }
    ]
  }
}

const getLessonIcon = (type: string) => {
  switch (type) {
    case "video":
      return Video
    case "interactive":
      return Code
    case "reading":
      return FileText
    case "exercise":
      return Trophy
    case "project":
      return Book
    default:
      return Play
  }
}

interface CourseDetailPageProps {
  params: {
    id: string
  }
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const course = courseData[parseInt(params.id) as keyof typeof courseData]
  
  if (!course) {
    return <div>Course not found</div>
  }

  const completedLessons = course.modules.flatMap(m => m.lessons).filter(l => l.completed).length
  const progressPercentage = Math.round((completedLessons / course.totalLessons) * 100)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Course Header */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  course.level === "Beginner" 
                    ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    : course.level === "Intermediate"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                }`}>
                  {course.level}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  {course.price}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {course.title}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                {course.description}
              </p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {course.students} students
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-400" />
                  {course.rating}
                </div>
                <div className="flex items-center">
                  <Book className="h-4 w-4 mr-1" />
                  {course.totalLessons} lessons
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Course Progress</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{completedLessons}/{course.totalLessons} completed</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">{progressPercentage}% complete</span>
              </div>

              {/* Instructor Info */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Instructor</h3>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{course.instructor}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{course.instructorBio}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">What you'll learn</h3>
                <ul className="space-y-3 mb-6">
                  {course.whatYouWillLearn.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    {course.price === "Free" ? "Start Learning" : "Enroll Now"}
                  </button>
                  <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Course Content</h2>
        
        <div className="space-y-6">
          {course.modules.map((module) => (
            <div key={module.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Module {module.id}: {module.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {module.lessons.length} lessons
                </p>
              </div>
              
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {module.lessons.map((lesson) => {
                  const Icon = getLessonIcon(lesson.type)
                  return (
                    <Link
                      key={lesson.id}
                      href={`/courses/${course.id}/lesson/${lesson.id}`}
                      className="flex items-center p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center flex-1">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 mr-4">
                          {lesson.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : lesson.id <= 2 ? (
                            <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          ) : (
                            <Lock className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {lesson.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {lesson.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className={`text-xs px-2 py-1 rounded ${
                              lesson.type === "video" ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400" :
                              lesson.type === "interactive" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400" :
                              lesson.type === "project" ? "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400" :
                              lesson.type === "exercise" ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" :
                              "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                            }`}>
                              {lesson.type}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {lesson.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <Play className="h-5 w-5 text-gray-400" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
