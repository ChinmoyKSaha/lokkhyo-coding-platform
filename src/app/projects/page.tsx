import Link from "next/link"
import { ExternalLink, Github, Star, Eye, GitFork, Calendar } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Todo App with React",
    description: "A full-featured todo application built with React, featuring drag & drop, categories, and local storage.",
    image: "/api/placeholder/400/250",
    author: "Alex Chen",
    authorAvatar: "/api/placeholder/40/40",
    tags: ["React", "JavaScript", "CSS"],
    stars: 342,
    forks: 89,
    views: 1250,
    difficulty: "Beginner",
    createdAt: "2024-01-15",
    liveDemo: "#",
    sourceCode: "#"
  },
  {
    id: 2,
    title: "Weather Dashboard",
    description: "Beautiful weather app with real-time data, forecasts, and interactive maps using OpenWeather API.",
    image: "/api/placeholder/400/250",
    author: "Sarah Johnson",
    authorAvatar: "/api/placeholder/40/40",
    tags: ["Vue.js", "API", "Chart.js"],
    stars: 567,
    forks: 123,
    views: 2100,
    difficulty: "Intermediate",
    createdAt: "2024-01-20",
    liveDemo: "#",
    sourceCode: "#"
  },
  {
    id: 3,
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment integration, admin panel, and inventory management.",
    image: "/api/placeholder/400/250",
    author: "Mike Rodriguez",
    authorAvatar: "/api/placeholder/40/40",
    tags: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    stars: 1234,
    forks: 298,
    views: 5670,
    difficulty: "Advanced",
    createdAt: "2024-02-01",
    liveDemo: "#",
    sourceCode: "#"
  },
  {
    id: 4,
    title: "Chat Application",
    description: "Real-time chat app with Socket.io, user authentication, and message history.",
    image: "/api/placeholder/400/250",
    author: "Emma Wilson",
    authorAvatar: "/api/placeholder/40/40",
    tags: ["Socket.io", "Express", "React"],
    stars: 789,
    forks: 156,
    views: 3200,
    difficulty: "Intermediate",
    createdAt: "2024-02-05",
    liveDemo: "#",
    sourceCode: "#"
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "Responsive portfolio template with animations, contact form, and blog functionality.",
    image: "/api/placeholder/400/250",
    author: "David Kim",
    authorAvatar: "/api/placeholder/40/40",
    tags: ["HTML", "CSS", "JavaScript"],
    stars: 445,
    forks: 167,
    views: 1890,
    difficulty: "Beginner",
    createdAt: "2024-02-10",
    liveDemo: "#",
    sourceCode: "#"
  },
  {
    id: 6,
    title: "Task Management System",
    description: "Kanban-style project management tool with team collaboration features and deadline tracking.",
    image: "/api/placeholder/400/250",
    author: "Lisa Zhang",
    authorAvatar: "/api/placeholder/40/40",
    tags: ["React", "Redux", "Node.js", "PostgreSQL"],
    stars: 923,
    forks: 234,
    views: 4100,
    difficulty: "Advanced",
    createdAt: "2024-02-15",
    liveDemo: "#",
    sourceCode: "#"
  }
]

const categories = ["All", "Web Development", "Mobile Apps", "Games", "Data Science", "Machine Learning"]
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"]
const technologies = ["All", "React", "Vue.js", "Node.js", "Python", "JavaScript", "TypeScript"]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Community Projects
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore amazing projects built by our community. Get inspired and share your own creations.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Difficulty Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Difficulty</h3>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((difficulty) => (
                    <button
                      key={difficulty}
                      className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
              </div>

              {/* Technology Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <button
                      key={tech}
                      className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Project Image */}
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-gray-400 text-center">
                      <div className="text-6xl mb-2">🚀</div>
                      <div className="text-sm">Project Preview</div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.difficulty === "Beginner" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        : project.difficulty === "Intermediate"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                    }`}>
                      {project.difficulty}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Project Info */}
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full mr-3"></div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {project.author}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(project.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        {project.stars}
                      </div>
                      <div className="flex items-center">
                        <GitFork className="h-4 w-4 mr-1" />
                        {project.forks}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {project.views}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Link
                      href={project.liveDemo}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Link>
                    <Link
                      href={project.sourceCode}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Share Your Project
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Built something amazing? Share it with the community and inspire other developers.
          </p>
          <Link
            href="/projects/upload"
            className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Upload Project
          </Link>
        </div>
      </div>
    </div>
  )
}
