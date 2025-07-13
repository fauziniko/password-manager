# Troubleshooting Deployment Issues

## ❌ Problem: "Next.js Template Appears Instead of App"

This is a common issue when deploying Next.js applications. Here are the most likely causes and solutions:

### 1. Environment Variables Not Set

**Symptoms:**
- Default Next.js welcome page appears
- Authentication doesn't work
- Database connections fail

**Solution:**
```bash
# In your deployment platform (Vercel/Netlify/etc.), add these environment variables:

DATABASE_URL=postgresql://postgres:passwordmanager@158.140.191.175:5432/postgres?sslmode=require&connect_timeout=10
NEXTAUTH_URL=https://your-actual-domain.vercel.app
NEXTAUTH_SECRET=Q0Iyay33xxBjcXDwMKnKj5X3nDIsc/oMZsL1t+/vrUM=
```

**⚠️ Important:** Replace `your-actual-domain` with your real deployment URL!

### 2. Build Process Failed

**Symptoms:**
- Deployment succeeds but shows template
- Build logs show errors
- Missing dependencies

**Solution:**
```bash
# Test build locally first:
yarn build

# If build fails locally, fix errors before deploying
# Common issues:
# - TypeScript errors
# - Missing dependencies
# - Environment variable references
```

### 3. Routing Configuration Issues

**Symptoms:**
- App loads but routes don't work
- 404 errors on navigation
- Middleware conflicts

**Solution:**
Check these files exist and are configured correctly:
- `src/app/page.tsx` (home page)
- `src/app/layout.tsx` (root layout)
- `src/middleware.ts` (route protection)
- `next.config.ts` (Next.js configuration)

### 4. Database Connection Issues

**Symptoms:**
- App loads but authentication fails
- "Database connection error" messages
- User registration/login doesn't work

**Solution:**
```bash
# Test database connection:
yarn db:test

# Verify database URL format:
# postgresql://username:password@host:port/database?sslmode=require

# For production, ensure SSL mode is 'require':
DATABASE_URL="postgresql://postgres:passwordmanager@158.140.191.175:5432/postgres?sslmode=require&connect_timeout=10"
```

## 🔧 Step-by-Step Debugging

### Step 1: Check Local Build
```bash
# Test build locally
yarn build
yarn start

# Visit http://localhost:3000
# If it works locally, issue is deployment-specific
```

### Step 2: Verify Environment Variables
```bash
# Run deployment check script
./check-deployment.sh

# Or manually check:
cat .env
```

### Step 3: Check Deployment Platform Settings

#### For Vercel:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Ensure all variables are set for "Production" environment
3. Redeploy after adding variables

#### For Netlify:
1. Go to Netlify Dashboard → Your Site → Site Settings → Environment Variables
2. Add all required variables
3. Trigger new deploy

#### For Railway:
1. Go to Railway Dashboard → Your Project → Variables
2. Add environment variables
3. Redeploy

### Step 4: Check Build Logs
- Look for error messages in build logs
- Common errors:
  - "Module not found"
  - "TypeScript errors"
  - "Environment variable undefined"

### Step 5: Verify Database Access
```bash
# Test if deployment platform can reach your database
# Check firewall settings on database server
# Ensure external connections are allowed
```

## 🚨 Quick Fixes

### Fix 1: Force Redeploy with Correct Environment
```bash
# Add a dummy environment variable to force redeploy
FORCE_REDEPLOY=true

# Or update existing variable
NEXTAUTH_URL=https://your-new-domain.vercel.app
```

### Fix 2: Clear Build Cache
```bash
# In Vercel: Settings → Functions → Clear Cache
# In Netlify: Deploys → Trigger Deploy → Clear cache and deploy
```

### Fix 3: Update Next.js Configuration
Ensure `next.config.ts` has proper production settings:
```typescript
const nextConfig: NextConfig = {
  output: 'standalone',  // Important for deployment
  swcMinify: true,       // Optimize for production
}
```

### Fix 4: Check Middleware Configuration
If using middleware, ensure it's not blocking routes:
```typescript
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

## ✅ Deployment Checklist

Before deploying, ensure:

- [ ] `yarn build` works locally
- [ ] All environment variables are set in deployment platform
- [ ] NEXTAUTH_URL matches your deployment domain
- [ ] Database is accessible from deployment platform
- [ ] No TypeScript errors (`yarn type-check`)
- [ ] All required files exist in repository
- [ ] `.gitignore` doesn't exclude necessary files

## 📞 Still Having Issues?

If the problem persists:

1. **Check specific platform documentation:**
   - [Vercel Next.js Deployment](https://vercel.com/docs/frameworks/nextjs)
   - [Netlify Next.js Deployment](https://docs.netlify.com/frameworks/next-js/)
   - [Railway Next.js Deployment](https://docs.railway.app/guides/nextjs)

2. **Common platform-specific issues:**
   - **Vercel**: Function timeout limits, edge runtime compatibility
   - **Netlify**: Build plugin conflicts, function size limits
   - **Railway**: Memory limits, startup timeout

3. **Debug deployment:**
   ```bash
   # Enable debug logging
   DEBUG=* yarn build
   
   # Check deployment logs in platform dashboard
   # Look for specific error messages
   ```

4. **Alternative solutions:**
   - Try deploying to a different platform
   - Use Docker container deployment
   - Check if database provider has specific deployment guides

## 🎯 Most Common Solution

**90% of "template appears" issues are solved by:**

1. **Setting environment variables correctly in deployment platform**
2. **Ensuring NEXTAUTH_URL matches deployment domain**
3. **Making sure database is accessible from deployment platform**

Double-check these three things first!

# Deployment Troubleshooting Guide

## Common Deployment Issues and Solutions

### Issue 1: Tailwind CSS v4 Native Module Error (SOLVED)

**Error Message:**
```
Cannot find module '../lightningcss.linux-x64-gnu.node'
Error: Cannot find module '../lightningcss.linux-x64-gnu.node'
```

**Root Cause:**
Tailwind CSS v4 uses a native binary (`lightningcss`) that is not compatible with Docker/Nixpacks container environments.

**Solution:**
Downgrade to Tailwind CSS v3 which doesn't have native dependencies:

```bash
# Remove Tailwind CSS v4 and related packages
npm uninstall tailwindcss @tailwindcss/postcss @tailwindcss/node

# Install Tailwind CSS v3 with required dependencies
npm install --save-dev tailwindcss@^3 postcss autoprefixer

# Remove any duplicate PostCSS config files
rm -f postcss.config.js

# Update postcss.config.mjs
cat > postcss.config.mjs << 'EOF'
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
EOF

# Update tailwind.config.js (remove comments, clean format)
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
  darkMode: 'media',
}
EOF

# Test the build
npm run build
```

**Status:** ✅ SOLVED - Downgraded to Tailwind CSS v3

### Issue 2: Missing Environment Variables

**Error Message:**
```
Error: Environment variable [VARIABLE_NAME] is not defined
```

**Solution:**
1. Check that all required environment variables are set in your deployment platform
2. For Vercel: Set in dashboard or use `vercel env pull`
3. For Railway/Render: Set in environment variables section

**Required Variables:**
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `GOOGLE_CLIENT_ID` (optional)
- `GOOGLE_CLIENT_SECRET` (optional)

### Issue 3: Database Connection Issues

**Error Message:**
```
Error: Cannot connect to database
```

**Solution:**
1. Verify DATABASE_URL format and credentials
2. Check if database allows connections from deployment platform
3. For cloud databases, ensure SSL is properly configured
4. Test connection locally first

### Issue 4: Next.js Build Memory Issues

**Error Message:**
```
FATAL ERROR: Ineffective mark-compacts near heap limit
```

**Solution:**
Add to package.json scripts:
```json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
  }
}
```

## Deployment Platform Specific

### Vercel
- Automatically detects Next.js projects
- Set environment variables in dashboard
- Use Node.js 18+ runtime

### Railway
- Add `nixpacks.toml` for custom configuration
- Set `NODE_VERSION` environment variable
- Configure database service separately

### Render
- Use Node.js build command: `npm run build`
- Start command: `npm start`
- Set environment variables in dashboard

## Build Verification Commands

```bash
# Clean build test
npm run clean
npm install
npm run build
npm start

# Type checking
npm run type-check

# Database connection test
npm run db:test

# Check package versions
npm list tailwindcss
npm list next
npm list prisma
```

## Emergency Rollback

If deployment fails, quickly rollback:

```bash
# Revert to last known working commit
git log --oneline -5
git reset --hard [WORKING_COMMIT_HASH]
git push -f origin main
```

## Getting Help

1. Check deployment platform logs
2. Test build locally first
3. Verify all environment variables
4. Check database connectivity
5. Review this troubleshooting guide

## Status

- ✅ Tailwind CSS v4 → v3 downgrade (native module fix)
- ✅ Development server working
- 🔄 Production build testing
- ⏳ Deployment platform testing pending
