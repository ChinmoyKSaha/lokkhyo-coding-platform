import Link from "next/link"
import { Clock, Users, Star, Trophy, Play } from "lucide-react"

const courses = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Learn the basics of JavaScript programming from variables to functions and beyond.",
    image: "/api/placeholder/400/200",
    level: "Beginner",
    duration: "6 weeks",
    students: "15,234",
    rating: 4.8,
    lessons: 24,
    projects: 3,
    price: "Free"
  },
  {
    id: 2,
    title: "C Programming Fundamentals",
    description: "Master the C programming language from basics to advanced concepts. Learn memory management, pointers, and system programming.",
    image: "/api/placeholder/400/200",
    level: "Beginner",
    duration: "8 weeks",
    students: "9,431",
    rating: 4.9,
    lessons: 32,
    projects: 6,
    price: "Free"
  },
  {
    id: 3,
    title: "React Development",
    description: "Build modern web applications with React, hooks, and component-based architecture.",
    image: "/api/placeholder/400/200",
    level: "Intermediate",
    duration: "8 weeks",
    students: "8,452",
    rating: 4.9,
    lessons: 32,
    projects: 5,
    price: "$49"
  },
  {
    id: 4,
    title: "Python for Beginners",
    description: "Start your programming journey with Python, the most beginner-friendly language.",
    image: "/api/placeholder/400/200",
    level: "Beginner",
    duration: "5 weeks",
    students: "22,103",
    rating: 4.7,
    lessons: 20,
    projects: 4,
    price: "Free"
  },
  {
    id: 5,
    title: "Full Stack Development",
    description: "Master both frontend and backend development with Node.js, React, and databases.",
    image: "/api/placeholder/400/200",
    level: "Advanced",
    duration: "12 weeks",
    students: "5,821",
    rating: 4.9,
    lessons: 48,
    projects: 8,
    price: "$99"
  },
  {
    id: 6,
    title: "Data Structures & Algorithms",
    description: "Essential computer science concepts for technical interviews and problem solving.",
    image: "/api/placeholder/400/200",
    level: "Intermediate",
    duration: "10 weeks",
    students: "12,567",
    rating: 4.8,
    lessons: 40,
    projects: 6,
    price: "$79"
  },
  {
    id: 7,
    title: "Machine Learning Basics",
    description: "Introduction to machine learning concepts, algorithms, and practical applications.",
    image: "/api/placeholder/400/200",
    level: "Advanced",
    duration: "14 weeks",
    students: "3,892",
    rating: 4.6,
    lessons: 35,
    projects: 5,
    price: "$129"
  }
]

const filters = ["All", "Beginner", "Intermediate", "Advanced", "Free"]

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Programming Courses
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Learn programming step-by-step with our structured courses designed by industry experts.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {filters.map((filter) => (
              <button
                key={filter}
                className="px-6 py-2 rounded-full text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-12 w-12 text-gray-400" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      course.level === "Beginner" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        : course.level === "Intermediate"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                    }`}>
                      {course.level}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                      {course.price}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400" />
                      {course.rating}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-6">
                    <span>{course.lessons} lessons</span>
                    <span>{course.projects} projects</span>
                  </div>
                  
                  <Link
                    href={course.id === 2 ? "/courses/c-programming" : `/courses/${course.id}`}
                    className="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    {course.price === "Free" ? "Start Learning" : "Enroll Now"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have already started their coding journey with us.
          </p>
          <Link
            href="/problems"
            className="inline-flex items-center px-8 py-3 text-lg font-medium text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900 border border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          >
            <Trophy className="mr-2 h-5 w-5" />
            Try Coding Problems
          </Link>
        </div>
      </div>
    </div>
  )
}
