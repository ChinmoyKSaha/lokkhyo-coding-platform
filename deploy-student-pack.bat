@echo off
echo 🎓 GitHub Student Pack Deployment Script
echo ========================================

echo.
echo 📋 Pre-deployment checklist:
echo [1] GitHub Student Pack activated
echo [2] Code ready for deployment
echo [3] Supabase project created
echo [4] Environment variables ready
echo.

set /p continue="Continue with deployment? (y/n): "
if /i "%continue%" neq "y" (
    echo Deployment cancelled.
    pause
    exit /b
)

echo.
echo 🔄 Running pre-deployment checks...

REM Check if we're in a git repository
git status >nul 2>&1
if errorlevel 1 (
    echo ❌ Not in a git repository. Run 'git init' first.
    pause
    exit /b 1
)

echo ✅ Git repository detected

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not found. Please install Node.js first.
    pause
    exit /b 1
)

echo ✅ Node.js detected

REM Install dependencies
echo.
echo 📦 Installing dependencies...
npm install
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed

REM Test build
echo.
echo 🔨 Testing build...
npm run vercel-build
if errorlevel 1 (
    echo ❌ Build failed. Please fix errors before deploying.
    pause
    exit /b 1
)

echo ✅ Build successful

REM Commit and push changes
echo.
echo 📤 Committing and pushing changes...
git add .
git commit -m "Ready for deployment - optimized for Student Pack hosting"
git push origin main
if errorlevel 1 (
    echo ❌ Failed to push to GitHub
    echo Please check your GitHub remote configuration
    pause
    exit /b 1
)

echo ✅ Code pushed to GitHub

echo.
echo 🎉 Pre-deployment complete!
echo.
echo 📋 Next steps:
echo [1] Go to https://vercel.com and sign up with GitHub
echo [2] Import your repository
echo [3] Set environment variables in Vercel dashboard
echo [4] Deploy!
echo.
echo 📖 See STUDENT-PACK-DEPLOY.md for detailed instructions
echo.

pause
