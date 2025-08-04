# 🚀 QUICK START - Get Your Backend Running in 5 Minutes!

## Step 1: Setup (2 minutes)
```bash
# Windows Users:
./setup.bat

# Mac/Linux Users:
chmod +x dev-setup.sh && ./dev-setup.sh
```

## Step 2: Start Server (1 minute)
```bash
npm run dev
```

## Step 3: Test Backend (2 minutes)

### ✅ Test 1: API Health Check
Open browser: `http://localhost:3000/api/health`
Should see: `{"status": "success", "message": "Backend API is working!"}`

### ✅ Test 2: Authentication
1. Go to: `http://localhost:3000`
2. Click "Sign In" → "Create Account"
3. Register with any email/password
4. Should automatically log you in!

### ✅ Test 3: Demo Login
1. Go to sign in page
2. Use: `demo@example.com` / `password`
3. Should log in successfully!

## 🎉 You're Done!

Your backend is now running with:
- ✅ User authentication (register/login/logout)
- ✅ JWT token management
- ✅ Protected API routes
- ✅ User progress tracking
- ✅ Problems API ready
- ✅ Code execution API structure
- ✅ Mock database for development

## 🔧 Current Features Working:

### Authentication System
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - User login  
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

### Problems & Progress
- `GET /api/problems` - List coding problems
- `POST /api/user/progress` - Update user XP/level
- `POST /api/execute` - Code execution (structure ready)

### Frontend Integration
- User registration/login forms work
- Authentication state management
- Protected routes and pages
- User progress display

## 🗄️ Database Status

**Currently using:** Mock database (perfect for development)
**Data persists:** During the session only
**Demo user:** `demo@example.com` / `password`

## 🚀 Ready for Production?

To upgrade to a real database:
1. Follow the full [DEPLOYMENT.md](./DEPLOYMENT.md) guide
2. Set up PostgreSQL (Supabase/Railway)
3. Update `DATABASE_URL` in `.env.local`
4. Run: `npx prisma db push && npm run db:seed`

## 💡 Pro Tips

1. **Check API status anytime:** Visit `/api/health`
2. **Debug issues:** Check browser console + terminal logs
3. **Reset auth:** Clear browser cookies
4. **Different port:** Use `npm run dev -- --port 3001`

## 🆘 Having Issues?

1. **Can't access localhost:3000?**
   - Check if port is free: `npx kill-port 3000`
   - Try: `npm run dev -- --port 3001`

2. **Authentication not working?**
   - Clear browser cookies
   - Check `.env.local` exists
   - Restart dev server

3. **API errors?**
   - Check terminal for error messages
   - Verify `.env.local` has all required variables

**Everything working?** Great! Your coding platform backend is ready! 🎉

**Next:** Deploy to production using GitHub Student Pack benefits (see DEPLOYMENT.md)
