# Deployment Guide - Password Manager Dashboard

## 🚀 Quick Deployment to Vercel

### Step 1: Prepare Repository
```bash
# Ensure all changes are committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy to Vercel

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure the project**:
   - Framework Preset: `Next.js`
   - Root Directory: `./` (default)
   - Build Command: `yarn build` (default)
   - Output Directory: `.next` (default)

### Step 3: Configure Environment Variables

In Vercel dashboard, add these environment variables:

```env
DATABASE_URL=postgresql://postgres:passwordmanager@158.140.191.175:5432/postgres?sslmode=prefer&connect_timeout=10
NEXTAUTH_URL=https://your-project-name.vercel.app
NEXTAUTH_SECRET=Q0Iyay33xxBjcXDwMKnKj5X3nDIsc/oMZsL1t+/vrUM=
```

**Important**: Replace `your-project-name` with your actual Vercel project URL.

### Step 4: Deploy

Click "Deploy" and wait for the build to complete.

## 🔧 Troubleshooting Deployment Issues

### Issue: "Template Next.js appears instead of app"

**Possible Causes & Solutions:**

1. **Environment Variables Missing**
   ```bash
   # Check Vercel dashboard -> Settings -> Environment Variables
   # Ensure all required variables are set
   ```

2. **Build Errors**
   ```bash
   # Test build locally first
   yarn build
   yarn start
   ```

3. **Database Connection Issues**
   ```bash
   # Test database connection
   yarn db:test
   ```

4. **Routing Issues**
   - Check `src/app/page.tsx` exists
   - Verify `src/app/layout.tsx` is properly configured
   - Ensure no conflicting routes

### Issue: "Database Connection Failed"

**Solutions:**

1. **Update DATABASE_URL for production**:
   ```env
   # Ensure SSL mode is set correctly
   DATABASE_URL="postgresql://postgres:passwordmanager@158.140.191.175:5432/postgres?sslmode=require&connect_timeout=10"
   ```

2. **Verify database is accessible from Vercel**:
   - Check firewall settings
   - Ensure cloud database allows external connections

### Issue: "NextAuth Configuration Error"

**Solutions:**

1. **Set correct NEXTAUTH_URL**:
   ```env
   NEXTAUTH_URL=https://your-actual-domain.vercel.app
   ```

2. **Generate new secret for production**:
   ```bash
   openssl rand -base64 32
   ```

## 🛠 Alternative Deployment Platforms

### Netlify
```bash
# Build command
yarn build

# Publish directory
.next

# Environment variables (same as Vercel)
DATABASE_URL=...
NEXTAUTH_URL=https://your-app.netlify.app
NEXTAUTH_SECRET=...
```

### Railway
```bash
# Automatic deployment from GitHub
# Add environment variables in Railway dashboard
```

### DigitalOcean App Platform
```yaml
# app.yaml
name: password-manager
services:
- name: web
  source_dir: /
  github:
    repo: your-username/password-manager
    branch: main
  run_command: yarn start
  build_command: yarn build
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: DATABASE_URL
    value: your-database-url
  - key: NEXTAUTH_URL
    value: https://your-app.ondigitalocean.app
  - key: NEXTAUTH_SECRET
    value: your-secret
```

## 📋 Pre-Deployment Checklist

### Local Testing
- [ ] `yarn build` completes successfully
- [ ] `yarn start` works locally
- [ ] All environment variables are set
- [ ] Database connection works
- [ ] Authentication flows work
- [ ] All pages load correctly

### Environment Variables
- [ ] `DATABASE_URL` is set correctly
- [ ] `NEXTAUTH_URL` matches deployment URL
- [ ] `NEXTAUTH_SECRET` is strong and secure
- [ ] No sensitive data in client-side code

### Database Preparation
- [ ] Database schema is pushed (`npx prisma db push`)
- [ ] Demo data is seeded (`yarn db:seed`)
- [ ] Database connection is tested (`yarn db:test`)

### Security Checklist
- [ ] Strong passwords for all accounts
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Environment variables not exposed
- [ ] No API keys in client code

## 🔄 Post-Deployment Steps

### 1. Verify Deployment
```bash
# Check if site loads
curl -I https://your-app.vercel.app

# Test API endpoints
curl https://your-app.vercel.app/api/auth/signin
```

### 2. Test Authentication
- Visit your deployed site
- Try registering a new account
- Test login with demo credentials:
  - Email: `demo@example.com`
  - Password: `password123`

### 3. Test Core Features
- Create a new modem
- Edit existing modem
- Delete a modem
- Search functionality
- Profile updates

### 4. Monitor Performance
- Check Vercel dashboard for build logs
- Monitor response times
- Check for any error logs

## 🚨 Common Deployment Errors

### "Internal Server Error (500)"
- Check Vercel function logs
- Verify database connection
- Check environment variables

### "Authentication Error"
- Verify NEXTAUTH_URL is correct
- Check NEXTAUTH_SECRET is set
- Ensure database is accessible

### "Database Connection Timeout"
- Increase connection timeout in DATABASE_URL
- Check database server status
- Verify network connectivity

### "Build Failed"
- Check build logs in Vercel dashboard
- Test build locally: `yarn build`
- Check for TypeScript errors

## 📞 Support

If you encounter issues:

1. **Check Vercel build logs**
2. **Test locally first**
3. **Verify all environment variables**
4. **Check database connectivity**

For additional help, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [NextAuth.js Deployment](https://next-auth.js.org/deployment)
