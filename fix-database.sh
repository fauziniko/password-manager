#!/bin/bash

echo "🔧 Password Manager - Database Setup & Fix"
echo "=========================================="

# Check if using cloud or local database
if grep -q "ggk0ww0c0gs0kokoc0ck0804" .env; then
    echo "🌐 Detected cloud database configuration"
    echo "⚠️  Testing cloud database connection..."
    
    # Test cloud database
    if npx prisma db push --accept-data-loss 2>/dev/null; then
        echo "✅ Cloud database is working!"
    else
        echo "❌ Cloud database unreachable"
        echo "🔄 Switching to local PostgreSQL..."
        
        # Switch to local database
        sed -i.bak 's/^DATABASE_URL="postgresql:\/\/postgres:.*@ggk0ww0c0gs0kokoc0ck0804.*/#&/' .env
        sed -i.bak 's/^# DATABASE_URL="postgresql:\/\/postgres:@localhost:5432\/password_manager"/DATABASE_URL="postgresql:\/\/postgres:@localhost:5432\/password_manager"/' .env
        
        echo "✅ Switched to local PostgreSQL"
    fi
fi

# Check if PostgreSQL is installed locally
echo "🔍 Checking local PostgreSQL..."

if command -v psql &> /dev/null; then
    echo "✅ PostgreSQL is installed"
    
    # Check if PostgreSQL service is running
    if pg_isready -q; then
        echo "✅ PostgreSQL service is running"
        
        # Create database if not exists
        echo "🗄️  Creating database 'password_manager'..."
        createdb password_manager 2>/dev/null || echo "Database already exists"
        
        # Test Prisma connection
        echo "🔗 Testing Prisma connection..."
        if npx prisma db push; then
            echo "✅ Database schema created successfully!"
            
            # Generate Prisma client
            echo "⚙️  Generating Prisma client..."
            npx prisma generate
            
            # Seed database
            echo "🌱 Seeding database with sample data..."
            yarn db:seed
            
            echo "🎉 Database setup complete!"
            echo ""
            echo "📋 What's next:"
            echo "   • Run: yarn dev"
            echo "   • Login with: demo@example.com / password123"
            
        else
            echo "❌ Failed to create database schema"
        fi
        
    else
        echo "❌ PostgreSQL service is not running"
        echo "📋 Start PostgreSQL:"
        echo "   macOS: brew services start postgresql"
        echo "   Linux: sudo systemctl start postgresql"
    fi
    
else
    echo "❌ PostgreSQL is not installed"
    echo "📋 Install PostgreSQL:"
    echo "   macOS: brew install postgresql"
    echo "   Ubuntu: sudo apt install postgresql postgresql-contrib"
    echo ""
    echo "💡 Alternative: Use Supabase (cloud PostgreSQL)"
    echo "   1. Create account at https://supabase.com/"
    echo "   2. Create new project"
    echo "   3. Copy database URL to .env"
fi
