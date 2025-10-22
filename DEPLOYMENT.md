# Deployment Guide

## 🚀 Deploy to Vercel (Recommended)

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `skygoal-ecommerce`
3. Description: "E-commerce application with Next.js, Firebase, and TypeScript"
4. Choose "Public" or "Private"
5. **Don't** initialize with README
6. Click "Create repository"

### Step 2: Push Code to GitHub

Open terminal in your project directory and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - SkyGoal E-commerce App"

# Rename branch to main
git branch -M main

# Add remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/skygoal-ecommerce.git

# Push to GitHub
git push -u origin main
```

### Step 3: Deploy to Vercel

1. **Go to Vercel**: https://vercel.com/
2. **Sign in** with your GitHub account
3. **Click "New Project"**
4. **Import your repository**: Select `skygoal-ecommerce`
5. **Configure Project**:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `.next` (auto-filled)

6. **Add Environment Variables**:
   Click "Environment Variables" and add:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

7. **Click "Deploy"**

### Step 4: Get Your Deployment URL

After deployment completes (2-3 minutes):
- Your app will be live at: `https://your-project-name.vercel.app`
- Vercel will also provide a production URL

---

## 🌐 Alternative: Deploy to Netlify

### Step 1: Push to GitHub (same as above)

### Step 2: Deploy to Netlify

1. Go to https://netlify.com/
2. Sign in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose "GitHub" and authorize Netlify
5. Select your `skygoal-ecommerce` repository
6. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
7. Click "Show advanced" → "New variable" and add environment variables
8. Click "Deploy site"

Your site will be live at: `https://random-name.netlify.app`

You can customize the domain in Site settings.

---

## 📋 Pre-Deployment Checklist

Before deploying, make sure:

- [x] All dependencies are in `package.json`
- [x] Firebase credentials are ready
- [x] `.env.local` is in `.gitignore` (already done)
- [x] Application runs locally without errors
- [x] All routes are working
- [x] Authentication is configured

---

## 🔧 Post-Deployment Steps

### 1. Update Firebase Authorized Domains

1. Go to Firebase Console
2. Navigate to Authentication → Settings → Authorized domains
3. Add your deployment URL:
   - `your-project-name.vercel.app`
   - Or your custom domain

### 2. Test Your Deployed App

1. Visit your deployment URL
2. Test signup/login
3. Test product listing
4. Test add product
5. Test filters and search

### 3. Set Up Custom Domain (Optional)

**On Vercel:**
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

**On Netlify:**
1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS

---

## 🐛 Common Deployment Issues

### Issue: "Module not found" errors
**Solution:** Make sure all imports use correct paths and all dependencies are in `package.json`

### Issue: Environment variables not working
**Solution:** 
- Ensure all env vars start with `NEXT_PUBLIC_`
- Redeploy after adding environment variables
- Check for typos in variable names

### Issue: Firebase authentication errors
**Solution:**
- Add deployment URL to Firebase authorized domains
- Verify all Firebase env variables are set correctly

### Issue: Build fails
**Solution:**
- Check build logs in Vercel/Netlify dashboard
- Test build locally: `npm run build`
- Fix any TypeScript or linting errors

---

## 📊 Monitoring Your Deployment

### Vercel Dashboard
- View deployment logs
- Monitor performance
- Check analytics
- View error logs

### Netlify Dashboard
- View build logs
- Monitor bandwidth
- Check form submissions
- View function logs

---

## 🔄 Continuous Deployment

Both Vercel and Netlify support automatic deployments:

- **Push to main branch** → Automatic production deployment
- **Push to other branches** → Preview deployments
- **Pull requests** → Preview deployments with unique URLs

---

## 📱 Share Your App

Once deployed, share your app:

- **GitHub Repository**: `https://github.com/YOUR_USERNAME/skygoal-ecommerce`
- **Live Demo**: `https://your-project-name.vercel.app`
- **Documentation**: Link to your README.md

---

## 🎉 Your App is Live!

Congratulations! Your e-commerce application is now deployed and accessible worldwide.

**Next Steps:**
- Share the URL with users
- Monitor usage and performance
- Collect feedback
- Plan new features
- Keep dependencies updated

---

## 📞 Need Help?

- **Vercel Documentation**: https://vercel.com/docs
- **Netlify Documentation**: https://docs.netlify.com/
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Firebase Hosting**: https://firebase.google.com/docs/hosting
