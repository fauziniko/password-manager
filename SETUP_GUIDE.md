# 🔐 Password Manager Dashboard - Complete Setup Guide

## 📋 Table of Contents
1. [Project Overview](#-project-overview)
2. [Quick Start](#-quick-start)
3. [Environment Setup](#-environment-setup)
4. [Database Configuration](#-database-configuration)
5. [Google OAuth Setup](#-google-oauth-setup)
6. [Running the Application](#-running-the-application)
7. [Deployment](#-deployment)
8. [Troubleshooting](#-troubleshooting)
9. [Security](#-security)
10. [Demo User](#-demo-user)

---

## 🎯 Project Overview

A modern Next.js web dashboard for managing usernames and passwords for multiple modems with:

### 🚀 Features
- **Authentication**: Email/Password + Google OAuth
- **Modem Management**: Add, edit, delete modem credentials
- **User Profile**: Update profile and change password
- **Responsive UI**: Mobile and desktop friendly
- **Secure Database**: PostgreSQL with Prisma ORM

### 🛠️ Tech Stack
- **Frontend**: Next.js 15 + App Router
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Cloud or Local)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Language**: TypeScript

---

## ⚡ Quick Start

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd password-manager
yarn install
```

### 2. Setup Environment
```bash
cp .env.example .env
# Edit .env with your database and OAuth credentials
```

### 3. Setup Database
```bash
yarn db:generate
yarn db:push
yarn db:seed
```

### 4. Run Development Server
```bash
yarn dev
```

Visit: `http://localhost:3000`

---

## 🔧 Environment Setup

### Required Environment Variables

Create `.env` file with:

```env
# Database (Required)
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=prefer&connect_timeout=10"

# NextAuth (Required)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-key-here

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED=true
```

### Generate NextAuth Secret
```bash
openssl rand -base64 32
```

---

## 🗄️ Database Configuration

### Option 1: Cloud PostgreSQL (Recommended)

#### Using Aiven, Neon, or Supabase:
```env
# Example connection strings:
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"
```

### Option 2: Local PostgreSQL

#### Install PostgreSQL:
```bash
# macOS
brew install postgresql
brew services start postgresql

# Ubuntu/Debian
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### Setup Local Database:
```bash
# Create user and database
createuser -s postgres
createdb password_manager

# Connection string
DATABASE_URL="postgresql://postgres:@localhost:5432/password_manager"
```

### Option 3: Docker PostgreSQL
```bash
# Run PostgreSQL in Docker
docker run --name postgres-db \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=password_manager \
  -p 5432:5432 -d postgres:15

# Connection string
DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/password_manager"
```

### Database Commands
```bash
# Generate Prisma client
yarn db:generate

# Push schema to database
yarn db:push

# Seed demo data
yarn db:seed

# Reset database
yarn db:reset

# View database
yarn db:studio
```

---

## 🔑 Google OAuth Setup

### Step 1: Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project: "Password Manager OAuth"
3. Enable APIs: "People API" and "Google+ API"

### Step 2: OAuth Consent Screen
1. Go to "APIs & Services" → "OAuth consent screen"
2. Choose "External" user type
3. Fill required information:
   - App name: `Password Manager Dashboard`
   - User support email: `your-email@gmail.com`
   - Developer contact: `your-email@gmail.com`
4. Add scopes:
   - `../auth/userinfo.email`
   - `../auth/userinfo.profile`
5. Add test users (your email)

### Step 3: Create Credentials
1. Go to "APIs & Services" → "Credentials"
2. Create "OAuth 2.0 Client IDs"
3. Application type: "Web application"
4. Name: `Password Manager Web Client`
5. Authorized JavaScript origins:
   ```
   http://localhost:3000
   https://your-app.vercel.app
   ```
6. Authorized redirect URIs:
   ```
   http://localhost:3000/api/auth/callback/google
   https://your-app.vercel.app/api/auth/callback/google
   ```

### Step 4: Update Environment
Add to your `.env`:
```env
GOOGLE_CLIENT_ID=your-actual-client-id
GOOGLE_CLIENT_SECRET=your-actual-client-secret
NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED=true
```

---

## 🚀 Running the Application

### Development Mode
```bash
yarn dev
```

### Build and Test
```bash
yarn build
yarn start
```

### Available Scripts
```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint
yarn db:generate  # Generate Prisma client
yarn db:push      # Push schema to database
yarn db:seed      # Seed demo data
yarn db:studio    # Open Prisma Studio
yarn db:reset     # Reset database
```

### Testing Authentication
1. **Email/Password**: Register with any email at `/auth/signup`
2. **Google OAuth**: Click "Continue with Google" button
3. **Demo User**: Use credentials from Demo User section

---

## 🌐 Deployment

### Vercel Deployment
1. **Connect GitHub repository** to Vercel
2. **Add environment variables** in Vercel dashboard:
   ```env
   DATABASE_URL=your-production-database-url
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=your-production-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED=true
   ```
3. **Update Google OAuth redirect URIs** with production domain
4. **Deploy** from Vercel dashboard

### Other Platforms
- **Netlify**: Similar process, add env vars in site settings
- **Railway**: Connect repo and add environment variables
- **Heroku**: Use `heroku config:set` for env vars

### Pre-deployment Checklist
- [ ] Database accessible from deployment platform
- [ ] All environment variables configured
- [ ] Google OAuth redirect URIs updated for production
- [ ] Build passes locally: `yarn build`
- [ ] Database schema deployed: `yarn db:push`

---

## 🔧 Troubleshooting

### Common Issues

#### Database Connection Failed
```bash
# Check connection
yarn db:test

# Common fixes:
# 1. Verify DATABASE_URL format
# 2. Check database server is running
# 3. Verify credentials and host accessibility
# 4. Check SSL mode requirements
```

#### Google OAuth Errors

**"redirect_uri_mismatch"**
- Ensure redirect URI in Google Console matches exactly
- Format: `http://localhost:3000/api/auth/callback/google`

**"invalid_client"**
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- Check for extra spaces or incorrect copying

**"Access blocked"**
- Add your email as test user in Google Console
- Ensure OAuth consent screen is configured

**Google button not showing**
- Verify `NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED=true`
- Restart development server

#### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
yarn build

# Check TypeScript errors
yarn type-check
```

#### Database Schema Issues
```bash
# Reset and recreate
yarn db:reset
yarn db:push
yarn db:seed
```

### Getting Help
1. Check browser console for errors
2. Check terminal output for server errors
3. Verify all environment variables are set
4. Test database connection separately

---

## 🔒 Security

### Environment Variables Security
- **Never commit `.env`** files to Git (already in `.gitignore`)
- **Use strong passwords** for database and NextAuth secret
- **Rotate secrets regularly** in production
- **Use environment-specific credentials** (dev/staging/prod)

### Best Practices
- Keep dependencies updated: `yarn upgrade`
- Use HTTPS in production
- Enable database SSL in production
- Monitor application logs for suspicious activity
- Implement rate limiting for auth endpoints

### Credential Storage
```bash
# ✅ Safe - These files can be committed:
.env.example          # Template with placeholders
package.json          # Dependencies only
README.md            # Documentation only

# ❌ Never commit - Contains real credentials:
.env                 # Real environment variables
.env.local           # Local environment overrides
.env.production      # Production environment
```

---

## 👤 Demo User

### Pre-seeded Demo Account
After running `yarn db:seed`, you can login with:

```
Email: demo@example.com
Password: demo123456
```

### Demo Data Includes
- **1 Demo User**: Full profile with sample data
- **3 Sample Modems**: Different configurations and passwords
- **Complete Setup**: Ready to test all features

### Demo Modem Examples
1. **Home Router**: TP-Link WR841N with admin credentials
2. **Office Modem**: ARRIS SB6183 with custom setup
3. **Backup Device**: Netgear CM500 with default settings

### Testing Scenarios
- ✅ Login with demo credentials
- ✅ View and edit modem list
- ✅ Add new modem entries
- ✅ Update user profile
- ✅ Change password (for email users)
- ✅ Test Google OAuth (if configured)

---

## 🎯 Next Steps

### After Setup
1. **Customize branding**: Update app name and colors
2. **Add features**: Export functionality, categories, search
3. **Enhance security**: 2FA, password policies, audit logs
4. **Scale database**: Connection pooling, read replicas
5. **Monitor performance**: Add analytics and error tracking

### Development Workflow
```bash
# Daily development
git pull origin main
yarn install          # If package.json changed
yarn dev              # Start development

# Before committing
yarn lint             # Check code quality
yarn build            # Ensure build works
git add .
git commit -m "feat: your feature description"
git push origin main
```

---

## 📞 Support

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Project Structure
```
password-manager/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable React components
│   ├── lib/             # Utility functions and configs
│   └── types/           # TypeScript type definitions
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.mjs         # Database seeding script
└── public/              # Static assets
```

---

🎉 **Your Password Manager Dashboard is ready to use!** 🎉

For questions or issues, check the troubleshooting section or create an issue in the repository.
