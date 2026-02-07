# Brand OS - Data Persistence Setup

## 🚀 Overview

Brand OS now supports full cloud persistence using Supabase, replacing localStorage with a production-ready database solution. This provides:

- ✅ **User Authentication** via Google OAuth
- ✅ **Cloud Storage** for all brand profiles, assets, and data
- ✅ **Real-time Sync** across multiple devices
- ✅ **Automatic Migration** from localStorage
- ✅ **Row Level Security** for data privacy
- ✅ **Offline Ready** architecture

## 📋 Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization and project name
4. Set a strong database password
5. Wait for project to be ready (2-3 minutes)

### 2. Run Database Schema

1. Navigate to **SQL Editor** in your Supabase dashboard
2. Copy the entire contents of `database/schema.sql`
3. Paste and run the SQL script
4. Verify all tables are created successfully

### 3. Configure Authentication

1. Go to **Authentication** → **Settings**
2. Enable **Google** provider
3. Add your domain redirect URL: `https://yourdomain.com/auth/callback`
   - For local dev: `http://localhost:3000/auth/callback`
4. Save configuration

### 4. Get Environment Variables

1. Go to **Project Settings** → **API**
2. Copy your **Project URL** and **anon public key**
3. Create `.env` file in web directory with:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Deploy and Configure

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

## 🗄️ Database Schema

The database includes these tables:

### `profiles`
User profile information linked to auth.users
- Full name, avatar URL
- Auto-created on user signup

### `brands`
Brand DNA configurations
- Name, doctrine, palette, background
- Grammar rules, patterns, signatures
- Row Level Security (users only see their own brands)

### `assets`
Generated creative assets
- Image URLs, prompts, compliance scores
- Linked to brand and user
- Metadata and audit details

### `prompt_history`
Historical prompt generations
- Subject, orchestrated prompt, asset type
- Intensity settings
- Limited to 30 recent entries per user

## 🔄 Migration Process

The system automatically detects localStorage data and offers migration:

1. User signs in with Google OAuth
2. System detects existing localStorage data
3. Click "Sync Local Data" in Settings
4. All data migrates to Supabase
5. localStorage is cleared automatically

## 🚦 Real-time Features

- **Brand Updates**: Instant sync across devices when editing brand DNA
- **Asset Library**: New assets appear immediately in Library view
- **Collaboration Ready**: Multiple users can work with shared brands (future feature)

## 🔐 Security

- **Row Level Security**: Users can only access their own data
- **OAuth Authentication**: No password storage
- **API Keys**: Supabase anon key for public access
- **Environment Variables**: Sensitive config not in code

## 📱 Usage Examples

### Authentication
```typescript
// User signs in with Google
await signInWithGoogle();

// Current user
const user = await getCurrentUser();

// Sign out
await signOut();
```

### Brand Management
```typescript
// Create new brand
const brand = await brandService.createBrand({
  name: "New Brand",
  doctrine: "Brand philosophy...",
  palette: [...]
});

// Update brand
await brandService.updateBrand(updatedBrand);
```

### Asset Management
```typescript
// Create new asset
const asset = await assetService.createAsset({
  url: "data:image/...",
  prompt: "Generated prompt",
  brandId: "brand-uuid",
  complianceScore: 95
});
```

## 🛠️ Development Notes

### Local Development
```bash
# With .env file configured
npm run dev

# Environment variables are automatically loaded
# Data persists to Supabase in real-time
```

### Production Deployment
```bash
# Build for production
npm run build

# Deploy dist/ folder to your hosting
# Ensure environment variables are set in hosting platform
```

### Monitoring
- Check **Supabase Dashboard** for database activity
- Monitor **Auth** → **Users** for signups
- Review **Database** → **Logs** for errors

## 🔄 Fallback Strategy

If Supabase is unavailable:
- System gracefully falls back to localStorage
- Users see degraded but functional experience
- Automatic sync when connection restored

## 📊 Performance

- **Indexes** on all frequently queried columns
- **Real-time subscriptions** only when user is authenticated
- **Lazy loading** for large datasets
- **Connection pooling** via Supabase client

---

**Status**: ✅ Production Ready
**Migration**: ✅ Automatic from localStorage
**Authentication**: ✅ Google OAuth
**Real-time**: ✅ Multi-device sync