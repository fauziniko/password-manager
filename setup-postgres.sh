#!/bin/bash

# PostgreSQL Database Setup Script for Password Manager
echo "🔧 Setting up PostgreSQL Database for Password Manager"

# Check if PostgreSQL is running
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL first."
    echo "📋 Installation instructions:"
    echo "   macOS: brew install postgresql"
    echo "   Ubuntu: sudo apt-get install postgresql postgresql-contrib"
    echo "   Windows: Download from https://www.postgresql.org/download/"
    exit 1
fi

# Database configuration
DB_NAME="password_manager"
DB_USER="postgres"
DB_PASSWORD="password"

echo "📊 Database Configuration:"
echo "   Database: $DB_NAME"
echo "   User: $DB_USER"
echo "   Password: $DB_PASSWORD"
echo "   Host: localhost"
echo "   Port: 5432"

# Check if PostgreSQL service is running
if ! pg_isready -q; then
    echo "❌ PostgreSQL service is not running. Please start PostgreSQL first."
    echo "📋 Start PostgreSQL:"
    echo "   macOS: brew services start postgresql"
    echo "   Linux: sudo systemctl start postgresql"
    exit 1
fi

echo "✅ PostgreSQL service is running"

# Create database
echo "🗄️  Creating database '$DB_NAME'..."
createdb -U postgres $DB_NAME 2>/dev/null || echo "Database already exists or error creating database"

# Test connection
echo "🔗 Testing database connection..."
PGPASSWORD=$DB_PASSWORD psql -U $DB_USER -h localhost -d $DB_NAME -c "SELECT version();" > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Database connection successful!"
    echo "🎉 PostgreSQL setup complete!"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Run: npx prisma migrate dev --name init"
    echo "   2. Run: npx prisma generate"
    echo "   3. Run: yarn db:seed"
    echo "   4. Run: yarn dev"
else
    echo "❌ Database connection failed!"
    echo "📋 Please check:"
    echo "   1. PostgreSQL is running"
    echo "   2. User 'postgres' exists with password 'password'"
    echo "   3. Database permissions are correct"
    echo ""
    echo "🔧 You may need to set up PostgreSQL user:"
    echo "   sudo -u postgres psql"
    echo "   ALTER USER postgres PASSWORD 'password';"
    echo "   \\q"
fi
