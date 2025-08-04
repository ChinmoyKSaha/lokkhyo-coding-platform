#!/bin/bash

echo "🚀 Setting up your coding platform backend..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install @prisma/client prisma jsonwebtoken bcryptjs @types/jsonwebtoken @types/bcryptjs tsx

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
npx prisma generate

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Set up your PostgreSQL database (see DEPLOYMENT.md)"
echo "2. Update your .env.local with the database URL"
echo "3. Run: npx prisma db push"
echo "4. Run: npm run db:seed"
echo "5. Run: npm run dev"
