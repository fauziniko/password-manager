# 🔄 Migrasi dari SQLite ke PostgreSQL

Guide ini akan membantu Anda migrasi database Password Manager dari SQLite ke PostgreSQL.

## 📋 Checklist Migrasi

### ✅ Persiapan
- [ ] PostgreSQL sudah terinstall
- [ ] PostgreSQL service berjalan
- [ ] Database `password_manager` sudah dibuat
- [ ] User postgres dengan password sudah dikonfigurasi

### ✅ File yang Sudah Diubah
- [x] `.env` - Database URL diubah ke PostgreSQL
- [x] `prisma/schema.prisma` - Provider diubah ke postgresql
- [x] Package scripts ditambahkan untuk PostgreSQL

## 🚀 Langkah-langkah Migrasi

### 1. Install PostgreSQL

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Setup Database

```bash
# Jalankan script setup otomatis
yarn db:setup

# Atau manual:
createdb -U postgres password_manager
```

### 3. Test Koneksi

```bash
# Test koneksi PostgreSQL
yarn db:test
```

### 4. Reset Migrasi Prisma

```bash
# Hapus migrasi SQLite lama
rm -rf prisma/migrations/

# Generate ulang Prisma client
yarn db:generate
```

### 5. Buat Migrasi Baru

```bash
# Buat migrasi untuk PostgreSQL
yarn db:migrate
# Atau: npx prisma migrate dev --name init
```

### 6. Seed Database

```bash
# Tambahkan data sample
yarn db:seed
```

### 7. Test Aplikasi

```bash
# Start development server
yarn dev
```

## 🔧 Troubleshooting

### Error: "password authentication failed"
```bash
# Set password untuk user postgres
sudo -u postgres psql
ALTER USER postgres PASSWORD 'password';
\q
```

### Error: "database does not exist"
```bash
# Buat database
createdb -U postgres password_manager
```

### Error: "connection refused"
```bash
# Start PostgreSQL service
# macOS:
brew services start postgresql

# Linux:
sudo systemctl start postgresql
```

### Error: Prisma migration issues
```bash
# Reset semua migrasi
yarn db:reset

# Atau manual:
rm -rf prisma/migrations/
npx prisma migrate dev --name init
```

## 📊 Verifikasi Migrasi

Setelah migrasi selesai, pastikan:

1. **Database Connection**: `yarn db:test` berhasil
2. **Tables Created**: User dan Modem tables ada
3. **Sample Data**: Login dengan demo@example.com/password123
4. **App Running**: `yarn dev` berjalan tanpa error

## 🎯 Configuration Summary

**File `.env`:**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/password_manager"
```

**File `prisma/schema.prisma`:**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## 🔄 Rollback ke SQLite (jika diperlukan)

Jika ingin kembali ke SQLite:

1. Ubah `.env`:
   ```env
   DATABASE_URL="file:./dev.db"
   ```

2. Ubah `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

3. Reset migrasi:
   ```bash
   rm -rf prisma/migrations/
   npx prisma migrate dev --name init
   yarn db:seed
   ```

## 📖 Resources

- [PostgreSQL Setup Guide](./POSTGRES_SETUP.md)
- [Prisma PostgreSQL Documentation](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
- [PostgreSQL Official Documentation](https://www.postgresql.org/docs/)

## ✅ Migration Complete!

Setelah mengikuti semua langkah di atas, aplikasi Password Manager Anda sekarang menggunakan PostgreSQL sebagai database utama.
