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

### Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Connect your GitHub repo to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically

3. **Environment variables for production**:
   ```env
   DATABASE_URL=your-production-database-url
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your-production-secret
   ```

### Other Platforms

The application is also compatible with:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

### Production Database

For production, consider these PostgreSQL providers:
- **Neon** (Recommended for Vercel)
- **Supabase** (Full-stack platform)
- **PlanetScale** (Serverless MySQL alternative)
- **Railway** (Simple deployment)

## 🔒 Security Considerations

### Current Security Features
- ✅ Password hashing with bcryptjs
- ✅ Input validation with Zod schemas
- ✅ SQL injection prevention via Prisma ORM
- ✅ CSRF protection via NextAuth.js
- ✅ Environment variable protection
- ✅ Type safety with TypeScript

### Production Security Checklist
- [ ] Use strong `NEXTAUTH_SECRET` (32+ characters)
- [ ] Enable database SSL in production
- [ ] Use HTTPS for all endpoints
- [ ] Set up proper CORS headers
- [ ] Enable rate limiting for API routes
- [ ] Monitor for unusual activity
- [ ] Regular security updates for dependencies

## 📊 Project Status

- **Database**: ✅ PostgreSQL Cloud Connected
- **Authentication**: ✅ NextAuth.js configured
- **UI/UX**: ✅ Responsive design with Tailwind
- **API**: ✅ RESTful endpoints with validation
- **TypeScript**: ✅ Full type safety
- **Testing**: ✅ Manual testing with demo data

## 📋 Available Scripts

- `yarn dev` - Start development server (with Turbopack)
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn db:seed` - Seed database with sample data
- `yarn db:test` - Test database connection
- `yarn db:generate` - Generate Prisma client
- `yarn db:migrate` - Create and run migration
- `yarn db:reset` - Reset database (destructive)

## 🔧 Troubleshooting

### Database Connection Issues

If you encounter database connection problems:

1. **Test connection**:
   ```bash
   yarn db:test
   ```

2. **Check database status**:
   ```bash
   node check-status.js
   ```

3. **Verify environment variables**:
   ```bash
   # Check if .env file exists and has correct values
   cat .env
   ```

4. **Common fixes**:
   ```bash
   # Regenerate Prisma client
   npx prisma generate
   
   # Push schema again
   npx prisma db push
   
   # Reset and reseed (if safe to do so)
   yarn db:reset
   yarn db:seed
   ```

### Deployment Issues

If your deployed app shows Next.js template instead of your app:

1. **Check deployment readiness**:
   ```bash
   ./check-deployment.sh
   ```

2. **Common deployment issues**:
   - ❌ **Environment variables missing**: Add all required env vars in platform dashboard
   - ❌ **Wrong NEXTAUTH_URL**: Must match your deployed domain
   - ❌ **Build errors**: Test locally with `yarn build` first
   - ❌ **Database not accessible**: Check if cloud DB allows external connections

3. **Fix deployment environment**:
   ```env
   # For Vercel deployment
   DATABASE_URL=postgresql://postgres:passwordmanager@158.140.191.175:5432/postgres?sslmode=require&connect_timeout=10
   NEXTAUTH_URL=https://your-app-name.vercel.app
   NEXTAUTH_SECRET=your-strong-secret-here
   ```

4. **Test build locally before deploying**:
   ```bash
   yarn build
   yarn start
   # Visit http://localhost:3000 to verify
   ```

### Build Issues

1. **Clear Next.js cache**:
   ```bash
   rm -rf .next
   yarn dev
   ```

2. **Reinstall dependencies**:
   ```bash
   rm -rf node_modules yarn.lock
   yarn install
   ```

3. **Check TypeScript errors**:
   ```bash
   yarn type-check
   ```

### Authentication Issues

1. **Generate new NextAuth secret**:
   ```bash
   openssl rand -base64 32
   ```
   Then update `NEXTAUTH_SECRET` in `.env`

2. **Clear browser data** and try logging in again

3. **Verify NextAuth configuration**:
   - Check `src/lib/auth.ts` configuration
   - Ensure database connection is working
   - Verify NEXTAUTH_URL matches your domain

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Database connection string | Yes |
| `DIRECT_URL` | Direct database connection (Supabase) | Production |
| `NEXTAUTH_URL` | Application URL | Yes |
| `NEXTAUTH_SECRET` | JWT signing secret | Yes |

### Prisma Commands

```bash
# Generate client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration-name

# Deploy migrations
npx prisma migrate deploy

# Reset database
npx prisma migrate reset

# View database
npx prisma studio
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔒 Security

- All passwords are hashed using bcryptjs
- Input validation with Zod schemas
- Protected API routes with authentication checks
- CSRF protection via NextAuth.js
- SQL injection prevention via Prisma ORM

## 📞 Support

For support and questions, please open an issue in the GitHub repository.
# password-manager
