# Deploying Brand OS to Vercel (Free)

This guide will help you deploy Brand OS to Vercel's free tier in minutes.

## ✨ Why Vercel?

- ✅ **100% Free** for hobby projects
- ✅ **Automatic Deployments** from GitHub
- ✅ **Perfect for React/Vite** apps
- ✅ **Built-in SSL** certificate
- ✅ **Global CDN** for fast performance
- ✅ **Easy environment variable** management

---

## 🚀 Deployment Steps

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Project

1. Click **"Add New..." → "Point"**
2. Select **"Import Git Repository"**
3. Find and select **"BrandOS"** repository
4. Click **"Import"**

### Step 3: Configure Project

Vercel will auto-detect your project settings, but verify:

- **Framework Preset**: Vite (auto-detected)
- **Root Directory**: `./` (leave as root)
- **Build Command**: `cd web && npm run build` (configured in vercel.json)
- **Output Directory**: `web/dist` (configured in vercel.json)

Click **"Deploy"** to proceed.

### Step 4: Add Environment Variables

**BEFORE** the first deployment completes, add your environment variables:

1. Go to **"Settings"** tab (top navigation)
2. Click **"Environment Variables"** in the sidebar
3. Add the following variables:

#### Required Variables

| Variable Name | Value | Where to Get |
|--------------|-------|--------------|
| `VITE_SUPABASE_URL` | `https://your-project.supabase.co` | Supabase Dashboard → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | `your-anon-key` | Supabase Dashboard → Settings → API → anon public |
| `VITE_GOOGLE_AI_API_KEY` | `your-gemini-api-key` | [Google AI Studio](https://ai.google.dev) |

#### Optional Variables (for additional features)

| Variable Name | Value | Purpose |
|--------------|-------|---------|
| `VITE_OPENAI_API_KEY` | `your-openai-key` | DALL-E integration |
| `VITE_ANTHROPIC_API_KEY` | `your-anthropic-key` | Claude integration |
| `VITE_APP_ENV` | `production` | Environment identifier |

**Important:** 
- All variables MUST start with `VITE_` to be exposed to the client
- Click **"Add"** after each variable
- Select **"Production", "Preview", and "Development"** for each variable

### Step 5: Redeploy

After adding environment variables:

1. Go to the **"Deployments"** tab
2. Click the **three dots (...)** on the latest deployment
3. Click **"Redeploy"**
4. Check **"Use existing Build Cache"**
5. Click **"Redeploy"**

---

## ✅ Verify Deployment

Once deployment completes:

1. Click **"Visit"** button to open your deployed app
2. Your app will be live at: `https://brand-os-xyz.vercel.app`
3. Test the following:
   - ✅ Sign in with Google works
   - ✅ Dashboard loads
   - ✅ Can create a brand
   - ✅ AI generation works

---

## 🔧 Post-Deployment Configuration

### Custom Domain (Optional)

1. Go to **"Settings" → "Domains"**
2. Enter your custom domain
3. Follow DNS configuration instructions
4. Vercel provides free SSL for custom domains

### Automatic Deployments

Vercel automatically deploys when you push to GitHub:

- **Push to `main`** → Deploys to production
- **Push to other branches** → Creates preview deployments

### Update Supabase Redirect URLs

Add your Vercel domain to Supabase allowed redirect URLs:

1. Go to Supabase Dashboard → **Authentication → URL Configuration**
2. Add to **"Redirect URLs"**:
   ```
   https://your-app.vercel.app/**
https://your-app.vercel.app/auth/callback
   ```

---

## 📊 Vercel Free Tier Limits

| Resource | Free Tier Limit |
|----------|-----------------|
| **Bandwidth** | 100 GB/month |
| **Build Execution** | 100 hours/month |
| **Serverless Function Execution** | 100 GB-hours/month |
| **Deployments** | Unlimited |
| **Team Members** | 1 (hobby projects) |
| **Custom Domains** | Unlimited |

**More than enough for most projects!**

---

## 🐛 Troubleshooting

### Build Fails

**Issue**: Build fails with "Module not found"  
**Solution**: Ensure all dependencies are in `package.json`
```bash
cd web
npm install
git add package-lock.json
git commit -m "fix: update dependencies"
git push
```

### Environment Variables Not Working

**Issue**: App shows errors about missing API keys  
**Solution**: 
1. Verify variables start with `VITE_`
2. Check they're added to all environments
3. Redeploy after adding variables

### Blank Page After Deployment

**Issue**: App shows blank page  
**Solution**: Check browser console for errors. Usually missing environment variables.

### OAuth Redirect Error

**Issue**: "Redirect URL mismatch" error  
**Solution**: Add Vercel domain to Supabase redirect URLs (see above)

---

## 🔄 Making Updates

To update your deployed app:

1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "feat: your changes"
   git push origin main
   ```
3. Vercel automatically builds and deploys!

---

## 📈 Monitoring

View your deployment metrics:

1. Go to **"Analytics"** tab
2. View:
   - Page views
   - Unique visitors
   - Top pages
   - Performance metrics

---

## 💡 Pro Tips

1. **Use Preview Deployments**: Test changes on preview URLs before merging to main
2. **Environment-Specific Variables**: Set different API keys for production vs preview
3. **Enable Analytics**: Track usage and performance
4. **Set up Alerts**: Get notified when deployments fail

---

## 🎉 Success!

Your Brand OS app is now live and accessible worldwide! 

**Your deployment URL**: `https://your-app.vercel.app`

Share it with your team and start creating amazing brand-aligned content! 🚀

---

## 📞 Need Help?

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Deployment Guide**: [docs/DEPLOYMENT.md](../docs/DEPLOYMENT.md)
- **GitHub Issues**: [Report a problem](https://github.com/iDorgham/BrandOS/issues)
