# 🚀 Deployment Guide - GitHub Student Developer Pack

## Overview
This guide will help you deploy your coding platform using free/discounted services from the GitHub Student Developer Pack.

## 🗄️ Database Setup (PostgreSQL)

### Option 1: Railway (Recommended)
Railway offers $5/month credit for students.

1. **Sign up at Railway**:
   ```
   https://railway.app/
   ```

2. **Create a new PostgreSQL database**:
   - Click "New Project" → "Provision PostgreSQL"
   - Copy the connection string from the "Connect" tab

3. **Update your .env.local**:
   ```env
   DATABASE_URL="your-railway-postgresql-connection-string"
   ```

### Option 2: Supabase (Free Tier)
1. Sign up at https://supabase.com/
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string

### Option 3: PlanetScale (Free Tier)
1. Sign up at https://planetscale.com/
2. Create a database
3. Get connection string from dashboard

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended for Next.js)
GitHub Student Pack includes Vercel Pro.

1. **Connect GitHub to Vercel**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login and deploy
   vercel login
   vercel --prod
   ```

2. **Set Environment Variables in Vercel**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all your .env.local variables

### Option 2: Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`

## 🔧 Backend API Deployment

### If using Next.js API routes (Current setup):
Your API routes will deploy with Vercel automatically.

### If you want a separate backend:

#### Option 1: Railway
```bash
# In your backend directory
railway login
railway init
railway up
```

#### Option 2: Render (Free tier)
1. Connect GitHub repository
2. Select "Web Service"
3. Build Command: `npm install && npm run build`
4. Start Command: `npm start`

## 📊 Code Execution Service

### Option 1: Judge0 API (Recommended)
1. Get free API key from RapidAPI:
   ```
   https://rapidapi.com/judge0-official/api/judge0-ce/
   ```

2. Add to environment variables:
   ```env
   JUDGE0_API_URL="https://judge0-ce.p.rapidapi.com"
   JUDGE0_API_KEY="your-rapidapi-key"
   ```

### Option 2: Self-hosted Judge0
Use a cloud provider for more control.

## 🔐 Domain & SSL

### Option 1: Namecheap (GitHub Student Pack)
Free .me domain for 1 year.

### Option 2: Custom domain with Vercel
1. Add custom domain in Vercel dashboard
2. Update DNS records as instructed

## 📈 Monitoring & Analytics

### GitHub Student Pack Benefits:
- **DataDog**: Free monitoring
- **Sentry**: Error tracking
- **LogRocket**: User session recording

## 🚀 Deployment Steps

### 1. Prepare Database
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with sample data
npm run db:seed
```

### 2. Set Environment Variables
```env
# Required Environment Variables
DATABASE_URL="your-database-connection-string"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://yourdomain.com"
JWT_SECRET="your-jwt-secret"
JUDGE0_API_URL="https://judge0-ce.p.rapidapi.com"
JUDGE0_API_KEY="your-rapidapi-key"
```

### 3. Deploy to Vercel
```bash
# Install dependencies
npm install

# Build the project
npm run build

# Deploy
vercel --prod
```

### 4. Configure Custom Domain (Optional)
```bash
# Add domain in Vercel dashboard
vercel domains add yourdomain.com
```

## 🧪 Testing Your Deployment

1. **Authentication**: Test login/register
2. **Problems**: Try loading problems page
3. **Code Execution**: Submit a solution
4. **Database**: Check if data persists

## 🔧 Troubleshooting

### Common Issues:

1. **Database Connection Error**:
   - Check if DATABASE_URL is correct
   - Ensure database is accessible from your deployment platform

2. **Build Errors**:
   - Run `npm run build` locally first
   - Check for TypeScript errors

3. **API Errors**:
   - Verify all environment variables are set
   - Check API route file names and exports

## 💰 Cost Estimation

### Free Tier Setup:
- **Vercel**: Free (with GitHub Student Pack Pro features)
- **Supabase**: Free tier (500MB database)
- **Domain**: Free .me domain for 1 year
- **Judge0**: 50 requests/day free

### Monthly Costs (After free tier):
- **Database**: $5-10/month
- **Hosting**: $0-20/month
- **Domain**: $10-15/year
- **Code Execution**: $10-50/month (based on usage)

## 🛠️ Development Workflow

```bash
# Local development
npm run dev

# Database changes
npm run db:generate
npm run db:push

# Deploy to production
git push origin main  # Auto-deploys with Vercel
```

## 📚 Next Steps

1. Set up monitoring with Sentry
2. Add analytics with Google Analytics
3. Set up CI/CD with GitHub Actions
4. Implement rate limiting
5. Add email notifications
6. Set up backups for database

## 🔗 Useful Links

- [GitHub Student Developer Pack](https://education.github.com/pack)
- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Judge0 API Documentation](https://ce.judge0.com/)
