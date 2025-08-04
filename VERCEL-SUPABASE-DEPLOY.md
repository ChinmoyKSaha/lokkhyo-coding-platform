# 🚀 Complete Vercel + Supabase Deployment Guide

## Prerequisites
- GitHub Student Developer Pack (for free benefits)
- GitHub account
- Node.js installed locally

## Step 1: Setup Supabase Database (5 minutes)

### 1.1 Create Supabase Project
1. Go to [Supabase](https://supabase.com/)
2. Sign up with GitHub (free account)
3. Click **"New Project"**
4. Choose organization and name your project: `coding-platform`
5. Set a strong database password
6. Choose region closest to your users
7. Click **"Create new project"**

### 1.2 Get Database Connection Details
1. Go to **Settings** → **Database**
2. Scroll down to **Connection string**
3. Copy the **URI** connection string
4. Replace `[YOUR-PASSWORD]` with your actual password

```
postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
```

### 1.3 Setup Database Schema
1. Go to **SQL Editor** in Supabase dashboard
2. Click **"New query"**
3. Copy and paste this schema:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    streak INTEGER DEFAULT 0,
    last_active TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Problems table
CREATE TABLE problems (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    difficulty VARCHAR(50) NOT NULL,
    tags TEXT[] DEFAULT '{}',
    examples JSONB DEFAULT '[]',
    constraints TEXT[] DEFAULT '{}',
    starter_code JSONB DEFAULT '{}',
    solution JSONB,
    test_cases JSONB DEFAULT '[]',
    acceptance FLOAT DEFAULT 0,
    solved INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample problems
INSERT INTO problems (title, slug, description, difficulty, tags, examples, constraints, starter_code, test_cases) VALUES
(
    'Two Sum',
    'two-sum',
    'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    'EASY',
    ARRAY['Array', 'Hash Table'],
    '[{"input": "nums = [2,7,11,15], target = 9", "output": "[0,1]", "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."}]'::jsonb,
    ARRAY['2 ≤ nums.length ≤ 10⁴', '-10⁹ ≤ nums[i] ≤ 10⁹'],
    '{"javascript": "function twoSum(nums, target) {\n    // Write your solution here\n    \n}", "python": "def two_sum(nums, target):\n    # Write your solution here\n    pass"}'::jsonb,
    '[{"input": {"nums": [2, 7, 11, 15], "target": 9}, "expectedOutput": [0, 1]}]'::jsonb
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_problems_difficulty ON problems(difficulty);
CREATE INDEX idx_problems_slug ON problems(slug);
```

4. Click **"Run"** to execute the schema

## Step 2: Deploy to Vercel (3 minutes)

### 2.1 Push Code to GitHub
```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Ready for deployment"

# Create GitHub repository
# Go to https://github.com/new
# Create repository named: coding-platform

# Add remote and push
git remote add origin https://github.com/YOUR-USERNAME/coding-platform.git
git branch -M main
git push -u origin main
```

### 2.2 Deploy with Vercel
```bash
# Option 1: Use deployment script
./deploy-vercel.bat     # Windows
./deploy-vercel.sh      # Mac/Linux

# Option 2: Manual deployment
npm install -g vercel
vercel login
vercel --prod
```

### 2.3 Import from GitHub (Alternative)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Click **"Deploy"**

## Step 3: Configure Environment Variables (2 minutes)

### 3.1 Add Variables in Vercel Dashboard
1. Go to your project in Vercel dashboard
2. Click **Settings** → **Environment Variables**
3. Add these variables:

```env
DATABASE_URL = postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres
DIRECT_URL = postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres
NEXTAUTH_SECRET = your-super-secret-32-char-string-here
NEXTAUTH_URL = https://your-app.vercel.app
JWT_SECRET = another-secret-32-char-string-here
```

### 3.2 Generate Secure Secrets
```bash
# Generate random secrets
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 4: Initialize Production Database (1 minute)

### 4.1 Setup Prisma in Production
```bash
# Install dependencies locally
npm install

# Generate Prisma client
npx prisma generate

# Push schema to Supabase (if not done via SQL Editor)
npx prisma db push
```

### 4.2 Redeploy with Database Connection
```bash
# Trigger new deployment with database
vercel --prod
```

## Step 5: Custom Domain (Optional - FREE with Student Pack)

### 5.1 Get Free Domain
1. Go to [Namecheap Student Pack](https://www.namecheap.com/github-students/)
2. Get free `.me` domain for 1 year
3. Configure DNS:
   - Type: `CNAME`
   - Host: `@`
   - Value: `cname.vercel-dns.com`

### 5.2 Add Domain to Vercel
1. Go to **Settings** → **Domains** in Vercel
2. Add your custom domain
3. Follow DNS configuration instructions

## 🎉 Your App is Live!

### Test Your Deployment
1. **Homepage**: `https://your-app.vercel.app`
2. **API Health**: `https://your-app.vercel.app/api/health`
3. **Authentication**: Register/Login functionality
4. **Database**: User data persists between sessions

### Performance Optimizations
- ✅ **CDN**: Global edge network via Vercel
- ✅ **SSL**: Automatic HTTPS
- ✅ **Caching**: Optimized static assets
- ✅ **Database**: Connection pooling via Supabase

## 📊 Free Tier Limits

### Vercel (with Student Pack)
- **Bandwidth**: 100GB/month
- **Function Executions**: 1M/month
- **Build Minutes**: 6,000/month
- **Projects**: Unlimited

### Supabase Free Tier
- **Database**: 500MB
- **API Requests**: 50,000/month
- **Auth Users**: 50,000
- **Storage**: 1GB
- **Bandwidth**: 2GB

## 🔧 Troubleshooting

### Common Issues:

1. **Build Errors**
   ```bash
   # Clear cache and rebuild
   vercel --force
   ```

2. **Database Connection Issues**
   - Verify DATABASE_URL is correct
   - Check Supabase project is active
   - Ensure environment variables are set

3. **Authentication Not Working**
   - Verify NEXTAUTH_SECRET is set
   - Check NEXTAUTH_URL matches your domain
   - Clear browser cookies

4. **API Errors**
   - Check Function Logs in Vercel dashboard
   - Verify all environment variables
   - Check database schema is created

### Logs and Monitoring
- **Vercel Logs**: Dashboard → Functions → View logs
- **Supabase Logs**: Dashboard → Logs
- **Real-time Errors**: Install Sentry (free with Student Pack)

## 🚀 You're Live!

Your coding platform is now deployed at:
- **Production URL**: `https://your-app.vercel.app`
- **Admin Dashboard**: Vercel + Supabase dashboards
- **Total Cost**: **$0/month** with Student Pack benefits!

### Next Steps:
1. Set up monitoring with Sentry
2. Configure analytics
3. Add code execution with Judge0 API
4. Set up automated backups

**Congratulations!** 🎉 Your professional coding platform is now live!
