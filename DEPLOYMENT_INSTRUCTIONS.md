# 🚀 Deployment Instructions

## Step 1: Create GitHub Repository

### Option A: Using GitHub Website
1. Go to [GitHub](https://github.com)
2. Click the **"+"** icon → **"New repository"**
3. Repository name: `skygoal-ecommerce`
4. Description: `E-Commerce application with Firebase Auth and Product Management`
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README (we already have one)
7. Click **"Create repository"**

### Option B: Using GitHub CLI (if installed)
```bash
gh repo create skygoal-ecommerce --public --source=. --remote=origin
```

---

## Step 2: Connect Local Repository to GitHub

After creating the repository on GitHub, you'll see commands. Use these:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/skygoal-ecommerce.git

# Push your code
git branch -M main
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/umaboyina/skygoal-ecommerce.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy to Vercel (Recommended)

### Why Vercel?
- ✅ Free hosting for Next.js apps
- ✅ Automatic deployments on push
- ✅ Built-in CI/CD
- ✅ Custom domains
- ✅ Optimized for Next.js

### Deployment Steps:

1. **Go to [Vercel](https://vercel.com)**
2. Click **"Sign up"** or **"Login"** (use GitHub account)
3. Click **"Add New Project"**
4. **Import** your `skygoal-ecommerce` repository
5. Configure project:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./`
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `.next` (auto-filled)

6. **Add Environment Variables:**
   Click "Environment Variables" and add:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

7. Click **"Deploy"**

8. Wait 2-3 minutes for deployment

9. **Your app is live!** 🎉
   - You'll get a URL like: `https://skygoal-ecommerce.vercel.app`

---

## Step 4: Update Firebase Authorized Domains

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Authentication** → **Settings** → **Authorized domains**
4. Click **"Add domain"**
5. Add your Vercel domain: `skygoal-ecommerce.vercel.app`
6. Click **"Add"**

---

## Alternative: Deploy to Netlify

1. Go to [Netlify](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to GitHub and select `skygoal-ecommerce`
4. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
5. Add environment variables (same as Vercel)
6. Click **"Deploy site"**

---

## Your Links After Deployment

After completing the steps above, you'll have:

### GitHub Repository
```
https://github.com/YOUR_USERNAME/skygoal-ecommerce
```

### Live Deployment (Vercel)
```
https://skygoal-ecommerce.vercel.app
```
or
```
https://your-custom-name.vercel.app
```

### Live Deployment (Netlify - Alternative)
```
https://skygoal-ecommerce.netlify.app
```

---

## Quick Commands Reference

```bash
# Check git status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Update features"

# Push to GitHub
git push origin main

# View remote URL
git remote -v
```

---

## Automatic Deployments

Once connected to Vercel/Netlify:
- Every push to `main` branch automatically deploys
- Pull requests get preview deployments
- No manual deployment needed!

---

## Troubleshooting

### Issue: Firebase Auth not working on deployed site
**Solution:** Add your deployment domain to Firebase Authorized Domains

### Issue: Environment variables not working
**Solution:** 
1. Check they're added in Vercel/Netlify dashboard
2. Redeploy the site
3. Make sure they start with `NEXT_PUBLIC_`

### Issue: Build fails
**Solution:**
1. Check build logs in Vercel/Netlify
2. Ensure all dependencies are in `package.json`
3. Test build locally: `npm run build`

---

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Deploy to Vercel
3. ✅ Add Firebase authorized domain
4. ✅ Test the live site
5. ✅ Share your links!

---

**Need help?** Check the deployment platform's documentation:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
