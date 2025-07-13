# 🔧 Fix: Google OAuth redirect_uri_mismatch Error

## ❌ Error yang Terjadi:
```
Error 400: redirect_uri_mismatch
Anda tidak dapat login karena aplikasi ini mengirim permintaan yang tidak valid.
```

## 🔍 Penyebab:
Redirect URI di Google Console tidak sesuai dengan yang digunakan NextAuth.js

## ✅ Solusi Lengkap:

### Step 1: Buka Google Cloud Console
1. **Kunjungi**: [console.cloud.google.com](https://console.cloud.google.com)
2. **Pilih project** yang benar
3. **Navigate ke**: APIs & Services → Credentials

### Step 2: Edit OAuth 2.0 Client
1. **Klik pada Client ID** yang sudah dibuat
2. **Scroll ke "Authorized redirect URIs"**
3. **Pastikan ada entry ini PERSIS**:
   ```
   http://localhost:3000/api/auth/callback/google
   ```

### Step 3: Konfigurasi Lengkap
Pastikan konfigurasi di Google Console seperti ini:

```
OAuth 2.0 Client ID Configuration:
├─ Application type: Web application
├─ Name: Password Manager Web Client
├─ Authorized JavaScript origins:
│  └─ http://localhost:3000
└─ Authorized redirect URIs:
   └─ http://localhost:3000/api/auth/callback/google
```

### Step 4: Verifikasi Environment Variables
Pastikan file `.env` Anda memiliki:

```env
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED=true
```

### Step 5: Restart Development Server
```bash
yarn dev
```

## 🎯 Common Mistakes:

### ❌ Salah:
- `http://localhost:3000/api/auth/callback/` (tanpa google)
- `http://localhost:3000/auth/callback/google` (tanpa api)
- `https://localhost:3000/api/auth/callback/google` (https di localhost)
- `http://localhost:3000/api/auth/callback/Google` (capital G)

### ✅ Benar:
- `http://localhost:3000/api/auth/callback/google`

## 📱 Test Google OAuth:

### 1. Start Development Server:
```bash
yarn dev
```

### 2. Buka Browser:
```
http://localhost:3000/auth/signin
```

### 3. Klik "Continue with Google"
- Jika berhasil: akan redirect ke Google login
- Jika error: periksa lagi konfigurasi di atas

## 🚀 Untuk Production:

Ketika deploy ke production, tambahkan juga:

**Authorized JavaScript origins:**
```
https://your-domain.vercel.app
```

**Authorized redirect URIs:**
```
https://your-domain.vercel.app/api/auth/callback/google
```

Dan update environment variable:
```env
NEXTAUTH_URL=https://your-domain.vercel.app
```

## 🔒 Security Notes:

1. **Credentials tidak di-commit** ke GitHub ✅
2. **File .env sudah di .gitignore** ✅  
3. **Dokumentasi menggunakan placeholder** ✅
4. **Security guidelines sudah dibuat** ✅

## 📞 Need Help?

Jika masih error, periksa:
1. **Console browser** untuk error messages
2. **Network tab** untuk melihat actual redirect URL
3. **Google Console logs** untuk debugging

Your Google OAuth should work now! 🎉
