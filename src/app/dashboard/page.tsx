'use client'
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Trophy, 
  Medal, 
  Star, 
  Target, 
  Zap, 
  BookOpen, 
  Code, 
  Users,
  TrendingUp,
  Calendar,
  Award,
  Crown,
  Flame
} from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import AuthModal from "@/components/AuthModal"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: string
  points: number
  unlocked: boolean
  unlockedAt?: string
  progress: number
  maxProgress: number
}

interface LeaderboardEntry {
  rank: number
  username: string
  avatar: string
  points: number
  solvedProblems: number
  completedProjects: number
  streak: number
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first coding problem',
    icon: '🎯',
    category: 'Getting Started',
    points: 50,
    unlocked: true,
    unlockedAt: '2024-01-15',
    progress: 1,
    maxProgress: 1
  },
  {
    id: '2',
    title: 'Problem Solver',
    description: 'Solve 10 coding problems',
    icon: '🧩',
    category: 'Problem Solving',
    points: 200,
    unlocked: true,
    unlockedAt: '2024-01-20',
    progress: 10,
    maxProgress: 10
  },
  {
    id: '3',
    title: 'Speed Demon',
    description: 'Solve a problem in under 5 minutes',
    icon: '⚡',
    category: 'Speed',
    points: 150,
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: '4',
    title: 'Project Master',
    description: 'Complete 5 projects',
    icon: '🏗️',
    category: 'Projects',
    points: 500,
    unlocked: false,
    progress: 2,
    maxProgress: 5
  },
  {
    id: '5',
    title: 'Streak Master',
    description: 'Maintain a 7-day coding streak',
    icon: '🔥',
    category: 'Consistency',
    points: 300,
    unlocked: false,
    progress: 3,
    maxProgress: 7
  },
  {
    id: '6',
    title: 'Algorithm Expert',
    description: 'Solve 50 medium difficulty problems',
    icon: '🎓',
    category: 'Expertise',
    points: 1000,
    unlocked: false,
    progress: 12,
    maxProgress: 50
  },
  {
    id: '7',
    title: 'Community Helper',
    description: 'Help 10 other users in the community',
    icon: '🤝',
    category: 'Community',
    points: 250,
    unlocked: false,
    progress: 3,
    maxProgress: 10
  },
  {
    id: '8',
    title: 'Code Perfectionist',
    description: 'Get 100% test case pass rate on 25 problems',
    icon: '💎',
    category: 'Quality',
    points: 750,
    unlocked: false,
    progress: 8,
    maxProgress: 25
  }
]

const leaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    username: 'codemaster_alex',
    avatar: '/api/placeholder/40/40',
    points: 12450,
    solvedProblems: 342,
    completedProjects: 28,
    streak: 45
  },
  {
    rank: 2,
    username: 'sarah_dev',
    avatar: '/api/placeholder/40/40',
    points: 11230,
    solvedProblems: 298,
    completedProjects: 32,
    streak: 23
  },
  {
    rank: 3,
    username: 'mike_algorithms',
    avatar: '/api/placeholder/40/40',
    points: 10890,
    solvedProblems: 267,
    completedProjects: 29,
    streak: 18
  },
  {
    rank: 4,
    username: 'emma_fullstack',
    avatar: '/api/placeholder/40/40',
    points: 9876,
    solvedProblems: 234,
    completedProjects: 26,
    streak: 31
  },
  {
    rank: 5,
    username: 'david_react',
    avatar: '/api/placeholder/40/40',
    points: 9234,
    solvedProblems: 201,
    completedProjects: 24,
    streak: 12
  },
  {
    rank: 6,
    username: 'lisa_python',
    avatar: '/api/placeholder/40/40',
    points: 8765,
    solvedProblems: 189,
    completedProjects: 22,
    streak: 7
  },
  {
    rank: 7,
    username: 'john_javascript',
    avatar: '/api/placeholder/40/40',
    points: 8234,
    solvedProblems: 167,
    completedProjects: 20,
    streak: 15
  },
  {
    rank: 8,
    username: 'anna_frontend',
    avatar: '/api/placeholder/40/40',
    points: 7890,
    solvedProblems: 145,
    completedProjects: 18,
    streak: 9
  },
  {
    rank: 9,
    username: 'mark_backend',
    avatar: '/api/placeholder/40/40',
    points: 7456,
    solvedProblems: 134,
    completedProjects: 16,
    streak: 22
  },
  {
    rank: 10,
    username: 'your_username',
    avatar: '/api/placeholder/40/40',
    points: 6890,
    solvedProblems: 89,
    completedProjects: 8,
    streak: 5
  }
]

const weeklyStats = {
  problemsSolved: 12,
  projectsCompleted: 2,
  hoursSpent: 24,
  streakDays: 5,
  pointsEarned: 450
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { user, isAuthenticated } = useAuth()

  // If user is not authenticated, show sign-in prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <CardTitle>Access Your Dashboard</CardTitle>
            <CardDescription>
              Sign in to track your progress, view achievements, and compete with other developers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full"
              onClick={() => setShowAuthModal(true)}
            >
              Sign In to Continue
            </Button>
          </CardContent>
        </Card>
        
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultMode="signin"
        />
      </div>
    )
  }

  const unlockedAchievements = achievements.filter(a => a.unlocked)
  const totalPoints = user?.points || 0
  const userRank = leaderboard.find(entry => entry.username === user?.username)?.rank || 10

  const weeklyStats = {
    problemsSolved: 12,
    projectsCompleted: user?.completedProjects || 0,
    hoursSpent: 24,
    streakDays: user?.streak || 0,
    pointsEarned: 450
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />
      case 2: return <Medal className="h-5 w-5 text-gray-400" />
      case 3: return <Medal className="h-5 w-5 text-orange-500" />
      default: return <span className="text-sm font-bold">#{rank}</span>
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Getting Started': return <Target className="h-5 w-5" />
      case 'Problem Solving': return <Code className="h-5 w-5" />
      case 'Speed': return <Zap className="h-5 w-5" />
      case 'Projects': return <BookOpen className="h-5 w-5" />
      case 'Consistency': return <Flame className="h-5 w-5" />
      case 'Expertise': return <Star className="h-5 w-5" />
      case 'Community': return <Users className="h-5 w-5" />
      case 'Quality': return <Award className="h-5 w-5" />
      default: return <Trophy className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Your Dashboard
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                Track your progress and compete with others
              </p>
            </div>
            
            <div className="mt-6 lg:mt-0 flex flex-col sm:flex-row gap-4">
              <Card className="min-w-0">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-8 w-8 text-yellow-500" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {totalPoints.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Points</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="min-w-0">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        #{userRank}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Global Rank</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Code className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {weeklyStats.problemsSolved}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Problems This Week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-8 w-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {weeklyStats.projectsCompleted}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Flame className="h-8 w-8 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {weeklyStats.streakDays}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Day Streak</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-8 w-8 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {weeklyStats.hoursSpent}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Hours This Week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Recent Achievements
                  </CardTitle>
                  <CardDescription>
                    Your latest unlocked achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {unlockedAchievements.slice(0, 3).map((achievement) => (
                      <div key={achievement.id} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {achievement.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {achievement.description}
                          </p>
                        </div>
                        <Badge variant="outline">+{achievement.points}</Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Achievements
                  </Button>
                </CardContent>
              </Card>

              {/* Activity Feed */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Your coding activity this week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">
                          Completed "Two Sum" problem
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">
                          Started "Weather Dashboard" project
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">
                          Earned "Problem Solver" achievement
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={`${achievement.unlocked ? 'ring-2 ring-yellow-500' : 'opacity-75'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {achievement.title}
                          </h3>
                          {achievement.unlocked && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              Unlocked
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {achievement.description}
                        </p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Progress</span>
                            <span className="font-medium">
                              {achievement.progress} / {achievement.maxProgress}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-1">
                            {getCategoryIcon(achievement.category)}
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              {achievement.category}
                            </span>
                          </div>
                          <Badge variant="outline">
                            {achievement.points} pts
                          </Badge>
                        </div>
                        
                        {achievement.unlocked && achievement.unlockedAt && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Global Leaderboard
                </CardTitle>
                <CardDescription>
                  Top performers this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((entry) => (
                    <div 
                      key={entry.rank} 
                      className={`flex items-center gap-4 p-4 rounded-lg border ${
                        entry.username === 'your_username' 
                          ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' 
                          : 'bg-gray-50 dark:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center justify-center w-12 h-12">
                        {getRankIcon(entry.rank)}
                      </div>
                      
                      <img 
                        src={entry.avatar} 
                        alt={entry.username}
                        className="w-10 h-10 rounded-full"
                      />
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {entry.username}
                          {entry.username === 'your_username' && (
                            <Badge variant="outline" className="ml-2">You</Badge>
                          )}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span>{entry.solvedProblems} problems</span>
                          <span>{entry.completedProjects} projects</span>
                          <span className="flex items-center gap-1">
                            <Flame className="h-3 w-3" />
                            {entry.streak} day streak
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {entry.points.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Skill Progress</CardTitle>
                  <CardDescription>
                    Your progress in different programming skills
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { skill: 'JavaScript', level: 75, total: 100 },
                      { skill: 'React', level: 60, total: 100 },
                      { skill: 'Python', level: 45, total: 100 },
                      { skill: 'Data Structures', level: 70, total: 100 },
                      { skill: 'Algorithms', level: 55, total: 100 }
                    ].map((item) => (
                      <div key={item.skill}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.skill}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {item.level}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${item.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Goals</CardTitle>
                  <CardDescription>
                    Track your progress towards monthly targets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { goal: 'Solve 20 Problems', current: 12, target: 20 },
                      { goal: 'Complete 3 Projects', current: 2, target: 3 },
                      { goal: 'Learn New Technology', current: 1, target: 2 },
                      { goal: 'Help 5 Community Members', current: 3, target: 5 }
                    ].map((item) => (
                      <div key={item.goal}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.goal}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {item.current} / {item.target}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${(item.current / item.target) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
