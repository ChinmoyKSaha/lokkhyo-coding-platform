# 🚀 One-Click Deployment Guide

## Quick Deploy (15 minutes total)

### Step 1: Database Setup (5 minutes)
1. **Create Supabase account**: https://supabase.com
2. **New Project** → Name: `coding-platform`
3. **Copy database URL** from Settings → Database
4. **Run SQL schema** (copy from VERCEL-SUPABASE-DEPLOY.md)

### Step 2: Code Repository (2 minutes)
```bash
git add .
git commit -m "Deploy coding platform"
git remote add origin https://github.com/YOUR-USERNAME/coding-platform.git
git push -u origin main
```

### Step 3: Vercel Deployment (3 minutes)
```bash
# Windows
./deploy-vercel.bat

# Mac/Linux
chmod +x deploy-vercel.sh && ./deploy-vercel.sh
```

### Step 4: Environment Variables (5 minutes)
1. **Open**: https://vercel.com/dashboard
2. **Go to**: Your project → Settings → Environment Variables
3. **Add these variables**:
   ```
   DATABASE_URL = [Your Supabase URL]
   NEXTAUTH_SECRET = [Random 32-char string]
   NEXTAUTH_URL = https://your-app.vercel.app
   JWT_SECRET = [Another random 32-char string]
   ```
4. **Redeploy**: Trigger new deployment

## 🎉 Done! Your app is live!

Visit: `https://your-app.vercel.app`

### Test Checklist:
- [ ] Homepage loads
- [ ] `/api/health` returns success
- [ ] User registration works
- [ ] Login with demo user: `demo@example.com` / `password`
- [ ] Problems page loads
- [ ] Code editor works

### Free Benefits with GitHub Student Pack:
- ✅ **Vercel Pro**: $150/year value
- ✅ **Free domain**: .me domain from Namecheap
- ✅ **Monitoring**: DataDog, Sentry
- ✅ **Database**: Supabase 500MB free
- ✅ **Total cost**: $0/month

## 🔧 Need Help?

1. **Check logs**: Vercel dashboard → Functions → View logs
2. **Database issues**: Supabase dashboard → Logs
3. **Environment vars**: Make sure all are set correctly
4. **Build errors**: Try `vercel --force` to rebuild

Your professional coding platform is now live! 🚀
