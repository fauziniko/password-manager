# Cara Mendapatkan Google OAuth Credentials

## 🔐 Langkah-langkah Mendapatkan Google Client ID dan Secret

### Step 1: Buka Google Cloud Console

1. **Kunjungi**: [Google Cloud Console](https://console.cloud.google.com/)
2. **Login** dengan akun Google Anda
3. **Pilih atau buat project baru**:
   - Klik dropdown project di bagian atas
   - Klik "New Project"
   - Nama project: `Password Manager OAuth`
   - Klik "Create"

### Step 2: Enable Google APIs

1. **Di sidebar kiri, pilih**: "APIs & Services" → "Library"
2. **Cari**: "Google+ API" atau "People API"
3. **Klik pada API** dan klik **"Enable"**
4. **Juga enable**: "Google People API" (recommended)

### Step 3: Configure OAuth Consent Screen

1. **Pilih**: "APIs & Services" → "OAuth consent screen"
2. **Pilih**: "External" (kecuali Anda punya Google Workspace)
3. **Isi informasi wajib**:
   ```
   App name: Password Manager Dashboard
   User support email: email-anda@gmail.com
   Developer contact email: email-anda@gmail.com
   ```
4. **Klik "Save and Continue"**

5. **Di halaman Scopes**:
   - Klik "Add or Remove Scopes"
   - Pilih:
     - `../auth/userinfo.email`
     - `../auth/userinfo.profile`
   - Klik "Update" dan "Save and Continue"

6. **Di halaman Test Users**:
   - Klik "Add Users"
   - Tambahkan email Anda dan email lain yang akan test
   - Klik "Save and Continue"

7. **Review dan klik "Back to Dashboard"**

### Step 4: Buat OAuth 2.0 Credentials

1. **Pilih**: "APIs & Services" → "Credentials"
2. **Klik**: "Create Credentials" → "OAuth 2.0 Client IDs"
3. **Application type**: "Web application"
4. **Name**: `Password Manager Web Client`

5. **Authorized JavaScript origins**:
   ```
   http://localhost:3000
   https://your-app-name.vercel.app
   ```

6. **Authorized redirect URIs**:
   ```
   http://localhost:3000/api/auth/callback/google
   https://your-app-name.vercel.app/api/auth/callback/google
   ```

7. **Klik "Create"**

### Step 5: Copy Credentials

Setelah dibuat, Anda akan mendapatkan popup dengan:

```
Client ID: [Your-Google-Client-ID-Will-Appear-Here]
Client Secret: [Your-Google-Client-Secret-Will-Appear-Here]
```

**⚠️ SIMPAN CREDENTIALS INI! Anda akan membutuhkannya untuk konfigurasi.**

### Step 6: Update Environment Variables

Edit file `.env` Anda:

```env
# Google OAuth - Ganti dengan credentials yang Anda dapatkan
GOOGLE_CLIENT_ID=[Your-Google-Client-ID]
GOOGLE_CLIENT_SECRET=[Your-Google-Client-Secret]

# Enable Google OAuth di UI
NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED=true
```

## 📸 Screenshot Panduan Visual

### 1. Google Cloud Console - Project Selection
```
[Google Cloud Console Header]
My Project ▼  |  Search  |  Account
              └─ New Project
                 └─ Project name: Password Manager OAuth
                 └─ Create
```

### 2. OAuth Consent Screen Configuration
```
OAuth consent screen
├─ User Type: ○ Internal  ● External
├─ App information
│  ├─ App name: Password Manager Dashboard
│  ├─ User support email: your-email@gmail.com
│  └─ Developer contact: your-email@gmail.com
└─ Save and Continue
```

### 3. Credentials Creation
```
Create OAuth 2.0 Client ID
├─ Application type: Web application
├─ Name: Password Manager Web Client
├─ Authorized JavaScript origins:
│  ├─ http://localhost:3000
│  └─ https://your-app.vercel.app
└─ Authorized redirect URIs:
   ├─ http://localhost:3000/api/auth/callback/google
   └─ https://your-app.vercel.app/api/auth/callback/google
```

## 🧪 Testing Setup

### 1. Update .env file

```bash
# Copy credentials dari Google Console
GOOGLE_CLIENT_ID=[your-actual-client-id]
GOOGLE_CLIENT_SECRET=[your-actual-client-secret]
NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED=true
```

### 2. Restart development server

```bash
yarn dev
```

### 3. Test Google OAuth

1. Kunjungi: http://localhost:3000/auth/signin
2. Klik "Continue with Google"
3. Login dengan akun Google
4. Anda akan diredirect ke dashboard

## 🚨 Troubleshooting

### Error: "redirect_uri_mismatch"
**Solusi**: Pastikan redirect URI di Google Console sama persis:
```
http://localhost:3000/api/auth/callback/google
```

### Error: "invalid_client"
**Solusi**: 
- Periksa GOOGLE_CLIENT_ID dan GOOGLE_CLIENT_SECRET
- Pastikan tidak ada spasi ekstra
- Pastikan menggunakan credentials yang benar

### Error: "Access blocked"
**Solusi**:
- Tambahkan email Anda sebagai test user
- Pastikan OAuth consent screen sudah dikonfigurasi
- Periksa scopes yang diperlukan sudah ditambahkan

### Google button tidak muncul
**Solusi**:
- Pastikan `NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED=true`
- Restart development server
- Periksa console browser untuk error

## 🔒 Security Tips

### Untuk Development
- Gunakan http://localhost:3000 untuk testing
- Jangan commit credentials ke Git
- Gunakan environment variables

### Untuk Production
- Ganti authorized origins dengan domain production
- Ganti authorized redirect URIs dengan domain production
- Submit OAuth consent screen untuk review (opsional)

## 📋 Checklist Setup

- [ ] Buat Google Cloud Project
- [ ] Enable Google APIs (People API)
- [ ] Konfigurasi OAuth consent screen
- [ ] Tambahkan test users
- [ ] Buat OAuth 2.0 credentials
- [ ] Copy Client ID dan Secret
- [ ] Update .env file
- [ ] Set NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED=true
- [ ] Restart development server
- [ ] Test Google login

## 🎯 Hasil Akhir

Setelah selesai setup, Anda akan memiliki:

1. **Google OAuth terintegrasi** di aplikasi
2. **Tombol "Continue with Google"** di halaman login/register
3. **One-click authentication** dengan akun Google
4. **User data otomatis** terisi dari Google profile

Your Google OAuth is ready! 🎉
