# 🎓 GitHub Student Pack Deployment Guide

## 🌟 Best Hosting Options with Student Pack

### ✅ **RECOMMENDED: Vercel + Supabase** (Free/Upgraded)
- **Vercel Pro**: FREE with Student Pack (normally $20/month)
- **Supabase**: Free tier with generous limits
- **Perfect for**: Next.js apps with database
- **Setup time**: 10 minutes

### 🔄 **Alternative: Railway** (Credits)
- **Railway**: $5/month in credits
- **All-in-one**: Database + hosting
- **Perfect for**: Full-stack apps

### 🛠 **Advanced: DigitalOcean** (Credits)
- **Credits**: $100 for 12 months
- **Full control**: VPS hosting
- **Perfect for**: Custom deployments

---

## 🚀 Quick Deploy: Vercel + Supabase

### Step 1: Setup Supabase (5 min)
```bash
# 1. Go to https://supabase.com
# 2. Sign up with GitHub
# 3. Create new project: "lokkhyo-platform"
# 4. Save your DATABASE_URL and password
```

### Step 2: Deploy to Vercel (3 min)
```bash
# Push to GitHub first
git add .
git commit -m "Ready for deployment"
git push origin main

# Then deploy to Vercel
# 1. Go to https://vercel.com
# 2. Sign up with GitHub (gets you Pro with Student Pack)
# 3. Import your GitHub repository
# 4. Vercel will auto-detect Next.js settings
```

### Step 3: Configure Environment Variables
In Vercel Dashboard → Settings → Environment Variables:

```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres
JWT_SECRET=your-super-secret-jwt-key-32-chars-long
NEXTAUTH_SECRET=your-nextauth-secret-32-chars-long
NEXTAUTH_URL=https://your-app.vercel.app
```

### Step 4: Setup Database Schema
In Supabase Dashboard → SQL Editor, run:
```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (simplified for quick setup)
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    xp INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Problems table (simplified for quick setup)  
CREATE TABLE problems (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    difficulty VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🎯 Student Pack Benefits

### Vercel Pro Features (FREE):
- ✅ Unlimited personal projects
- ✅ 100GB bandwidth/month
- ✅ Advanced analytics
- ✅ Team collaboration
- ✅ Commercial usage allowed

### GitHub Features:
- ✅ Unlimited private repositories
- ✅ GitHub Actions minutes
- ✅ GitHub Packages
- ✅ Advanced security features

### Other Tools Available:
- **MongoDB Atlas**: $50 credit
- **Namecheap**: Free .me domain
- **Canva**: Pro account
- **Figma**: Professional features

---

## 🔧 Troubleshooting

### Common Issues:
1. **Build fails**: Check `npm run vercel-build` locally first
2. **Database errors**: Verify connection strings
3. **Environment variables**: Must be set in Vercel dashboard
4. **Domain issues**: Check NEXTAUTH_URL matches deployment URL

### Debug Commands:
```bash
# Test build locally
npm run vercel-build

# Check database connection
npx prisma db push

# Verify environment
npm run type-check
```

---

## 📱 Going Live Checklist

- [ ] Code pushed to GitHub
- [ ] Supabase project created
- [ ] Database schema deployed
- [ ] Vercel project imported
- [ ] Environment variables set
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (auto)
- [ ] Performance tested

## 🎉 Your app is now live!

Access your deployed app at: `https://your-app.vercel.app`

### Next Steps:
1. Set up custom domain (Namecheap free .me domain)
2. Configure analytics (Vercel Pro included)
3. Set up monitoring (Sentry free with Student Pack)
4. Add CI/CD workflows (GitHub Actions included)
