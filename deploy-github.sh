#!/bin/bash

# GitHub Integration Deployment Script
# Run this script to set up GitHub integration and deploy to Vercel

echo "🚀 GitHub Integration Deployment for Lokkhyo Coding Platform"
echo "============================================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please run 'git init' first."
    exit 1
fi

# Check for uncommitted changes
if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "📦 Staging and committing changes..."
    git add .
    git commit -m "Deploy: Complete coding platform with GitHub integration setup"
else
    echo "✅ No uncommitted changes found."
fi

echo ""
echo "📋 Next Steps:"
echo "=============="
echo ""

echo "1. 🐙 CREATE GITHUB REPOSITORY:"
echo "   • Go to: https://github.com/new"
echo "   • Repository name: lokkhyo-coding-platform"
echo "   • Visibility: Public (required for free Vercel)"
echo "   • Don't initialize with README"
echo ""

echo "2. 🔗 CONNECT TO GITHUB:"
echo "   Replace YOUR_USERNAME with your actual GitHub username:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/lokkhyo-coding-platform.git"
echo "   git push -u origin main"
echo ""

echo "3. 🗄️ SETUP SUPABASE DATABASE:"
echo "   • Go to: https://supabase.com"
echo "   • Create new project: 'lokkhyo-platform'"
echo "   • Copy DATABASE_URL from Settings > Database"
echo ""

echo "4. 🚀 DEPLOY TO VERCEL:"
echo "   • Go to: https://vercel.com"
echo "   • Click 'New Project'"
echo "   • Import your GitHub repository"
echo "   • Add environment variables (see .env.production.template)"
echo ""

echo "5. 🔧 ENVIRONMENT VARIABLES:"
echo "   Add these in Vercel dashboard:"
cat .env.production.template
echo ""

echo "6. 🔄 RUN DATABASE MIGRATION:"
echo "   After Vercel deployment:"
echo "   vercel env pull .env.local"
echo "   npx prisma db push"
echo ""

echo "📖 For detailed instructions, see: GITHUB-DEPLOYMENT.md"
echo ""
echo "🎉 After setup, every git push will automatically deploy!"
echo ""

read -p "Press Enter to open GitHub repository creation page..." -r
if command -v xdg-open > /dev/null; then
    xdg-open "https://github.com/new"
elif command -v open > /dev/null; then
    open "https://github.com/new"
else
    echo "Please manually open: https://github.com/new"
fi
