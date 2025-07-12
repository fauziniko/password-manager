# Password Manager Dashboard

A modern web dashboard built with Next.js 15 and Tailwind CSS for managing usernames and passwords for multiple modems. Features user authentication, CRUD operations for modem management, and a responsive design.

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

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- Yarn package manager

### Installation

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd password-manager
   yarn install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   # Database
   DATABASE_URL="file:./dev.db"
   
   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-generated-secret
   
   # For production - Supabase
   # DATABASE_URL="postgresql://..."
   # DIRECT_URL="postgresql://..."
   ```

3. **Set up the database**:
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Create and migrate database
   npx prisma migrate dev --name init
   
   # Seed with sample data
   yarn db:seed
   ```

4. **Start the development server**:
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

## 🚀 Deployment

### Database Migration to Supabase

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Update environment variables**:
   ```env
   DATABASE_URL="postgresql://postgres.[project-id]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres.[project-id]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres"
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

### Production Deployment

The application is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- Railway
- DigitalOcean App Platform

## 📋 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn db:seed` - Seed database with sample data

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
