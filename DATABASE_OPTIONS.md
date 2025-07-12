# Database Configuration Options

## Current Issue
Database cloud server tidak dapat dijangkau:
```
Error: P1001: Can't reach database server at `ggk0ww0c0gs0kokoc0ck0804:5432`
```

## Solutions (Pilih salah satu)

### Option 1: Database Cloud (Railway, Render, etc.)
Jika menggunakan Railway, Render, atau cloud provider lain:
```env
DATABASE_URL="postgresql://username:password@hostname:5432/database_name"
```

### Option 2: Supabase Database
```env
DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"
```

### Option 3: Local PostgreSQL (Recommended untuk development)
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/password_manager"
```

### Option 4: ElephantSQL (Free PostgreSQL)
1. Buat account di https://www.elephantsql.com/
2. Buat instance gratis
3. Copy URL yang diberikan

### Option 5: Neon.tech (Free PostgreSQL)
1. Buat account di https://neon.tech/
2. Buat database
3. Copy connection string

## Quick Setup Local PostgreSQL

### macOS:
```bash
# Install PostgreSQL
brew install postgresql
brew services start postgresql

# Create database
createdb password_manager

# Update .env
DATABASE_URL="postgresql://postgres:@localhost:5432/password_manager"
```

### Ubuntu/Linux:
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql

# Create database
sudo -u postgres createdb password_manager
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'password';"

# Update .env
DATABASE_URL="postgresql://postgres:password@localhost:5432/password_manager"
```

### Windows:
1. Download PostgreSQL dari https://www.postgresql.org/download/windows/
2. Install dan set password untuk user postgres
3. Buat database `password_manager`
4. Update .env sesuai konfigurasi

## Testing Database Connection

Setelah update .env, test dengan:
```bash
npx prisma db push
npx prisma generate
yarn db:seed
```

## Recommended: Use Supabase (Free Tier)

1. Buat account di https://supabase.com/
2. Buat project baru
3. Ambil database URL dari Settings > Database
4. Update .env dengan URL tersebut

Supabase memberikan PostgreSQL gratis dengan UI management yang bagus.
