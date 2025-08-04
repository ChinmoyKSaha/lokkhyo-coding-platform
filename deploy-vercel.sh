#!/bin/bash

echo "🚀 Deploying to Vercel + Supabase..."
echo

echo "Step 1: Installing dependencies..."
npm install

echo
echo "Step 2: Building the project..."
npm run build

echo
echo "Step 3: Installing Vercel CLI..."
npm install -g vercel

echo
echo "Step 4: Deploying to Vercel..."
vercel --prod

echo
echo "✅ Deployment complete!"
echo
echo "📋 Next steps:"
echo "1. Set up Supabase database (see instructions below)"
echo "2. Add environment variables in Vercel dashboard"
echo "3. Configure domain (optional)"
echo
echo "🔗 Open Vercel dashboard: https://vercel.com/dashboard"
echo
