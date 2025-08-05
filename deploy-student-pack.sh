#!/bin/bash

# 🎓 GitHub Student Pack Deployment Script
# ========================================

echo "🎓 GitHub Student Pack Deployment Script"
echo "========================================"
echo ""

echo "📋 Pre-deployment checklist:"
echo "[1] GitHub Student Pack activated"
echo "[2] Code ready for deployment"
echo "[3] Supabase project created"
echo "[4] Environment variables ready"
echo ""

read -p "Continue with deployment? (y/n): " continue
if [[ $continue != "y" && $continue != "Y" ]]; then
    echo "Deployment cancelled."
    exit 0
fi

echo ""
echo "🔄 Running pre-deployment checks..."

# Check if we're in a git repository
if ! git status >/dev/null 2>&1; then
    echo "❌ Not in a git repository. Run 'git init' first."
    exit 1
fi

echo "✅ Git repository detected"

# Check if Node.js is installed
if ! command -v node >/dev/null 2>&1; then
    echo "❌ Node.js not found. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js detected"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
if ! npm install; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"

# Test build
echo ""
echo "🔨 Testing build..."
if ! npm run vercel-build; then
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

echo "✅ Build successful"

# Commit and push changes
echo ""
echo "📤 Committing and pushing changes..."
git add .
git commit -m "Ready for deployment - optimized for Student Pack hosting"
if ! git push origin main; then
    echo "❌ Failed to push to GitHub"
    echo "Please check your GitHub remote configuration"
    exit 1
fi

echo "✅ Code pushed to GitHub"

echo ""
echo "🎉 Pre-deployment complete!"
echo ""
echo "📋 Next steps:"
echo "[1] Go to https://vercel.com and sign up with GitHub"
echo "[2] Import your repository"
echo "[3] Set environment variables in Vercel dashboard"
echo "[4] Deploy!"
echo ""
echo "📖 See STUDENT-PACK-DEPLOY.md for detailed instructions"
echo ""
