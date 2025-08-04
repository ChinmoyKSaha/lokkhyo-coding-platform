# 🧪 Backend Testing Guide

## Quick Test Setup

1. **Run the setup script:**
   ```bash
   # Windows
   ./setup.bat
   
   # macOS/Linux  
   chmod +x dev-setup.sh
   ./dev-setup.sh
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Test the backend API:**
   Open your browser and go to: `http://localhost:3000/api/health`
   
   You should see a JSON response like:
   ```json
   {
     "status": "success",
     "message": "Backend API is working!",
     "endpoints": { ... }
   }
   ```

## 🔐 Authentication Testing

### Test User Registration
1. Go to `http://localhost:3000`
2. Click "Sign In" → "Create Account"
3. Fill in any email/password and register
4. You should be logged in automatically

### Test Demo Login
1. Go to sign in page
2. Use credentials:
   - Email: `demo@example.com`
   - Password: `password`
3. Should log in successfully

### Manual API Testing (using curl or Postman)

**Register a new user:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass","name":"Test User"}'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"password"}'
```

**Get current user (requires login cookie):**
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Cookie: token=your-jwt-token-here"
```

## 🧩 Problems API Testing

**Get problems list:**
```bash
curl -X GET http://localhost:3000/api/problems
```

**Get problems with filters:**
```bash
curl -X GET "http://localhost:3000/api/problems?difficulty=easy&tags=array"
```

## 💻 Code Execution Testing

**Submit code for execution:**
```bash
curl -X POST http://localhost:3000/api/execute \
  -H "Content-Type: application/json" \
  -d '{"code":"console.log(\"Hello World\")", "language":"javascript", "input":""}'
```

## 🛠️ Troubleshooting

### Common Issues:

1. **Port 3000 already in use:**
   ```bash
   # Kill process using port 3000
   npx kill-port 3000
   # or use a different port
   npm run dev -- --port 3001
   ```

2. **Module not found errors:**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Environment variables not working:**
   - Check if `.env.local` exists in the root directory
   - Restart the development server after changing environment variables

4. **Authentication not working:**
   - Check browser console for errors
   - Verify JWT_SECRET is set in `.env.local`
   - Clear browser cookies and try again

### Debug Mode

To see detailed logs, add this to your `.env.local`:
```env
NODE_ENV=development
DEBUG=true
```

### Database Connection (Optional)

If you want to use a real database instead of mocks:

1. **Set up PostgreSQL** (local or cloud)
2. **Update DATABASE_URL** in `.env.local`:
   ```env
   DATABASE_URL="postgresql://username:password@host:5432/database"
   ```
3. **Install Prisma dependencies:**
   ```bash
   npm install @prisma/client prisma
   ```
4. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```
5. **Push schema to database:**
   ```bash
   npx prisma db push
   ```
6. **Seed with sample data:**
   ```bash
   npm run db:seed
   ```

## ✅ Expected Behavior

When everything is working correctly:

1. **Homepage loads** without errors
2. **Authentication works** - you can register and login
3. **Problems page shows** coding challenges
4. **Code editor loads** with syntax highlighting
5. **API endpoints respond** with proper JSON
6. **No console errors** in browser developer tools

## 🎯 Next Steps

Once basic backend is working:

1. **Connect real database** for persistence
2. **Add Judge0 API key** for code execution
3. **Deploy to production** using the deployment guide
4. **Add more features** like discussions, contests, etc.

## 📞 Getting Help

If you encounter issues:

1. Check the browser console for JavaScript errors
2. Check the terminal for server-side errors
3. Verify all environment variables are set
4. Make sure you're running the latest version of Node.js
5. Try clearing browser cache and cookies

The backend is now ready for development! 🎉
