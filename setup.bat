@echo off
echo 🚀 Setting up your coding platform for development...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run this script from the project root directory.
    pause
    exit /b 1
)

echo 📦 Installing dependencies...
call npm install

echo 🗄️ Setting up environment file...
if not exist ".env.local" (
    echo DATABASE_URL=mock://localhost:5432/coding_platform > .env.local
    echo JWT_SECRET=development-secret-key-change-in-production >> .env.local
    echo NEXTAUTH_SECRET=nextauth-secret-key-change-in-production >> .env.local
    echo NEXTAUTH_URL=http://localhost:3000 >> .env.local
    echo ✅ Created .env.local with development settings
) else (
    echo ✅ .env.local already exists
)

echo.
echo 🎉 Setup complete!
echo.
echo � To start the development server:
echo    npm run dev
echo.
echo 🌐 Your app will be available at:
echo    http://localhost:3000
echo.
echo 🧪 Test the backend by:
echo    1. Go to http://localhost:3000
echo    2. Click 'Sign In' → 'Create Account'
echo    3. Register with any email/password
echo    4. Try the demo login: demo@example.com / password
echo.
echo 📝 Note: Currently using mock database for development.
echo     To use a real database, update DATABASE_URL in .env.local
echo.
pause
