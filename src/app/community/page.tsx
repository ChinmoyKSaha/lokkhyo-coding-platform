import Link from "next/link"
import { MessageCircle, Users, TrendingUp, Calendar, ThumbsUp, Reply, MoreHorizontal } from "lucide-react"

const discussions = [
  {
    id: 1,
    title: "Best practices for React state management in 2024?",
    author: "Alex Thompson",
    authorAvatar: "/api/placeholder/40/40",
    category: "React",
    replies: 23,
    likes: 45,
    views: 342,
    timeAgo: "2 hours ago",
    tags: ["React", "State Management", "Redux", "Zustand"],
    excerpt: "I'm working on a large React application and wondering what the current best practices are for state management. Should I stick with Redux or try something like Zustand?"
  },
  {
    id: 2,
    title: "How to optimize Python performance for data processing?",
    author: "Sarah Chen",
    authorAvatar: "/api/placeholder/40/40",
    category: "Python",
    replies: 18,
    likes: 67,
    views: 789,
    timeAgo: "4 hours ago",
    tags: ["Python", "Performance", "Data Processing", "NumPy"],
    excerpt: "Working with large datasets and need to improve processing speed. What are the best techniques and libraries for optimizing Python performance?"
  },
  {
    id: 3,
    title: "TypeScript vs JavaScript: When to make the switch?",
    author: "Mike Rodriguez",
    authorAvatar: "/api/placeholder/40/40",
    category: "JavaScript",
    replies: 34,
    likes: 89,
    views: 1245,
    timeAgo: "6 hours ago",
    tags: ["TypeScript", "JavaScript", "Development"],
    excerpt: "Our team is considering migrating from JavaScript to TypeScript. What are the main benefits and challenges we should consider?"
  },
  {
    id: 4,
    title: "Building responsive layouts with CSS Grid vs Flexbox",
    author: "Emma Wilson",
    authorAvatar: "/api/placeholder/40/40",
    category: "CSS",
    replies: 12,
    likes: 34,
    views: 567,
    timeAgo: "8 hours ago",
    tags: ["CSS", "Grid", "Flexbox", "Responsive Design"],
    excerpt: "When should I use CSS Grid versus Flexbox for building responsive layouts? Are there specific use cases where one is clearly better?"
  },
  {
    id: 5,
    title: "Database design patterns for scalable applications",
    author: "David Park",
    authorAvatar: "/api/placeholder/40/40",
    category: "Database",
    replies: 27,
    likes: 78,
    views: 923,
    timeAgo: "1 day ago",
    tags: ["Database", "SQL", "NoSQL", "Architecture"],
    excerpt: "Looking for advice on database design patterns that can handle growth from thousands to millions of users. What patterns have worked for you?"
  }
]

const categories = [
  { name: "JavaScript", count: 1234, color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400" },
  { name: "Python", count: 987, color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400" },
  { name: "React", count: 756, color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400" },
  { name: "CSS", count: 543, color: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400" },
  { name: "Node.js", count: 432, color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" },
  { name: "Database", count: 321, color: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400" }
]

const trendingTopics = [
  "AI and Machine Learning",
  "Web3 Development",
  "Mobile App Development",
  "DevOps and Cloud",
  "Frontend Frameworks",
  "Backend APIs"
]

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Developer Community
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Connect with fellow developers, share knowledge, and get help with your coding challenges.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Recent Discussions
                </h2>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-sm font-medium">
                  {discussions.length} active
                </span>
              </div>
              <Link
                href="/community/new"
                className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Start Discussion
              </Link>
            </div>

            {/* Discussions List */}
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex-shrink-0"></div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {discussion.author}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          in
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${discussion.category === 'React' ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400' : discussion.category === 'Python' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                          {discussion.category}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {discussion.timeAgo}
                        </span>
                      </div>
                      
                      <Link href={`/community/discussion/${discussion.id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {discussion.title}
                        </h3>
                      </Link>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                        {discussion.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {discussion.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {discussion.likes}
                          </div>
                          <div className="flex items-center">
                            <Reply className="h-4 w-4 mr-1" />
                            {discussion.replies} replies
                          </div>
                          <div className="flex items-center">
                            <span>{discussion.views} views</span>
                          </div>
                        </div>
                        
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Community Stats */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Community Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Total Members</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">25,430</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Online Now</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Discussions</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">8,567</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Today's Posts</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">89</span>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Popular Categories
              </h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={`/community/category/${category.name.toLowerCase()}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${category.color}`}>
                      {category.name}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {category.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Trending Topics
              </h3>
              <div className="space-y-2">
                {trendingTopics.map((topic, index) => (
                  <Link
                    key={topic}
                    href={`/community/topic/${topic.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block p-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
                  >
                    {index + 1}. {topic}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
