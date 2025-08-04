@echo off
REM GitHub Integration Deployment Script for Windows
REM Run this script to set up GitHub integration and deploy to Vercel

echo 🚀 GitHub Integration Deployment for Lokkhyo Coding Platform
echo ============================================================

REM Check if git is initialized
if not exist ".git" (
    echo ❌ Git repository not found. Please run 'git init' first.
    pause
    exit /b 1
)

echo 📦 Staging and committing changes...
git add .
git commit -m "Deploy: Complete coding platform with GitHub integration setup"

echo.
echo 📋 Next Steps:
echo ==============
echo.

echo 1. 🐙 CREATE GITHUB REPOSITORY:
echo    • Go to: https://github.com/new
echo    • Repository name: lokkhyo-coding-platform
echo    • Visibility: Public (required for free Vercel)
echo    • Don't initialize with README
echo.

echo 2. 🔗 CONNECT TO GITHUB:
echo    Replace YOUR_USERNAME with your actual GitHub username:
echo    git remote add origin https://github.com/YOUR_USERNAME/lokkhyo-coding-platform.git
echo    git push -u origin main
echo.

echo 3. 🗄️ SETUP SUPABASE DATABASE:
echo    • Go to: https://supabase.com
echo    • Create new project: 'lokkhyo-platform'
echo    • Copy DATABASE_URL from Settings ^> Database
echo.

echo 4. 🚀 DEPLOY TO VERCEL:
echo    • Go to: https://vercel.com
echo    • Click 'New Project'
echo    • Import your GitHub repository
echo    • Add environment variables (see .env.production.template)
echo.

echo 5. 🔧 ENVIRONMENT VARIABLES:
echo    Add these in Vercel dashboard:
type .env.production.template
echo.

echo 6. 🔄 RUN DATABASE MIGRATION:
echo    After Vercel deployment:
echo    vercel env pull .env.local
echo    npx prisma db push
echo.

echo 📖 For detailed instructions, see: GITHUB-DEPLOYMENT.md
echo.
echo 🎉 After setup, every git push will automatically deploy!
echo.

pause
echo Opening GitHub repository creation page...
start https://github.com/new
