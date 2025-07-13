# Password Manager Dashboard

A modern web dashboard built with Next.js 15 and Tailwind CSS for managing usernames and passwords for multiple modems. Features complete authentication system including Google OAuth, PostgreSQL database, and responsive design.

## 🚀 Features

### 🔐 Authentication System

- **Email/Password Authentication**: Traditional login and registration
- **Google OAuth Integration**: One-click sign in/up with Google
- **Mixed Authentication**: Support for both methods seamlessly
- **Session Management**: Secure sessions with NextAuth.js
- **User Type Detection**: Smart handling of OAuth vs credential users

### 🗄️ Database & Backend

- **PostgreSQL Database**: Cloud or local PostgreSQL support
- **Prisma ORM**: Type-safe database operations
- **Complete API**: REST endpoints for all operations
- **Data Seeding**: Demo user and sample modems included

### 🎨 Frontend & UI

- **Responsive Design**: Mobile-first with Tailwind CSS
- **Modern UI**: Clean, intuitive interface with Lucide icons
- **Form Validation**: Client and server-side validation with Zod
- **Error Handling**: User-friendly error messages
- **Password Visibility**: Toggle password display for security

### 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **Environment Variables**: All secrets properly managed
- **Input Validation**: Zod schema validation on all forms
- **CSRF Protection**: Built-in with NextAuth.js
- **SQL Injection Prevention**: Prisma ORM protection

## 🛠 Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (100% type-safe)
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth
- **Validation**: Zod schemas
- **Icons**: Lucide React
- **Password Hashing**: bcryptjs

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts    # NextAuth configuration
│   │   │   └── register/route.ts         # User registration API
│   │   ├── modems/
│   │   │   ├── route.ts                  # Modem CRUD API
│   │   │   └── [id]/route.ts            # Individual modem API
│   │   └── user/
│   │       ├── profile/route.ts          # User profile API
│   │       └── password/route.ts         # Password change API
│   ├── auth/
│   │   ├── signin/page.tsx              # Login page
│   │   └── signup/page.tsx              # Registration page
│   ├── dashboard/page.tsx               # Main dashboard
│   ├── profile/page.tsx                 # User profile page
│   ├── layout.tsx                       # Root layout
│   └── page.tsx                         # Landing page
├── components/
│   └── SessionProvider.tsx             # NextAuth session provider
├── lib/
│   ├── auth.ts                         # NextAuth configuration
│   └── prisma.ts                       # Prisma client
└── types/
    └── next-auth.d.ts                  # NextAuth type definitions
```

## ⚡ Quick Start

### Prerequisites

- Node.js 18 or higher
- npm package manager
- PostgreSQL database (cloud or local)

### 1. Clone and Install

```bash
git clone <repository-url>
cd password-manager
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

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

Generate NextAuth secret:

```bash
openssl rand -base64 32
```

### 3. Setup Database

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

### 4. Start Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and login with:

- **Email**: `demo@example.com`
- **Password**: `password123`

## 🗄️ Database Setup

### Option 1: Cloud PostgreSQL (Recommended)

Use a cloud PostgreSQL service:

- **Aiven**: Free 1-month trial
- **Neon**: Free tier with 500MB
- **Supabase**: Free tier with 500MB
- **ElephantSQL**: Free tier with 20MB

Example connection string:

```env
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require&connect_timeout=10"
```

### Option 2: Local PostgreSQL

Install PostgreSQL locally:

```bash
# Install PostgreSQL (macOS)
brew install postgresql
brew services start postgresql

# Create database
createdb password_manager

# Connection string
DATABASE_URL="postgresql://postgres:password@localhost:5432/password_manager"
```

### Database Schema

The application uses these main models:

#### User Model

- `id`: Unique identifier
- `email`: User email (unique)
- `password`: Hashed password (null for OAuth users)
- `name`: User display name
- `image`: Profile image URL (for OAuth)
- `emailVerified`: Email verification timestamp
- `createdAt`, `updatedAt`: Timestamps

#### Modem Model

- `id`: Unique identifier
- `name`: Modem display name
- `type`: Modem type/model
- `ipAddress`: IP address
- `username`: Login username
- `password`: Login password
- `description`: Optional description
- `userId`: Foreign key to User
- `createdAt`, `updatedAt`: Timestamps

#### Account Model (for OAuth)

- `id`: Unique identifier
- `userId`: Foreign key to User
- `type`: Account type (oauth)
- `provider`: Provider name (google)
- `providerAccountId`: Provider's user ID
- Access tokens and refresh tokens

## 🔐 Google OAuth Setup

### 1. Google Cloud Console Setup

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google APIs:
   - Go to "APIs & Services" → "Library"
   - Enable "Google+ API" and "People API"

### 2. Configure OAuth Consent Screen

1. Go to "APIs & Services" → "OAuth consent screen"
2. Choose "External" user type
3. Fill required information:
   ```
   App name: Password Manager Dashboard
   User support email: your-email@gmail.com
   Developer contact email: your-email@gmail.com
   ```
4. Add scopes:
   - `../auth/userinfo.email`
   - `../auth/userinfo.profile`
5. Add test users (your email addresses)

### 3. Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. Application type: "Web application"
4. Add authorized origins:
   ```
   http://localhost:3000
   https://your-app-name.vercel.app
   ```
5. Add redirect URIs:
   ```
   http://localhost:3000/api/auth/callback/google
   https://your-app-name.vercel.app/api/auth/callback/google
   ```

### 4. Update Environment Variables

Add the credentials to your `.env`:

```env
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED=true
```

### 5. Google OAuth Best Practices

- **Free Quota**: Google OAuth is free for most use cases
- **Production**: Set OAuth consent screen to "Production" when ready
- **Security**: Keep client secret secure and never expose in client-side code
- **Testing**: Add test users during development phase
- **Domains**: Verify domain ownership for production apps

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Prepare repository**:

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**:

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project settings (defaults should work)

3. **Set environment variables** in Vercel dashboard:

   ```env
   DATABASE_URL=your-production-database-url
   NEXTAUTH_URL=https://your-project-name.vercel.app
   NEXTAUTH_SECRET=your-generated-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED=true
   ```

4. **Update Google OAuth redirect URIs** to include production URL:
   ```
   https://your-project-name.vercel.app/api/auth/callback/google
   ```

### Deploy to Other Platforms

The application can also be deployed to:

- **Netlify**: Use the same environment variables
- **Railway**: Built-in PostgreSQL support
- **Coolify**: Self-hosted option with Docker
- **Digital Ocean App Platform**: With managed database
- **Render**: Static site with database addon

### Important Notes for Deployment

- **Tailwind CSS**: Project uses Tailwind CSS v3 (compatible with Docker/Nixpacks)
- **Build**: Always test `npm run build` locally before deployment
- **Environment**: Ensure all required environment variables are set
- **Database**: Use `sslmode=require` for production databases

## 🔧 Troubleshooting

### Common Issues

#### 1. Next.js Template Appears Instead of App

**Causes:**

- Environment variables not set correctly
- Build process failed
- Database connection issues

**Solutions:**

- Verify all environment variables are set in deployment platform
- Test build locally: `npm run build`
- Check database connection string format
- Ensure `NEXTAUTH_URL` matches your actual domain

#### 2. Google OAuth Not Working

**Causes:**

- Incorrect OAuth configuration
- Wrong redirect URIs
- Missing environment variables

**Solutions:**

- Verify Google Cloud Console settings
- Check redirect URIs match exactly (including protocol)
- Ensure `NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED=true`
- Test with a Google account added as test user
- Check OAuth consent screen is properly configured

#### 3. Database Connection Errors

**Causes:**

- Incorrect connection string
- Database server unreachable
- SSL configuration issues

**Solutions:**

- Verify `DATABASE_URL` format
- For production, use `sslmode=require`
- Test connection: `npx prisma db pull`
- Check database server status and firewall settings

#### 4. Authentication Issues

**Causes:**

- Missing `NEXTAUTH_SECRET`
- Incorrect `NEXTAUTH_URL`
- Session configuration problems

**Solutions:**

- Generate new secret: `openssl rand -base64 32`
- Ensure `NEXTAUTH_URL` matches deployment URL exactly
- Clear browser cookies and try again
- Check middleware configuration

#### 5. Build Errors

**Causes:**

- TypeScript errors
- Missing dependencies
- Environment variable references
- ESLint errors

**Solutions:**

- Fix TypeScript errors: `npm run type-check`
- Install missing dependencies: `npm install`
- Check all environment variables are defined
- Fix ESLint errors: `npm run lint`
- Review build logs for specific errors

#### 6. ESLint Errors During Build

**Common Error:**
```
Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
```

**Solutions:**
- Replace single quotes `'` with `&apos;` in JSX text
- Use double quotes for attributes: `className="text"`
- Escape special characters in JSX content
- Consider disabling ESLint rule if needed: `// eslint-disable-next-line react/no-unescaped-entities`

### Debugging Steps

1. **Check Local Build**:

   ```bash
   npm run build
   npm start
   ```

2. **Verify Environment Variables**:

   ```bash
   echo $DATABASE_URL
   echo $NEXTAUTH_SECRET
   echo $NEXTAUTH_URL
   ```

3. **Test Database Connection**:

   ```bash
   npx prisma db pull
   npx prisma generate
   ```

4. **Check Application Logs**:

   - Vercel: Check function logs in dashboard
   - Local: Check terminal output
   - Browser: Check console for client-side errors

5. **Test Authentication Flow**:
   - Try registering a new account
   - Test login with demo credentials
   - Check session persistence

## 📝 Available Scripts

```bash
# Development
npm run dev           # Start development server
npm run build         # Build for production
npm start             # Start production server
npm run lint          # Run ESLint

# Database
npx prisma generate   # Generate Prisma client
npx prisma db push    # Push schema to database
npx prisma db pull    # Pull schema from database
npm run db:seed       # Seed database with demo data
npx prisma studio     # Open Prisma Studio
npx prisma migrate reset  # Reset database (development only)

# Utilities
npm run type-check    # Run TypeScript compiler
```

## 🧪 Testing

### Demo Account

After running the seed script, you can use these test credentials:

```
Email: demo@example.com
Password: password123
```

This account comes with 3 sample modems for testing all features.

### API Testing

Test the registration endpoint:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

Test modem creation:

```bash
curl -X POST http://localhost:3000/api/modems \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=your-session-token" \
  -d '{
    "name": "Test Modem",
    "type": "Router",
    "ipAddress": "192.168.1.1",
    "username": "admin",
    "password": "admin123",
    "description": "Test description"
  }'
```

## 🔒 Security Features

- **Password Security**: Passwords are hashed using bcryptjs with salt rounds
- **Session Management**: JWT tokens for secure session handling
- **CSRF Protection**: Built-in CSRF protection via NextAuth.js
- **SQL Injection Prevention**: Prisma ORM prevents SQL injection attacks
- **XSS Protection**: React's built-in XSS protection
- **Input Validation**: Zod schemas validate all user inputs
- **Environment Variables**: Sensitive data stored securely
- **Rate Limiting**: Recommended for production API routes
- **HTTPS**: Required for production deployments
- **Database SSL**: SSL connections for production databases

## 🌟 Key Features Explained

### Authentication Flow

1. User registers with email/password or Google OAuth
2. Credentials are validated and password is hashed
3. Session is created using NextAuth.js
4. Protected routes check for valid session
5. Automatic redirects for unauthenticated users

### Modem Management

- **Create**: Add new modem with validation
- **Read**: View all modems in responsive grid
- **Update**: Edit modem details with form validation
- **Delete**: Remove modems with confirmation
- **Search**: Real-time search across all fields
- **Security**: Password visibility toggle for safety

### User Profile

- Update personal information (name, email display)
- Change password with current password verification
- View account creation date and statistics
- Session management and logout functionality

### OAuth vs Credential Users

- **OAuth Users**: Cannot change passwords (managed by provider)
- **Credential Users**: Can change passwords with current password verification
- **Mixed Support**: Both types can use the application seamlessly
- **Smart UI**: Different interfaces based on user type

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Open a pull request

## 📞 Support

If you encounter any issues:

1. Check this README for troubleshooting steps
2. Verify your environment variables are correct
3. Test the application locally first
4. Check deployment platform logs for errors

For Google OAuth issues, ensure:

- OAuth consent screen is properly configured
- Redirect URIs match exactly (including protocol and path)
- Test users are added during development
- Required APIs are enabled in Google Cloud Console
- Client ID and secret are correctly set in environment variables

For database issues:

- Verify connection string format
- Check database server accessibility
- Test connection with Prisma commands
- Ensure SSL settings match requirements

---

## 🎉 Project Status: COMPLETE ✅

Your Password Manager Dashboard is fully functional and ready for:

- ✅ **Local Development**: Run with `npm run dev`
- ✅ **Production Deployment**: Deploy to any platform
- ✅ **User Testing**: Complete authentication flows
- ✅ **Data Management**: Full modem CRUD operations
- ✅ **OAuth Setup**: Google authentication ready
- ✅ **Maintenance**: Well-documented and structured

**🚀 The project is production-ready and can be deployed immediately!**
