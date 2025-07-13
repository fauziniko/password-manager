# 🔒 Security Guidelines - Environment Variables

## ⚠️ PENTING: Keamanan Credentials

### ❌ JANGAN PERNAH:
- Push file `.env` ke GitHub
- Commit credentials di kode atau dokumentasi
- Share credentials di chat/email
- Hardcode credentials di source code

### ✅ SELALU:
- Gunakan `.env.example` untuk template
- Simpan credentials di environment variables
- Gunakan placeholder dalam dokumentasi
- Regular rotate credentials

## 📋 Checklist Keamanan

### Sebelum Commit:
- [ ] File `.env` ada di `.gitignore`
- [ ] Tidak ada credentials di kode
- [ ] Tidak ada credentials di dokumentasi
- [ ] Gunakan placeholder values

### File yang Aman untuk Commit:
- ✅ `.env.example` (dengan placeholder values)
- ✅ Source code tanpa credentials
- ✅ Dokumentasi dengan placeholder
- ✅ `.gitignore` yang mencakup `.env*`

### File yang TIDAK Boleh di-commit:
- ❌ `.env` (credentials asli)
- ❌ `.env.local` (credentials lokal)
- ❌ `.env.production` (credentials production)
- ❌ File backup dengan credentials

## 🛡️ Best Practices

### Environment Variables:
```bash
# Development
cp .env.example .env
# Edit .env dengan credentials asli

# Production
# Set environment variables di platform deployment
```

### Dokumentasi:
```markdown
# Gunakan placeholder
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_actual_google_client_secret

# BUKAN credentials asli
```

### Deployment:
```bash
# Set di platform deployment (Vercel, Netlify, etc)
# JANGAN commit credentials
```

## 🚨 Jika Credentials Ter-commit

### Langkah Darurat:
1. **Segera revoke credentials** di Google Console
2. **Generate credentials baru**
3. **Remove dari Git history** (git filter-branch/BFG)
4. **Update .env dengan credentials baru**
5. **Update deployment environment**

### Prevention:
```bash
# Pastikan .gitignore benar
echo ".env*" >> .gitignore

# Check status sebelum commit
git status

# Review changes sebelum commit
git diff --cached
```

## 📖 Template Aman

### .env.example:
```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_actual_google_client_secret
NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED=false
```

### README.md:
```markdown
## Setup Environment Variables

1. Copy template:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

2. Get Google OAuth credentials from Google Console
3. Update .env with your actual credentials
4. Never commit .env file
```

## 🔄 Recovery Process

Jika GitHub block push karena secrets terdeteksi:

### Option 1: Remove dari Documentation
```bash
# Edit file yang mengandung secrets
# Replace dengan placeholder values
git add .
git commit -m "Remove credentials from documentation"
git push
```

### Option 2: Rewrite Git History (Advanced)
```bash
# Remove sensitive commit dari history
git rebase -i HEAD~2
# Pilih 'drop' untuk commit yang mengandung secrets
```

### Option 3: Revoke & Regenerate
```bash
# 1. Revoke credentials di Google Console
# 2. Generate credentials baru
# 3. Update .env (local only)
# 4. Update deployment environment
```

Remember: **Security first!** 🔒
