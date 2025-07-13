# Google OAuth Setup Guide

## 🔐 Setup Google OAuth untuk Authentication

### Langkah 1: Buat Google Cloud Project

1. **Buka [Google Cloud Console](https://console.cloud.google.com/)**
2. **Buat project baru** atau pilih project yang sudah ada
3. **Enable Google APIs**:
   - Pergi ke "APIs & Services" → "Library"
   - Cari "Google+ API" atau "People API"
   - Klik "Enable"

### Langkah 2: Konfigurasi OAuth Consent Screen

1. **Pergi ke "APIs & Services" → "OAuth consent screen"**
2. **Pilih "External" user type** (kecuali punya Google Workspace)
3. **Isi informasi yang diperlukan**:
   - App name: `Password Manager Dashboard`
   - User support email: Email Anda
   - Developer contact email: Email Anda
4. **Tambahkan scopes**:
   - `../auth/userinfo.email`
   - `../auth/userinfo.profile`
5. **Tambahkan test users** (alamat email yang akan digunakan untuk testing)
6. **Save dan continue**

### Langkah 3: Buat OAuth Credentials

1. **Pergi ke "APIs & Services" → "Credentials"**
2. **Klik "Create Credentials" → "OAuth 2.0 Client IDs"**
3. **Application type**: Web application
4. **Name**: `Password Manager Web Client`
5. **Authorized JavaScript origins**:
   ```
   http://localhost:3000
   https://your-domain.vercel.app
   ```
6. **Authorized redirect URIs**:
   ```
   http://localhost:3000/api/auth/callback/google
   https://your-domain.vercel.app/api/auth/callback/google
   ```
7. **Klik "Create"**

### Step 4: Get Your Credentials

After creating, you'll get:
- **Client ID**: `123456789-abc123.apps.googleusercontent.com`
- **Client Secret**: `[Your-Google-Client-Secret]`

### Step 5: Update Environment Variables

Add to your `.env` file:
```env
# Google OAuth
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

### Step 6: Update Production Environment

For deployment (Vercel/Netlify/etc.), add the same environment variables:

```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
NEXTAUTH_URL=https://your-domain.vercel.app
```

**Important**: Update the authorized redirect URIs in Google Console with your production domain!

## 🧪 Testing Google OAuth

### Local Testing

1. **Start development server**:
   ```bash
   yarn dev
   ```

2. **Visit**: http://localhost:3000/auth/signin

3. **Click "Continue with Google"**

4. **You should see Google login popup**

5. **After authentication, you'll be redirected to dashboard**

### Troubleshooting

#### Error: "redirect_uri_mismatch"
- Check that your redirect URI exactly matches what's in Google Console
- Format should be: `http://localhost:3000/api/auth/callback/google`

#### Error: "Access blocked"
- Make sure OAuth consent screen is configured
- Add your email as a test user
- Check that required scopes are added

#### Error: "invalid_client"
- Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are correct
- Check for extra spaces or quotes in environment variables

#### User data not saving
- Verify database schema is updated (`npx prisma db push`)
- Check that all required tables exist (User, Account, Session, VerificationToken)

## 🔒 Security Considerations

### Production Settings

1. **OAuth Consent Screen**: Submit for verification for production use
2. **Authorized domains**: Limit to your actual domains
3. **API restrictions**: Enable only necessary Google APIs
4. **Regular audits**: Monitor OAuth usage and tokens

### Environment Security

1. **Never commit credentials** to version control
2. **Use different credentials** for development and production
3. **Rotate secrets** regularly
4. **Monitor access logs** in Google Cloud Console

## 📱 User Experience

### What Users See

1. **Login/Register pages** now have "Continue with Google" button
2. **One-click authentication** with Google account
3. **No password required** for Google OAuth users
4. **Profile information** automatically populated from Google

### Mixed Authentication

Users can:
- ✅ Register with email/password
- ✅ Register with Google OAuth
- ✅ Have both authentication methods (if same email)
- ✅ Switch between login methods seamlessly

## 🚀 Features Added

### Database Schema Updates
- ✅ `Account` model for OAuth providers
- ✅ `Session` model for session management  
- ✅ `VerificationToken` model for security
- ✅ Made `password` optional in User model

### UI Updates
- ✅ Google sign-in button on login page
- ✅ Google sign-up button on register page
- ✅ Visual dividers and improved styling
- ✅ Proper loading states

### Backend Updates
- ✅ NextAuth.js configured with Google provider
- ✅ Prisma adapter for database integration
- ✅ Secure credential handling
- ✅ Proper callback URLs

## 📊 Current Status

- ✅ **Database**: Updated schema with OAuth support
- ✅ **Authentication**: Google OAuth fully configured
- ✅ **UI**: Login/Register pages updated
- ✅ **Security**: Proper credential handling
- ⚠️ **Setup Required**: Google Cloud Console configuration
- ⚠️ **Environment**: Add Google OAuth credentials

## 🎯 Next Steps

1. **Complete Google Cloud setup** following steps above
2. **Add credentials to environment variables**
3. **Test locally** with your Google account
4. **Deploy with production credentials**
5. **Verify OAuth flow** in production

Your app now supports both email/password AND Google OAuth authentication! 🎉
