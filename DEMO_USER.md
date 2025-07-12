# 👤 Demo User - Password Manager

## 🔐 Demo Login Credentials

### User Demo Utama
```
📧 Email: demo@example.com
🔑 Password: password123
👤 Nama: Demo User
```

## 📡 Sample Modems (3 perangkat)

### 1. Home Router
- **Name**: Home Router
- **Type**: TP-Link Archer C7
- **IP Address**: 192.168.1.1
- **Username**: admin
- **Password**: admin123
- **Description**: Main home router for internet access

### 2. Office Modem
- **Name**: Office Modem
- **Type**: Huawei HG8245H
- **IP Address**: 192.168.0.1
- **Username**: user
- **Password**: user123
- **Description**: Office fiber modem

### 3. Backup Router
- **Name**: Backup Router
- **Type**: Xiaomi Mi Router 4A
- **IP Address**: 192.168.2.1
- **Username**: root
- **Password**: xiaomi123
- **Description**: Backup router for guest network

## 🚀 Cara Login & Testing

### Step 1: Access Application
```bash
# Start development server
yarn dev

# Open browser
http://localhost:3000
```

### Step 2: Login
1. Klik **"Sign In"**
2. Masukkan email: `demo@example.com`
3. Masukkan password: `password123`
4. Klik **"Sign in"**

### Step 3: Features yang Bisa Ditest
- ✅ **Dashboard**: Lihat 3 modem yang sudah ada
- ✅ **Search**: Coba search "Home", "Office", atau "Backup"
- ✅ **Add Modem**: Tambah modem baru
- ✅ **Edit Modem**: Edit data modem yang ada
- ✅ **Delete Modem**: Hapus modem (dengan konfirmasi)
- ✅ **Profile**: Update nama dan email user
- ✅ **Change Password**: Ganti password user
- ✅ **Logout**: Logout dari aplikasi

## 🔧 Reset Demo Data

Jika ingin reset ke data awal:
```bash
# Re-seed database
yarn db:seed
```

## 📱 Responsive Design
- ✅ **Desktop**: Full features
- ✅ **Tablet**: Responsive layout
- ✅ **Mobile**: Mobile-friendly interface

## 🔒 Security Features
- ✅ **Password Hashing**: bcryptjs dengan salt rounds
- ✅ **Session Management**: JWT-based dengan NextAuth
- ✅ **Input Validation**: Zod schema validation
- ✅ **CSRF Protection**: Built-in NextAuth protection
- ✅ **Authentication**: Protected routes dan API

## 🎯 Demo Scenarios

### Scenario 1: Manager IT
- Login sebagai demo user
- Lihat semua modem kantor
- Tambah modem baru untuk ruang meeting
- Edit password modem yang sudah expired

### Scenario 2: Network Admin
- Search modem berdasarkan IP atau nama
- Update deskripsi modem
- Ganti password default modem

### Scenario 3: Personal Use
- Simpan password router rumah
- Tambah modem backup
- Export data (coming soon)

## 📊 Database Status
```
✅ PostgreSQL Cloud: Connected
🏠 Host: 158.140.191.175:5432
📊 Database: postgres
👥 Users: 1 demo user
📡 Modems: 3 sample devices
```

## 🌟 Pro Tips
1. **Password Visibility**: Klik icon mata untuk show/hide password
2. **Responsive Search**: Search real-time tanpa perlu tekan enter
3. **Quick Actions**: Hover pada modem card untuk aksi edit/delete
4. **Form Validation**: Semua input ter-validasi real-time
5. **Auto-redirect**: Login otomatis redirect ke dashboard

---

### 🎉 Ready to Demo!
User demo sudah siap untuk testing dan demonstrasi aplikasi Password Manager!
