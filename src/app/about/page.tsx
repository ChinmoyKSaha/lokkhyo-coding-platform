import { Users, Target, Lightbulb, Heart } from "lucide-react"
import Link from "next/link"

const team = [
  {
    name: "Alex Johnson",
    role: "CEO & Founder",
    image: "/api/placeholder/200/200",
    bio: "Former software engineer at Google with 10+ years of experience in education technology."
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    image: "/api/placeholder/200/200",
    bio: "Full-stack developer and former instructor with expertise in modern web technologies."
  },
  {
    name: "Mike Rodriguez",
    role: "Head of Education",
    image: "/api/placeholder/200/200",
    bio: "Curriculum designer with background in computer science education and online learning."
  },
  {
    name: "Emily Wilson",
    role: "Head of Community",
    image: "/api/placeholder/200/200",
    bio: "Community builder passionate about connecting developers and fostering learning environments."
  }
]

const values = [
  {
    icon: Users,
    title: "Community-Driven",
    description: "We believe learning is better together. Our platform connects developers worldwide to share knowledge and grow together."
  },
  {
    icon: Target,
    title: "Practical Learning",
    description: "Focus on real-world skills through hands-on projects, coding challenges, and interactive exercises."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously evolve our platform with the latest technologies and teaching methodologies."
  },
  {
    icon: Heart,
    title: "Accessibility",
    description: "Quality programming education should be accessible to everyone, regardless of background or location."
  }
]

const stats = [
  { number: "50,000+", label: "Active Learners" },
  { number: "200+", label: "Coding Challenges" },
  { number: "15+", label: "Programming Languages" },
  { number: "98%", label: "Completion Rate" }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About CodePlatform
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We&apos;re on a mission to make programming education accessible, engaging, and effective for developers at every stage of their journey.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  CodePlatform was born from a simple observation: traditional programming education often falls short of preparing developers for real-world challenges. We set out to bridge this gap by creating an interactive learning environment that mirrors the actual development experience.
                </p>
                <p>
                  Founded in 2023 by a team of experienced developers and educators, we&apos;ve built a platform that combines the best of online learning with practical, hands-on coding experience. Our integrated code editor, comprehensive courses, and vibrant community create an ecosystem where learning never stops.
                </p>
                <p>
                  Today, we&apos;re proud to serve over 50,000 developers worldwide, from complete beginners taking their first steps in programming to experienced professionals looking to master new technologies.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                To democratize programming education by providing world-class learning resources that are accessible to everyone, everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              These core principles guide everything we do and shape the experience we create for our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Numbers that reflect our commitment to empowering developers worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The passionate individuals behind CodePlatform, dedicated to transforming how people learn to code.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <div className="text-4xl">👨‍💻</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Join Our Journey
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Be part of a community that&apos;s shaping the future of programming education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Start Learning
            </Link>
            <Link
              href="/community"
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
