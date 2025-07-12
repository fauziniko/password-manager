#!/bin/bash

# Deployment Debug Script
# Run this script to check if your app is ready for deployment

echo "🔍 Password Manager Deployment Debug"
echo "===================================="
echo ""

# Check if required files exist
echo "📁 Checking required files..."
files=(
    "src/app/page.tsx"
    "src/app/layout.tsx"
    "src/app/dashboard/page.tsx"
    "src/app/auth/signin/page.tsx"
    "src/app/auth/signup/page.tsx"
    "package.json"
    ".env"
    "prisma/schema.prisma"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
    fi
done

echo ""

# Check environment variables
echo "🔧 Checking environment variables..."
if [ -f ".env" ]; then
    echo "✅ .env file exists"
    
    if grep -q "DATABASE_URL" .env; then
        echo "✅ DATABASE_URL is set"
    else
        echo "❌ DATABASE_URL is missing"
    fi
    
    if grep -q "NEXTAUTH_URL" .env; then
        echo "✅ NEXTAUTH_URL is set"
    else
        echo "❌ NEXTAUTH_URL is missing"
    fi
    
    if grep -q "NEXTAUTH_SECRET" .env; then
        echo "✅ NEXTAUTH_SECRET is set"
    else
        echo "❌ NEXTAUTH_SECRET is missing"
    fi
else
    echo "❌ .env file missing"
fi

echo ""

# Test database connection
echo "🗄️ Testing database connection..."
if command -v node &> /dev/null; then
    if [ -f "test-postgres.js" ]; then
        echo "Running database test..."
        node test-postgres.js
    else
        echo "❌ test-postgres.js not found"
    fi
else
    echo "❌ Node.js not found"
fi

echo ""

# Check dependencies
echo "📦 Checking dependencies..."
if [ -f "package.json" ]; then
    echo "✅ package.json exists"
    
    if [ -d "node_modules" ]; then
        echo "✅ node_modules exists"
    else
        echo "❌ node_modules missing - run 'yarn install'"
    fi
else
    echo "❌ package.json missing"
fi

echo ""

# Try building the project
echo "🔨 Testing build process..."
if command -v yarn &> /dev/null; then
    echo "Running build test..."
    yarn build
    if [ $? -eq 0 ]; then
        echo "✅ Build successful"
    else
        echo "❌ Build failed"
    fi
else
    echo "❌ Yarn not found"
fi

echo ""
echo "🎯 Deployment Readiness Summary"
echo "================================"
echo ""
echo "If all checks pass, your app is ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Push to GitHub: git add . && git commit -m 'Ready for deployment' && git push"
echo "2. Deploy to Vercel: https://vercel.com/new"
echo "3. Set environment variables in Vercel dashboard"
echo "4. Update NEXTAUTH_URL to your Vercel domain"
echo ""
echo "For detailed deployment guide, see DEPLOYMENT.md"
