# Installation Guide - Step by Step

## 📋 Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 16.x or higher installed
- ✅ npm or yarn package manager
- ✅ A web browser (Chrome, Firefox, Safari, or Edge)
- ✅ A text editor (VS Code recommended)
- ✅ Internet connection for Firebase

---

## 🔧 Installation Steps

### Step 1: Install Node.js Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

**Expected output:**
```
added 300+ packages in 30s
```

**Troubleshooting:**
- If you get permission errors on Windows, run terminal as Administrator
- If you get network errors, try: `npm install --legacy-peer-deps`
- If installation fails, delete `node_modules` and try again

---

### Step 2: Create Firebase Project

#### 2.1 Go to Firebase Console
Visit: https://console.firebase.google.com/

#### 2.2 Create New Project
1. Click "Add project" or "Create a project"
2. Enter project name (e.g., "skygoal-ecommerce")
3. Click "Continue"
4. Disable Google Analytics (optional)
5. Click "Create project"
6. Wait for project creation (30 seconds)
7. Click "Continue"

#### 2.3 Enable Authentication
1. In the left sidebar, click "Authentication"
2. Click "Get started" button
3. Click on "Email/Password" in the Sign-in method tab
4. Toggle "Email/Password" to **Enabled**
5. Click "Save"

#### 2.4 Get Firebase Configuration
1. Click the gear icon (⚙️) next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon `</>`
5. Enter app nickname (e.g., "skygoal-web")
6. **Don't** check "Also set up Firebase Hosting"
7. Click "Register app"
8. Copy the `firebaseConfig` object values

**You'll see something like:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAzUwJS7uQt9qQ4qi79lDQigzKw3NigBpQ",
  authDomain: "skygoal-d1445.firebaseapp.com",
  projectId: "skygoal-d1445",
  storageBucket: "skygoal-d1445.firebasestorage.app",
  messagingSenderId: "843956212241",
  appId: "1:843956212241:web:99f6794102d03d1d7597b0",
  measurementId: "G-B68S51KW6R"
};
```

---

### Step 3: Configure Environment Variables

#### 3.1 Create `.env.local` file
In the project root directory, create a new file named `.env.local`

**On Windows:**
```bash
type nul > .env.local
```

**On Mac/Linux:**
```bash
touch .env.local
```

#### 3.2 Add Firebase Configuration
Open `.env.local` in your text editor and paste:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```

#### 3.3 Replace with Your Values
Replace each placeholder with the actual values from Firebase:

**Example:**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=skygoal-ecommerce.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=skygoal-ecommerce
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=skygoal-ecommerce.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

**Important:**
- ⚠️ Don't add quotes around values
- ⚠️ Don't add spaces around the `=` sign
- ⚠️ Make sure there are no trailing spaces
- ⚠️ Save the file after editing

---

### Step 4: Start Development Server

Run the development server:

```bash
npm run dev
```

**Expected output:**
```
> skygoal-ecommerce@0.1.0 dev
> next dev

- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- event compiled client and server successfully in 2.5s
```

**Troubleshooting:**
- If port 3000 is busy, the app will use 3001, 3002, etc.
- If you see errors, check your `.env.local` file
- If Firebase errors appear, verify your configuration

---

### Step 5: Open in Browser

1. Open your web browser
2. Navigate to: **http://localhost:3000**
3. You should see the login page

**What you should see:**
- A clean login page with purple branding
- Email and password input fields
- "Login" and "Sign up" links

---

### Step 6: Create Your First Account

#### 6.1 Go to Signup Page
1. Click "Sign up" link on the login page
2. Or navigate to: http://localhost:3000/signup

#### 6.2 Fill Registration Form
1. **Email**: Enter your email (e.g., `test@example.com`)
2. **Password**: Enter a password (minimum 6 characters)
3. **Confirm Password**: Re-enter the same password
4. **Checkbox**: Check "I agree to all the Terms and Privacy policy"
5. Click "Register" button

#### 6.3 Verify Success
- You should see "Creating account..." briefly
- Then automatically redirect to `/products` page
- You should see the products listing with 45 products

---

### Step 7: Test the Application

#### 7.1 Test Product Listing
- ✅ See 20 products on the first page
- ✅ Use search bar to search for products
- ✅ Click "Show Filters" to see filter options
- ✅ Try different filters (Status, Category, Brand, Price)
- ✅ Sort by rating (High to Low / Low to High)
- ✅ Click on a product card to see details modal
- ✅ Navigate through pages using pagination

#### 7.2 Test Add Product
1. Click "Add Product" in the navigation
2. Fill in the form:
   - **Name**: Test Product 123
   - **Price**: 99.99
   - **Quantity**: 10
   - **Category**: Electronics
   - **Brand**: Apple
   - **Status**: Available
   - **Color**: Black
   - **SKU**: TEST-001
   - **In Stock**: ✓ (checked)
3. Click "Add Product"
4. Verify success message appears
5. Wait for automatic redirect to products page
6. Search for "Test Product 123" to see your new product

#### 7.3 Test Logout
1. Click "Logout" button in the header
2. Verify redirect to login page
3. Try accessing `/products` directly
4. Verify redirect back to login (protected route working)

---

## ✅ Installation Complete!

Congratulations! Your application is now fully set up and running.

### What's Next?

1. **Explore Features**: Try all the filters, search, and sorting options
2. **Add More Products**: Test the add product form with different data
3. **Test Validation**: Try submitting invalid data to see validation
4. **Test Persistence**: Refresh the page and see products persist
5. **Test Responsive**: Resize browser window to see responsive design

---

## 🎯 Quick Reference

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Access Application
- **Local**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Signup**: http://localhost:3000/signup
- **Products**: http://localhost:3000/products
- **Add Product**: http://localhost:3000/add-product

---

## 🐛 Common Issues & Solutions

### Issue: "Firebase not configured"
**Solution:**
1. Check `.env.local` file exists
2. Verify all variables are set correctly
3. Restart development server
4. Clear browser cache

### Issue: "Authentication failed"
**Solution:**
1. Verify Email/Password is enabled in Firebase Console
2. Check Firebase configuration is correct
3. Try creating a new user
4. Check browser console for specific errors

### Issue: Products not showing
**Solution:**
1. Open browser console (F12)
2. Check for JavaScript errors
3. Clear localStorage: `localStorage.clear()`
4. Refresh the page

### Issue: Port already in use
**Solution:**
1. Stop other development servers
2. Or use different port: `npm run dev -- -p 3001`
3. Or kill the process using port 3000

### Issue: Module not found
**Solution:**
1. Delete `node_modules` folder
2. Delete `.next` folder
3. Run `npm install` again
4. Run `npm run dev`

---

## 📞 Need Help?

### Documentation
- `README.md` - Project overview
- `SETUP.md` - Detailed setup guide
- `FEATURES.md` - Feature documentation
- `QUICK_START.md` - Quick reference
- `PROJECT_SUMMARY.md` - Complete summary

### Check These First
1. Browser console (F12) for errors
2. Terminal output for server errors
3. Firebase Console for authentication issues
4. Network tab for API call failures

### Debug Commands
```bash
# Check Node version
node --version

# Check npm version
npm --version

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
```

---

## 🎉 Success Checklist

- [x] Node.js installed
- [x] Dependencies installed (`npm install`)
- [x] Firebase project created
- [x] Email/Password authentication enabled
- [x] `.env.local` file created and configured
- [x] Development server running
- [x] Application accessible at localhost:3000
- [x] Test account created
- [x] Products page accessible
- [x] Filters and search working
- [x] Add product form working
- [x] Products persisting in localStorage
- [x] Logout working
- [x] Protected routes working

---

**🚀 You're all set! Happy coding!**
