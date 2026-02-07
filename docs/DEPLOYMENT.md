# Brand OS Deployment Guide

**Version:** 2.0  
**Last Updated:** February 7, 2026

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Environment Configuration](#environment-configuration)
4. [Database Setup](#database-setup)
5. [Production Deployment](#production-deployment)
6. [Deployment Platforms](#deployment-platforms)
7. [Monitoring & Maintenance](#monitoring--maintenance)
8. [Scaling & Performance](#scaling--performance)
9. [Security Hardening](#security-hardening)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### System Requirements

- **Node.js**: v20.x or higher
- **npm**: v10.x or higher
- **Git**: Latest stable version
- **Operating System**: Windows 10+, macOS 12+, or Linux

### Required Accounts

- **GitHub Account**: For repository access
- **Supabase Account**: For database and authentication
- **Google Cloud Account**: For AI services (Gemini API)
- **Vercel/Netlify Account**: For deployment (recommended)

---

## LocalDevelopment Setup

### Step 1: Clone the Repository

```bash
# Clone from GitHub
git clone https://github.com/iDorgham/BrandOS.git
cd BrandOS
```

### Step 2: Install Dependencies

```bash
# Navigate to web directory
cd web

# Install all dependencies
npm install

# Verify installation
npm list --depth=0
```

Expected output:
```
brand-os@2.0.0
├── react@19.0.0
├── typescript@5.9.3
├── vite@7.3.1
└── ... (other dependencies)
```

### Step 3: Environment Setup

Create a `.env` file in the `web` directory:

```bash
# Copy example environment file
cp .env.example .env
```

Edit `.env` with your configuration (see [Environment Configuration](#environment-configuration) section).

### Step 4: Start Development Server

```bash
# Start Vite development server
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## Environment Configuration

### Required Environment Variables

Create a `.env` file in the `web` directory with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# AI Service Configuration
VITE_GOOGLE_AI_API_KEY=your-gemini-api-key

# Optional: Additional AI Providers
VITE_OPENAI_API_KEY=your-openai-key
VITE_ANTHROPIC_API_KEY=your-anthropic-key

# Application Configuration
VITE_APP_ENV=development
VITE_APP_URL=http://localhost:5173

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEPLOYMENT_HUB=true
```

### Obtaining API Keys

#### Supabase Keys

1. Go to [supabase.com](https://supabase.com)
2. Create a new project or select existing
3. Navigate to **Settings → API**
4. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

#### Google AI (Gemini) API Key

1. Go to [ai.google.dev](https://ai.google.dev)
2. Click **"Get API Key"**
3. Create or select a project
4. Copy the API key → `VITE_GOOGLE_AI_API_KEY`

#### Optional: OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Navigate to **API Keys**
3. Click **"Create new secret key"**
4. Copy the key → `VITE_OPENAI_API_KEY`

---

## Database Setup

### Step 1: Create Supabase Project

1. Log in to [supabase.com](https://supabase.com)
2. Click **"New Project"**
3. Fill in:
   - **Name**: Brand OS Production
   - **Database Password**: (strong password)
   - **Region**: Choose nearest to your users
4. Click **"Create new project"**

### Step 2: Run Database Migrations

#### Option A: Using Supabase SQL Editor

1. Navigate to **SQL Editor** in Supabase dashboard
2. Click **"New Query"**
3. Copy contents from `database/schema.sql`
4. Click **"Run"**

> [!IMPORTANT]
> **Essential Post-Migration Fixes**: After running the initial schema, you **MUST** run the latest security and architecture migrations located in `supabase/migrations/`:
> - `20240208_fix_profiles_rls_final.sql`: Re-aligns RLS to `user_id` and adds `bio`.
> - `20240208_fix_recursion_final_v2.sql`: Critical fix for infinite recursion in workspaces.

#### Option B: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push
```

### Step 3: Configure Row Level Security (RLS)

RLS policies are automatically created by the migration script. Verify them:

1. Go to **Authentication → Policies** in Supabase
2. Verify tables have appropriate policies:
   - `brands`: Users see only their workspace brands
   - `assets`: Users see only their workspace assets
   - `workspace_members`: Users see only their memberships

### Step 4: Set Up Storage Buckets

```sql
-- Run in Supabase SQL Editor
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('assets', 'assets', true),
  ('references', 'references', true);

-- Set storage policies
CREATE POLICY "Users can upload assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'assets');

CREATE POLICY "Users can view assets"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'assets');
```

### Step 5: Configure Google OAuth

1. In Supabase dashboard, go to **Authentication → Providers**
2. Enable **Google** provider
3. Configure:
   - **Client ID**: From Google Cloud Console
   - **Client Secret**: From Google Cloud Console
   - **Redirect URL**: `https://your-project.supabase.co/auth/v1/callback`

#### Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Navigate to **APIs & Services → Credentials**
4. Click **"Create Credentials" → "OAuth 2.0 Client ID"**
5. Configure:
   - **Application type**: Web application
   - **Authorized redirect URIs**: Add Supabase callback URL
6. Copy **Client ID** and **Client Secret**

---

## Production Deployment

### Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database migrations run successfully
- [ ] RLS policies tested
- [ ] Google OAuth configured
- [ ] Production build tested locally
- [ ] Performance audit passed (Lighthouse score > 90)
- [ ] Security scan completed

### Build for Production

```bash
# Navigate to web directory
cd web

# Run type checking
npm run type-check

# Run linting
npm run lint

# Create production build
npm run build

# Preview production build locally
npm run preview
```

Expected output:
```
✓ 1247 modules transformed.
dist/index.html                   0.52 kB │ gzip:  0.34 kB
dist/assets/index-abc123.css    124.31 kB │ gzip: 22.14 kB
dist/assets/index-def456.js     412.89 kB │ gzip: 98.76 kB
```

---

## Deployment Platforms

### Option 1: Vercel (Recommended)

#### Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd web
vercel

# For production deployment
vercel --prod
```

#### Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click **"Import Project"**
3. Connect to GitHub repository
4. Configure:
   - **Root Directory**: `web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variables from `.env`
6. Click **"Deploy"**

### Option 2: Netlify

#### Via Netlify Dashboard

1. Go to [netlify.com](https://netlify.com)
2. Click **"Add new site" → "Import an existing project"**
3. Connect to GitHub repository
4. Configure build settings:
   ```
   Base directory: web
   Build command: npm run build
   Publish directory: web/dist
   ```
5. Add environment variables
6. Click **"Deploy site"**

#### netlify.toml Configuration

Create `netlify.toml` in the repository root:

```toml
[build]
  base = "web"
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "20"
```

### Option 3: Custom Server (VPS/Cloud)

#### Using Docker

Create `Dockerfile` in `web` directory:

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
useEXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Build and run:

```bash
# Build Docker image
docker build -t brandos:latest .

# Run container
docker run -d \
  -p 80:80 \
  --name brandos \
  brandos:latest
```

---

## Monitoring & Maintenance

### Performance Monitoring

#### Vercel Analytics

1. Go to your Vercel project dashboard
2. Navigate to **Analytics** tab
3. View metrics:
   - Page load times
   - Core Web Vitals (LCP, FID, CLS)
   - Traffic patterns

#### Google Analytics 4

Add GA4 to your application:

```typescript
// src/utils/analytics.ts
export const initGA4 = () => {
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
};
```

### Error Tracking

#### Sentry Integration

```bash
# Install Sentry SDK
npm install @sentry/react
```

```typescript
// src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

### Health Checks

Create a health check endpoint:

```typescript
// src/api/health.ts
export const healthCheck = async () => {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: await checkDatabase(),
    ai_services: await checkAIServices(),
  };
};
```

---

## Scaling & Performance

### Frontend Optimization

#### Code Splitting

```typescript
// Lazy load routes
const Dashboard = lazy(() => import('./features/dashboard/DashboardView'));
const Studio = lazy(() => import('./features/studio/StudioView'));
```

#### Asset Optimization

```bash
# Optimize images
npm install -D vite-plugin-imagemin

# Configure in vite.config.ts
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    viteImagemin({
      gifsicle: { optimizationLevel: 3 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9] },
      svgo: { plugins: [{ removeViewBox: false }] },
    }),
  ],
});
```

### Database Optimization

#### Indexing

```sql
-- Add indexes for common queries
CREATE INDEX idx_assets_brand_id ON assets(brand_id);
CREATE INDEX idx_assets_created_at ON assets(created_at DESC);
CREATE INDEX idx_brands_workspace_id ON brands(workspace_id);
```

#### Connection Pooling

Supabase automatically handles connection pooling. For custom setups:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
  {
    db: {
      schema: 'public',
    },
    auth: {
      persistSession: true,
    },
    global: {
      headers: {
        'x-application-name': 'brandos',
      },
    },
  }
);
```

### CDN Configuration

For Vercel, CDN is automatic. For custom deployments:

#### Cloudflare CDN

1. Add your domain to Cloudflare
2. Update DNS to point to Cloudflare
3. Configure caching rules:
   - **Static Assets**: Cache for 1 year
   - **HTML**: Cache for 1 hour with revalidation
   - **API Calls**: No cache

---

## Security Hardening

### Content Security Policy

Add CSP headers:

```typescript
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; img-src 'self' https://storage.brandos.app; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

### HTTPS Enforcement

Vercel and Netlify automatically provide SSL. For custom:

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name brandos.app;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name brandos.app;
    
    ssl_certificate /etc/letsencrypt/live/brandos.app/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/brandos.app/privkey.pem;
    
    # ... rest of config
}
```

### Security Hardening

#### RLS Recursion Prevention
The system implements a `SECURITY DEFINER` pattern to prevent "infinite recursion detected" errors in complex junction tables. If you create new policies that query related tables, use the provided helper functions:
- `is_workspace_member(uuid)`
- `is_workspace_owner(uuid)`
- `get_my_workspace_ids()`

#### Environment Variable Security
Never commit `.env` files. Use platform-specific secret management:

**Vercel:**
```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

**Netlify:**
Settings → Environment variables → Add variable

---

## Troubleshooting

### Common Issues

#### Build Failures

**Issue:** `Module not found` errors  
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Issue:** TypeScript errors during build  
**Solution:**
```bash
npm run type-check
# Fix errors, then
npm run build
```

#### Deployment Issues

**Issue:** Environment variables not working  
**Solution:** Ensure variables are prefixed with `VITE_` for Vite to expose them to the client.

**Issue:** 404 errors on page refresh  
**Solution:** Configure redirects (see platform-specific instructions above).

#### Performance Issues

**Issue:** Slow initial load  
**Solution:**
- Enable code splitting
- Reduce bundle size (analyze with `npm run build -- --analyze`)
- Implement lazy loading

**Issue:** Slow API responses  
**Solution:**
- Add database indexes
- Implement caching
- Use Supabase Edge Functions for heavy queries

---

## Deployment Checklist

### Pre-Launch

- [ ] All features tested in staging
- [ ] Performance audit passed (Lighthouse > 90)
- [ ] Security audit completed
- [ ] Error tracking configured (Sentry)
- [ ] Analytics configured (GA4)
- [ ] Backup strategy implemented
- [ ] Monitoring alerts set up
- [ ] Documentation updated
- [ ] Team training completed

### Launch Day

- [ ] Deploy to production
- [ ] Verify all environment variables
- [ ] Test critical user flows
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Announce launch to users

### Post-Launch

- [ ] Monitor for 24 hours
- [ ] Address any critical issues
- [ ] Gather user feedback
- [ ] Plan iteration sprints

---

## Support & Resources

- **Technical Documentation**: [docs.brandos.app/deployment](https://docs.brandos.app/deployment)
- **DevOps Support**: devops@brandos.app
- **Emergency Hotline**: Available for enterprise customers

---

🚀 **Your Brand OS deployment is ready to transform brand creativity at scale!**
