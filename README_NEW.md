# 🔐 Password Manager Dashboard

A modern Next.js web application for managing usernames and passwords for multiple modems with secure authentication and cloud database integration.

## 🎯 Features

- 🔐 **Secure Authentication**: Email/password + Google OAuth
- 📱 **Modern UI**: Responsive design with Tailwind CSS  
- 🗄️ **Cloud Database**: PostgreSQL integration with Prisma ORM
- 🔒 **Password Management**: Securely store and manage modem credentials
- 👤 **User Profile**: Update profile information and change passwords
- 🌐 **Production Ready**: Deployed on cloud infrastructure

## 🚀 Quick Start

```bash
# 1. Clone and install
git clone <your-repo-url>
cd password-manager
yarn install

# 2. Setup environment
cp .env.example .env
# Edit .env with your database and OAuth credentials

# 3. Setup database
yarn db:generate && yarn db:push && yarn db:seed

# 4. Run development server
yarn dev
```

Visit: `http://localhost:3000`

## 📖 Complete Documentation

**👉 For detailed setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)**

The setup guide includes:
- 🔧 Environment configuration
- 🗄️ Database setup (local/cloud)
- 🔑 Google OAuth configuration
- 🚀 Deployment instructions
- 🔧 Troubleshooting guide
- 🔒 Security best practices

## 👤 Demo User

After running `yarn db:seed`:
```
Email: demo@example.com
Password: demo123456
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 + App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js + Google OAuth
- **Deployment**: Vercel-ready

## 🔧 Development Commands

```bash
yarn dev              # Start development server
yarn build            # Build for production
yarn start            # Start production server
yarn db:generate      # Generate Prisma client
yarn db:push          # Push schema to database
yarn db:seed          # Seed demo data
yarn db:studio        # Open database GUI
yarn lint             # Run ESLint
```

## 🌐 Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically

For detailed deployment instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md#-deployment)

## 🔒 Security

- ✅ **Password Hashing**: bcryptjs for secure storage
- ✅ **Environment Variables**: Sensitive data protection
- ✅ **Database SSL**: Secure connections
- ✅ **OAuth Integration**: Google authentication
- ✅ **Input Validation**: Server-side validation

## 📁 Project Structure

```
password-manager/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # Reusable components
│   ├── lib/                # Utilities and configs
│   └── types/              # TypeScript definitions
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.mjs           # Database seeding
└── SETUP_GUIDE.md         # Complete documentation
```

---

**🎉 Ready to manage your modem passwords securely!**

For any issues or detailed instructions, check [SETUP_GUIDE.md](./SETUP_GUIDE.md)
