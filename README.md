# CodePlatform - Modern Coding Education Platform

A comprehensive coding platform built with Next.js, TypeScript, and Tailwind CSS. Features interactive code editing, structured courses, coding challenges, and a vibrant community.

## 🚀 Features

### 📚 Learning Platform
- **Interactive Courses**: Step-by-step programming courses with hands-on exercises
- **Coding Problems**: Hundreds of programming challenges from beginner to advanced
- **Project Gallery**: Community-driven projects with live demos and source code
- **Progress Tracking**: Monitor your learning journey and achievements

### 💻 Code Editor
- **Monaco Editor Integration**: Professional-grade code editor with syntax highlighting
- **Multi-language Support**: JavaScript, TypeScript, Python, Java, C++, and more
- **Real-time Execution**: Run code directly in the browser
- **Theme Customization**: Dark, light, and high-contrast themes

### 👥 Community Features
- **Discussion Forums**: Ask questions and share knowledge
- **Project Sharing**: Showcase your work and get feedback
- **Peer Learning**: Connect with fellow developers worldwide
- **Expert Guidance**: Learn from industry professionals

### 🎨 Modern Design
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Themes**: Comfortable viewing in any environment
- **Accessibility**: WCAG compliant design for all users
- **Smooth Animations**: Engaging user interface with fluid transitions

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Code Editor**: Monaco Editor
- **Icons**: Lucide React
- **UI Components**: Radix UI
- **Development**: ESLint, Turbopack

## 📦 Installation & Backend Setup

### Frontend Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/coding-platform.git
   cd coding-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Backend Setup (Database & Authentication)

3. **Install backend dependencies**
   ```bash
   # Windows
   ./setup.bat

   # macOS/Linux
   chmod +x setup.sh
   ./setup.sh
   ```

4. **Database Setup**
   
   **Option A: Supabase (Recommended)**
   - Go to [Supabase](https://supabase.com/) and create an account
   - Create a new project
   - Copy the database URL from Settings → Database
   
   **Option B: Local PostgreSQL**
   - Install PostgreSQL locally
   - Create a database named `coding_platform`

5. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL="your-postgresql-connection-string"
   JWT_SECRET="your-super-secret-jwt-key-here"
   NEXTAUTH_SECRET="your-nextauth-secret-here"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Optional: Code execution API
   JUDGE0_API_URL="https://judge0-ce.p.rapidapi.com"
   JUDGE0_API_KEY="your-rapidapi-key"
   ```

6. **Initialize Database**
   ```bash
   # Push the schema to your database
   npx prisma db push

   # Seed with sample data
   npm run db:seed
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

8. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Features Available

### ✅ Working Features
- **Authentication**: Register, login, logout with JWT
- **Problems**: Browse, filter, and solve coding problems
- **Code Editor**: Monaco editor with multi-language support
- **Courses**: C Programming course with structured lessons
- **User Progress**: XP system and progress tracking
- **Database**: PostgreSQL with Prisma ORM
- **Real-time UI**: Responsive design with dark/light themes

### 🚧 Coming Soon
- **Code Execution**: Judge0 integration for running code
- **Leaderboards**: User rankings and competitions
- **Discussions**: Problem discussions and community forums
- **Contests**: Timed coding contests
- **Teams**: Collaborative problem solving

## 🚀 Deployment with GitHub Student Pack

### Quick Deploy to Vercel
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/) (free with Student Pack)
3. Import your repository
4. Add environment variables
5. Deploy!

### Database Hosting
- **Railway**: $5/month credit with Student Pack
- **Supabase**: Generous free tier
- **PlanetScale**: Free serverless MySQL

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Database Management
npm run db:generate     # Generate Prisma client
npm run db:push        # Push schema to database
npm run db:seed        # Seed database with sample data
npm run db:migrate     # Create and run migrations
npm run db:reset       # Reset database (⚠️ Deletes all data)
```

## 🛠️ Enhanced Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Code Editor**: Monaco Editor
- **Icons**: Lucide React
- **UI Components**: Custom Radix UI-style components

### Backend
- **API**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens with bcrypt
- **Code Execution**: Judge0 API integration
- **File Upload**: Cloudinary integration (planned)

### Development Tools
- **Linting**: ESLint with TypeScript
- **Database**: Prisma Studio for database management
- **Deployment**: Vercel with automatic CI/CD

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
