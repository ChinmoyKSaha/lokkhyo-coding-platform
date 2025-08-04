# 🚀 GitHub Integration Deployment Guide

## Overview
Deploy your coding platform to Vercel with seamless GitHub integration for automatic deployments on every push.

## Prerequisites
- GitHub account with Student Developer Pack
- Vercel account (free tier with GitHub Student Pack benefits)
- Supabase account (free tier)

## Step 1: Push to GitHub Repository

### Option A: Create New Repository on GitHub
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `lokkhyo-coding-platform`
3. Make it **Public** (required for free Vercel deployments)
4. Don't initialize with README (we already have files)

### Option B: Use GitHub CLI (if installed)
```bash
gh repo create lokkhyo-coding-platform --public --source=. --remote=origin --push
```

### Manual Setup (if using Option A)
```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/lokkhyo-coding-platform.git

# Stage all files
git add .

# Commit changes
git commit -m "Initial commit: Complete coding platform with authentication and deployment setup"

# Push to GitHub
git push -u origin main
```

## Step 2: Set Up Supabase Database

1. Go to [Supabase](https://supabase.com)
2. Sign up with GitHub account
3. Create new project:
   - Project name: `lokkhyo-platform`
   - Database password: Generate strong password (save it!)
   - Region: Choose closest to your users

4. Get connection details from Settings > Database:
   - Copy the connection string
   - Note down the direct connection URL

## Step 3: Deploy to Vercel with GitHub Integration

### Automatic Method (Recommended)
1. Go to [Vercel](https://vercel.com)
2. Sign up/login with GitHub account
3. Click "New Project"
4. Import your `lokkhyo-coding-platform` repository
5. Configure deployment:
   - Framework: Next.js
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

### Environment Variables Setup in Vercel
Add these environment variables in Vercel dashboard:

```env
# Database
DATABASE_URL=your_supabase_connection_string
DIRECT_URL=your_supabase_direct_connection_string

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=https://your-deployment-url.vercel.app

# App Configuration
NODE_ENV=production
```

## Step 4: Database Migration

After deployment, run database migration:

1. In Vercel dashboard, go to your project
2. Go to "Functions" tab
3. Find the latest deployment
4. In terminal/CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project
vercel link

# Run database migration
vercel env pull .env.local
npx prisma db push
npx prisma generate
```

## Step 5: Verify Deployment

### Check These URLs (replace with your actual domain):
- **Main Site**: `https://your-app.vercel.app`
- **API Health**: `https://your-app.vercel.app/api/health`
- **Authentication**: `https://your-app.vercel.app/api/auth/register`

### Test Features:
1. ✅ Homepage loads
2. ✅ User registration works
3. ✅ User login works
4. ✅ Problems page loads
5. ✅ Courses page loads
6. ✅ Dashboard access

## Step 6: Custom Domain (Optional - GitHub Student Pack)

With GitHub Student Pack, you get:
- Free `.me` domain from Namecheap
- Free domain management

### Setup Custom Domain:
1. Claim your `.me` domain from Namecheap (GitHub Student Pack)
2. In Vercel dashboard:
   - Go to project settings
   - Click "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

## Automatic Deployments

Once connected to GitHub:
- ✅ Every push to `main` branch triggers automatic deployment
- ✅ Pull requests get preview deployments
- ✅ Rollback capability from Vercel dashboard
- ✅ Build logs and error tracking

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   ```bash
   # Check build locally
   npm run build
   ```

2. **Database Connection Issues**:
   - Verify `DATABASE_URL` in Vercel environment variables
   - Check Supabase project is active

3. **Authentication Problems**:
   - Ensure `NEXTAUTH_URL` matches your deployment URL
   - Verify `JWT_SECRET` is set

4. **API Route Errors**:
   - Check function logs in Vercel dashboard
   - Verify all environment variables are set

## Next Steps

1. **Setup Monitoring**: Use Vercel Analytics (free with Student Pack)
2. **Error Tracking**: Integrate Sentry or similar service
3. **Performance**: Enable Vercel Speed Insights
4. **SEO**: Configure meta tags and sitemap
5. **CI/CD**: Setup GitHub Actions for testing

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **GitHub Student Pack**: https://education.github.com/pack

---

**🎉 Your coding platform will be live with automatic deployments from GitHub!**
