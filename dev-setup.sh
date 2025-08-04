#!/bin/bash

echo "🚀 Setting up your coding platform for development..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root directory."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🗄️ Setting up environment file..."
if [ ! -f ".env.local" ]; then
    cp .env.local .env.local.backup 2>/dev/null || true
    echo "DATABASE_URL=mock://localhost:5432/coding_platform" > .env.local
    echo "JWT_SECRET=development-secret-key-change-in-production" >> .env.local
    echo "NEXTAUTH_SECRET=nextauth-secret-key-change-in-production" >> .env.local
    echo "NEXTAUTH_URL=http://localhost:3000" >> .env.local
    echo "✅ Created .env.local with development settings"
else
    echo "✅ .env.local already exists"
fi

echo "🎉 Setup complete!"
echo ""
echo "🚀 To start the development server:"
echo "   npm run dev"
echo ""
echo "🌐 Your app will be available at:"
echo "   http://localhost:3000"
echo ""
echo "🧪 Test the backend by:"
echo "   1. Go to http://localhost:3000"
echo "   2. Click 'Sign In' → 'Create Account'"
echo "   3. Register with any email/password"
echo "   4. Try the demo login: demo@example.com / password"
echo ""
echo "📝 Note: Currently using mock database for development."
echo "    To use a real database, update DATABASE_URL in .env.local"
