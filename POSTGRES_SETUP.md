# PostgreSQL Setup Guide untuk Password Manager

## 1. Install PostgreSQL

### macOS (menggunakan Homebrew)
```bash
brew install postgresql
brew services start postgresql
```

### Ubuntu/Debian
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Windows
Download dan install dari: https://www.postgresql.org/download/windows/

## 2. Setup Database User

Buka PostgreSQL console:
```bash
sudo -u postgres psql
```

Buat user dan set password (jika belum ada):
```sql
ALTER USER postgres PASSWORD 'password';
\q
```

## 3. Create Database

```bash
createdb -U postgres password_manager
```

Atau menggunakan SQL:
```sql
CREATE DATABASE password_manager;
```

## 4. Verifikasi Koneksi

Test koneksi ke database:
```bash
psql -U postgres -h localhost -d password_manager -c "SELECT version();"
```

## 5. Setup Environment Variables

File `.env` sudah dikonfigurasi dengan:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/password_manager"
```

## 6. Jalankan Migrasi Prisma

```bash
# Generate Prisma client
npx prisma generate

# Run database migration
npx prisma migrate dev --name init

# Seed database dengan sample data
yarn db:seed
```

## 7. Start Development Server

```bash
yarn dev
```

## Troubleshooting

### Error: password authentication failed
- Pastikan password user postgres sudah di-set: `ALTER USER postgres PASSWORD 'password';`
- Atau ubah user/password di `.env` sesuai dengan konfigurasi PostgreSQL Anda

### Error: database does not exist
- Buat database: `createdb -U postgres password_manager`

### Error: connection refused
- Pastikan PostgreSQL service berjalan:
  - macOS: `brew services start postgresql`
  - Linux: `sudo systemctl start postgresql`

### Error: role "postgres" does not exist
Buat user postgres:
```bash
sudo -u postgres createuser --superuser postgres
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'password';"
```

## Alternative Database URLs

Jika menggunakan user/password yang berbeda, ubah di `.env`:

```env
# Contoh dengan user berbeda
DATABASE_URL="postgresql://username:password@localhost:5432/password_manager"

# Contoh dengan port berbeda
DATABASE_URL="postgresql://postgres:password@localhost:5433/password_manager"

# Contoh dengan host remote
DATABASE_URL="postgresql://postgres:password@192.168.1.100:5432/password_manager"
```

## GUI Tools (Optional)

Untuk management database yang lebih mudah:
- **pgAdmin**: https://www.pgadmin.org/
- **DBeaver**: https://dbeaver.io/
- **TablePlus**: https://tableplus.com/ (macOS/Windows)

## Database Schema

Setelah migration, database akan memiliki tabel:
- `users` - Data user aplikasi
- `modems` - Data modem yang dikelola user
- `_prisma_migrations` - History migrasi Prisma
