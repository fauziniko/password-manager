# Password Manager Dashboard

A modern web dashboard built with Next.js 15 and Tailwind CSS for managing usernames and passwords for multiple modems. Features user authentication, CRUD operations for modem management, and a responsive design.

## 🚀 Quick Start

1. **Clone and setup**:
   ```bash
   git clone <repository-url>
   cd password-manager
   yarn install
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Setup database**:
   ```bash
   npx prisma generate
   npx prisma db push
   yarn db:seed
   ```

4. **Start development**:
   ```bash
   yarn dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) and login with:
   - **Email**: `demo@example.com`
   - **Password**: `password123`

## 🚀 Features

- **User Authentication**: Secure login/register system with NextAuth.js
- **Modem Management**: Add, edit, delete, and view modem credentials
- **User Profile**: Update profile information and change passwords
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Database Integration**: PostgreSQL with Prisma ORM
- **Type Safety**: Full TypeScript support with Zod validation
- **Modern UI**: Clean and intuitive interface with Lucide React icons

## 🛠 Technology Stack

- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: PostgreSQL with Prisma ORM
- **ORM**: Prisma
- **Authentication**: NextAuth.js with credentials provider
- **Validation**: Zod with React Hook Form
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

## � Installation & Setup

### Prerequisites

- Node.js 18 or higher
- Yarn package manager
- PostgreSQL database (cloud or local)

### Quick Setup (Using Pre-configured Cloud Database)

The fastest way to get started is using the pre-configured PostgreSQL cloud database:

1. **Clone and install**:
   ```bash
   git clone <repository-url>
   cd password-manager
   yarn install
   ```

2. **Use the provided environment**:
   ```bash
   cp .env.example .env
   # The cloud database is already configured and working
   ```

3. **Setup database schema**:
   ```bash
   npx prisma generate
   npx prisma db push
   yarn db:seed
   ```

4. **Start development**:
   ```bash
   yarn dev
   ```

### Alternative Setup (Your Own Database)

If you prefer to use your own database:

1. **Follow steps 1-2 above**

2. **Update environment variables**:
   Edit `.env` and replace the `DATABASE_URL` with your database:
   ```env
   # For local PostgreSQL
   DATABASE_URL="postgresql://postgres:password@localhost:5432/password_manager"
   
   # For cloud PostgreSQL
   DATABASE_URL="postgresql://username:password@host:port/database"
   
   # For Supabase
   DATABASE_URL="postgresql://postgres.[project-id]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
   ```

3. **Complete setup**:
   ```bash
   npx prisma generate
   npx prisma db push
   yarn db:seed
   yarn dev
   ```

### Environment Configuration

Update the `.env` file with your configuration:
```env
# Database - PostgreSQL Cloud (Pre-configured)
DATABASE_URL="postgresql://postgres:passwordmanager@158.140.191.175:5432/postgres?sslmode=prefer&connect_timeout=10"

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret

# Database Info (for reference)
DB_HOST=158.140.191.175
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=passwordmanager
DB_NAME=postgres
DB_STATUS=CONNECTED_AND_WORKING
```

### Testing Database Connection

Test your database connection:
```bash
# Test connection
yarn db:test

# Check database status
node check-status.js
```
### Step 3: Setup Database Schema

```bash
# Generate Prisma client
npx prisma generate

# Push database schema to cloud database
npx prisma db push

# Seed with sample data
yarn db:seed
```

### Step 4: Test Build (Important!)

```bash
# Test build to ensure no errors
yarn build

# If build succeeds, you're ready for deployment!
```

### Step 5: Start Development Server

```bash
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🗄 Database Schema

### User Model
- `id`: Unique identifier
- `email`: User email (unique)
- `password`: Hashed password
- `name`: User display name
- `createdAt`, `updatedAt`: Timestamps

### Modem Model
- `id`: Unique identifier
- `name`: Modem display name
- `type`: Modem type/model
- `ipAddress`: IP address
- `username`: Login username
- `password`: Login password
- `description`: Optional description
- `userId`: Foreign key to User
- `createdAt`, `updatedAt`: Timestamps

## 🧪 Testing

### Sample Credentials

After running the seed script, you can use these test credentials:

```
Email: demo@example.com
Password: password123
```

This account comes with 3 sample modems for testing.

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

## 🌟 Key Features Explained

### Authentication
- JWT-based sessions with NextAuth.js
- Secure password hashing with bcryptjs
- Protected API routes and pages
- Automatic redirects for unauthenticated users

### Modem Management
- Full CRUD operations (Create, Read, Update, Delete)
- IP address validation
- Password visibility toggle
- Search and filter functionality
- Responsive data tables

### User Profile
- Update personal information
- Change password with current password verification
- Session management

### Security Features
- Password hashing with salt rounds
- Input validation with Zod schemas
- CSRF protection via NextAuth
- SQL injection prevention via Prisma

## 🚀 Database Configuration

### Current Setup - PostgreSQL Cloud

The application is configured to use PostgreSQL cloud database:

- **Host**: 158.140.191.175:5432
- **Database**: postgres  
- **User**: postgres
- **Status**: ✅ Connected and Working

### Database Commands

```bash
# Test database connection
yarn db:test
# or: node test-postgres.js

# Seed database with sample data
yarn db:seed

# Generate Prisma client
yarn db:generate

# Push schema changes
npx prisma db push

# Reset database (if needed)
yarn db:reset
```

### Alternative Database Setup

If you want to use a different database, update the `DATABASE_URL` in `.env`:

#### Local PostgreSQL:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/password_manager"
```

#### Supabase:
```env
DATABASE_URL="postgresql://postgres.[project-id]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
```

3. **Update Prisma schema**:
   ```prisma
   datasource db {
     provider  = "postgresql"
     url       = env("DATABASE_URL")
     directUrl = env("DIRECT_URL")
   }
   ```

4. **Deploy schema**:
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

## 🚀 Deployment

### Deployment Ready!

**Note:** This project has been updated to resolve Docker/Nixpacks deployment issues by downgrading from Tailwind CSS v4 to v3.

### Deployment Platforms

- **Vercel** (Recommended for Next.js)
- **Railway** (With PostgreSQL addon)
- **Render** (Static + database)
- **Docker/Nixpacks** compatible

### Environment Variables Required

Set these in your deployment platform:

```bash
DATABASE_URL=postgresql://username:password@host:port/database
NEXTAUTH_SECRET=your-generated-secret-key
NEXTAUTH_URL=https://your-domain.com
GOOGLE_CLIENT_ID=optional-for-oauth
GOOGLE_CLIENT_SECRET=optional-for-oauth
NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED=false
```

### Deployment Issues & Solutions

If you encounter deployment issues, check `DEPLOYMENT_TROUBLESHOOTING.md` for:
- Tailwind CSS native module errors (solved)
- Environment variable setup
- Database connection problems
- Build memory issues
````
