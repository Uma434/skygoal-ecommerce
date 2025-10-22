# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies (1 minute)
```bash
npm install
```

### Step 2: Set Up Firebase (2 minutes)

1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Email/Password authentication
4. Copy your config from Project Settings

### Step 3: Configure Environment (1 minute)

Create `.env.local` file:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Step 4: Run the App (1 minute)
```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📱 Using the Application

### First Time Setup
1. Open [http://localhost:3000](http://localhost:3000)
2. Click "Sign up"
3. Enter email and password
4. Check "I agree to terms"
5. Click "Register"

### Browsing Products
- **Search**: Type in the search bar
- **Filter**: Use the sidebar filters
- **Sort**: Select rating order from dropdown
- **View Details**: Click any product card
- **Navigate**: Use pagination at the bottom

### Adding a Product
1. Click "Add Product" in navigation
2. Fill in all required fields:
   - Name (letters/numbers only)
   - Price (positive number)
   - Quantity (positive integer)
   - Category (dropdown)
   - Brand (dropdown or custom)
   - Status (dropdown)
   - Color (text)
   - SKU (unique identifier)
3. Toggle "In stock" if needed
4. Click "Add Product"

---

## 🎯 Key Features at a Glance

| Feature | Location | Description |
|---------|----------|-------------|
| Login | `/login` | Email/password authentication |
| Signup | `/signup` | Create new account |
| Products | `/products` | Browse, search, filter products |
| Add Product | `/add-product` | Add new products |
| Logout | Header | Sign out button |

---

## 🔧 Common Tasks

### Clear All Products
```javascript
// In browser console
localStorage.removeItem('products');
location.reload();
```

### Reset to Initial Products
```javascript
// In browser console
localStorage.clear();
location.reload();
```

### View Current Products
```javascript
// In browser console
JSON.parse(localStorage.getItem('products'));
```

---

## 📊 Sample Test Data

### Test User Credentials (Create via Signup)
- Email: `test@example.com`
- Password: `test123`

### Sample Product Entry
- **Name**: Test Product 123
- **Price**: 99.99
- **Quantity**: 10
- **Category**: Electronics
- **Brand**: Apple
- **Status**: Available
- **Color**: Black
- **SKU**: TEST-001
- **In Stock**: ✓

---

## 🐛 Troubleshooting

### "Firebase not configured"
- Check `.env.local` exists
- Verify all Firebase variables are set
- Restart dev server: `npm run dev`

### "Cannot find module"
- Delete `node_modules` and `.next`
- Run `npm install`
- Run `npm run dev`

### Products not saving
- Check browser console for errors
- Verify localStorage is enabled
- Try different browser

### Authentication errors
- Verify Firebase Email/Password is enabled
- Check Firebase Console for user creation
- Clear browser cache and cookies

---

## 📁 Project Structure Overview

```
skygoal/
├── pages/              # Routes
│   ├── login.tsx       # Login page
│   ├── signup.tsx      # Signup page
│   ├── products.tsx    # Products listing
│   └── add-product.tsx # Add product form
├── components/         # Reusable UI
│   ├── Layout.tsx      # Main layout
│   ├── ProductCard.tsx # Product display
│   └── ProductModal.tsx# Product details
├── lib/               # Logic & config
│   ├── firebase.ts    # Firebase setup
│   ├── AuthContext.tsx# Auth state
│   └── utils.ts       # Helper functions
└── data/              # Static data
    └── products.ts    # Initial products
```

---

## 🎨 Customization

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#6C5DD3', // Change this
}
```

### Add More Categories
Edit `pages/add-product.tsx`:
```javascript
const categories = ['Electronics', 'Clothing', 'Furniture', 'Your Category'];
```

### Modify Items Per Page
Edit `pages/products.tsx`:
```javascript
const ITEMS_PER_PAGE = 20; // Change this
```

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Auth Guide](https://firebase.google.com/docs/auth)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)

---

## ✅ Checklist

- [ ] Dependencies installed
- [ ] Firebase project created
- [ ] Email/Password auth enabled
- [ ] `.env.local` configured
- [ ] Dev server running
- [ ] Test account created
- [ ] Products page accessible
- [ ] Product added successfully

---

## 🎉 You're All Set!

Your e-commerce application is ready to use. Start by creating an account and exploring the features!

**Need help?** Check `SETUP.md` for detailed instructions or `FEATURES.md` for feature documentation.
