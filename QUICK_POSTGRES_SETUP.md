# 🐘 Database PostgreSQL - Quick Setup Guide

Database yang Anda berikan tidak dapat dijangkau. Berikut opsi alternatif:

## ⚡ Opsi Tercepat: Neon.tech (Gratis)

1. **Daftar di** https://neon.tech
2. **Buat database baru**
3. **Copy connection string** (format: `postgresql://username:password@ep-xxx.neon.tech/neondb`)
4. **Update .env file** dengan connection string baru

## 🐳 Opsi Docker (Rekomendasi untuk Development)

```bash
# 1. Install Docker Desktop
# 2. Jalankan PostgreSQL container:
docker run --name password-manager-db \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=password_manager \
  -p 5432:5432 \
  -d postgres:15

# 3. Update .env:
DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/password_manager"
```

## 💻 PostgreSQL Lokal

**macOS:**
```bash
brew install postgresql
brew services start postgresql
createdb password_manager
```

**Ubuntu:**
```bash
sudo apt install postgresql
sudo -u postgres createdb password_manager
```

**Update .env:**
```env
DATABASE_URL="postgresql://postgres:@localhost:5432/password_manager"
```

## 🔧 Setelah Setup Database

```bash
# Generate Prisma client
npx prisma generate

# Jalankan migrasi
npx prisma migrate dev --name init

# Test koneksi
node test-postgres.js

# Seed data
npm run db:seed

# Start aplikasi
npm run dev
```

## 📝 Format Connection String

```
postgresql://[user]:[password]@[host]:[port]/[database]
```

Contoh:
- Local: `postgresql://postgres:@localhost:5432/password_manager`
- Docker: `postgresql://postgres:mypassword@localhost:5432/password_manager`
- Neon: `postgresql://user:pass@ep-xxx.neon.tech/neondb`

Pilih salah satu opsi di atas dan update file `.env` dengan connection string yang sesuai.
