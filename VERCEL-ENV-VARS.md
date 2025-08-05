# Environment Variables for Vercel Deployment

# Copy this to your Vercel project's Environment Variables section
# Go to: Vercel Dashboard > Your Project > Settings > Environment Variables

# Database Configuration (Required)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres

# Authentication Secrets (Required)
JWT_SECRET=your-super-secret-jwt-key-32-characters-long
NEXTAUTH_SECRET=your-nextauth-secret-32-characters-long
NEXTAUTH_URL=https://your-app-name.vercel.app

# Optional: Code Execution Service
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
JUDGE0_API_KEY=your-rapidapi-key-for-code-execution

# Instructions:
# 1. Replace [PASSWORD] with your Supabase database password
# 2. Replace [PROJECT_REF] with your Supabase project reference
# 3. Generate secrets using: openssl rand -base64 32
# 4. Replace your-app-name with your actual Vercel app name
# 5. Add these variables in Vercel Dashboard → Settings → Environment Variables
