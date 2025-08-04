import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const problems = [
  {
    title: "Two Sum",
    slug: "two-sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    difficulty: "EASY",
    tags: ["Array", "Hash Table"],
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
      javascript: `function twoSum(nums, target) {\n    // Write your solution here\n    \n}`,
      python: `def two_sum(nums, target):\n    # Write your solution here\n    pass`,
      java: `public int[] twoSum(int[] nums, int target) {\n    // Write your solution here\n    \n}`
    },
    testCases: [
      {
        input: { nums: [2, 7, 11, 15], target: 9 },
        expectedOutput: [0, 1]
      },
      {
        input: { nums: [3, 2, 4], target: 6 },
        expectedOutput: [1, 2]
      }
    ]
  },
  {
    title: "Add Two Numbers",
    slug: "add-two-numbers",
    description: "You are given two non-empty linked lists representing two non-negative integers. Add the two numbers and return the sum as a linked list.",
    difficulty: "MEDIUM",
    tags: ["Linked List", "Math", "Recursion"],
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807."
      }
    ],
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 ≤ Node.val ≤ 9"
    ],
    starterCode: {
      javascript: `function addTwoNumbers(l1, l2) {\n    // Write your solution here\n    \n}`,
      python: `def addTwoNumbers(l1, l2):\n    # Write your solution here\n    pass`,
      java: `public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n    // Write your solution here\n    \n}`
    },
    testCases: [
      {
        input: { l1: [2,4,3], l2: [5,6,4] },
        expectedOutput: [7,0,8]
      }
    ]
  }
]

const courses = [
  {
    title: "C Programming Fundamentals",
    slug: "c-programming",
    description: "Learn the fundamentals of C programming language from basics to advanced concepts.",
    difficulty: "EASY",
    language: "C",
    modules: [
      {
        id: 1,
        title: "Introduction to C",
        lessons: [
          { id: 1, title: "What is C Programming?", duration: "10 min", completed: false },
          { id: 2, title: "Setting up Development Environment", duration: "15 min", completed: false }
        ]
      },
      {
        id: 2,
        title: "Basic Syntax",
        lessons: [
          { id: 3, title: "Variables and Data Types", duration: "20 min", completed: false },
          { id: 4, title: "Operators", duration: "15 min", completed: false }
        ]
      }
    ]
  }
]

async function main() {
  console.log('Seeding database...')

  // Clear existing data
  await prisma.submission.deleteMany()
  await prisma.userProgress.deleteMany()
  await prisma.problem.deleteMany()
  await prisma.course.deleteMany()
  await prisma.user.deleteMany()

  // Seed problems
  for (const problem of problems) {
    await prisma.problem.create({
      data: {
        ...problem,
        difficulty: problem.difficulty as any
      }
    })
  }

  // Seed courses
  for (const course of courses) {
    await prisma.course.create({
      data: {
        ...course,
        difficulty: course.difficulty as any
      }
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
