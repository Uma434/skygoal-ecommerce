# 🛍️ SkyGoal E-Commerce Application

A full-featured, production-ready e-commerce web application built with **Next.js 14**, **TypeScript**, **Firebase Authentication**, and **Tailwind CSS**.

![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-10.7-orange?style=flat-square&logo=firebase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?style=flat-square&logo=tailwind-css)

---

## ✨ Features

### 🔐 Authentication
- Firebase email/password authentication
- Secure login and signup pages
- Protected routes with automatic redirects
- Session management

### 🛍️ Product Management
- **45 pre-loaded products** across multiple categories
- **Pagination** - 20 items per page
- **Real-time search** by product name
- **Advanced filtering**:
  - Status (Available, Out of Stock, Coming Soon)
  - Category (Electronics, Clothing, Furniture)
  - Brand (40+ brands)
  - Price range ($0 - $10,000)
- **Sorting** by rating (high to low, low to high)
- **Product details modal** with full information
- **Add new products** with comprehensive validation

### 🎨 User Interface
- Modern, clean design with purple theme
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Loading states and error handling
- Intuitive navigation

### 🔒 Security
- XSS protection with input sanitization
- Form validation (client-side)
- SKU uniqueness validation
- Protected routes

### 💾 Data Persistence
- LocalStorage integration
- Products persist across sessions
- Automatic synchronization

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Firebase
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Email/Password authentication
3. Copy your Firebase configuration

### 3. Configure Environment
Create `.env.local` file:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Open Browser
Visit [http://localhost:3000](http://localhost:3000)

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **[INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)** | Complete step-by-step installation instructions |
| **[QUICK_START.md](QUICK_START.md)** | Quick reference for common tasks |
| **[FEATURES.md](FEATURES.md)** | Detailed feature documentation |
| **[SETUP.md](SETUP.md)** | Detailed setup and configuration guide |
| **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** | Comprehensive project overview |

---

## 📁 Project Structure

```
skygoal/
├── pages/              # Next.js pages (routes)
│   ├── _app.tsx        # App wrapper with providers
│   ├── index.tsx       # Home page (redirects)
│   ├── login.tsx       # Login page
│   ├── signup.tsx      # Signup page
│   ├── products.tsx    # Products listing
│   └── add-product.tsx # Add product form
├── components/         # Reusable React components
│   ├── Layout.tsx      # Main layout with navigation
│   ├── ProtectedRoute.tsx
│   ├── ProductCard.tsx
│   └── ProductModal.tsx
├── lib/               # Utilities and configurations
│   ├── firebase.ts    # Firebase setup
│   ├── AuthContext.tsx # Auth state management
│   ├── types.ts       # TypeScript interfaces
│   └── utils.ts       # Helper functions
├── data/              # Static data
│   └── products.ts    # Initial 45 products
└── styles/            # Global styles
    └── globals.css    # Tailwind CSS
```

---

## 🛠️ Technologies

- **[Next.js 14](https://nextjs.org/)** - React framework
- **[React 18](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Firebase](https://firebase.google.com/)** - Authentication
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[React Hook Form](https://react-hook-form.com/)** - Form handling
- **[DOMPurify](https://github.com/cure53/DOMPurify)** - XSS protection
- **[Lucide React](https://lucide.dev/)** - Icons

---

## 📸 Screenshots

### Login Page
Clean authentication interface with email/password login

### Products Page
- Grid layout with product cards
- Advanced filters sidebar
- Search and sort functionality
- Pagination controls

### Add Product Page
Comprehensive form with validation and error handling

### Product Details Modal
Full product information in an elegant modal

---

## ✅ Requirements Fulfilled

All project requirements have been successfully implemented:

- ✅ Authentication (Login & Signup with Firebase)
- ✅ Protected routing with redirects
- ✅ Product listing with 40+ products
- ✅ Pagination (20 items per page)
- ✅ Search by product name
- ✅ Filter by status, category, brand, price range
- ✅ Sort by rating (high/low)
- ✅ Combined filters and search
- ✅ Add product form with all required fields
- ✅ Input validation (name, price, quantity, SKU)
- ✅ XSS prevention
- ✅ SKU uniqueness check
- ✅ Save to product list
- ✅ Redirect after submission
- ✅ Immediate product visibility
- ✅ LocalStorage persistence
- ✅ Responsive design
- ✅ Product details modal
- ✅ Loading spinners
- ✅ Clean, maintainable code
- ✅ Reusable components
- ✅ TypeScript implementation
- ✅ React Hook Form integration

---

## 🎯 Usage

### Creating an Account
1. Navigate to `/signup`
2. Enter email and password
3. Agree to terms
4. Click "Register"

### Browsing Products
1. Use search bar for quick filtering
2. Apply multiple filters simultaneously
3. Sort by rating
4. Click product cards for details
5. Navigate pages with pagination

### Adding Products
1. Go to `/add-product`
2. Fill all required fields
3. Submit form
4. Product appears immediately in listing

---

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

---

## 🐛 Troubleshooting

### Common Issues

**Firebase not configured:**
- Check `.env.local` file exists
- Verify all Firebase variables are set
- Restart development server

**Authentication errors:**
- Enable Email/Password in Firebase Console
- Check Firebase configuration
- Clear browser cache

**Products not showing:**
- Check browser console for errors
- Clear localStorage: `localStorage.clear()`
- Refresh the page

See [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md) for detailed troubleshooting.

---

## 📄 License

This project is created for educational purposes.

---

## 🙏 Acknowledgments

- Design inspired by modern e-commerce platforms
- Built following Next.js best practices
- Firebase for authentication services
- Tailwind CSS for styling system

---

## 📞 Support

For detailed instructions, see:
- [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md) - Step-by-step setup
- [QUICK_START.md](QUICK_START.md) - Quick reference
- [FEATURES.md](FEATURES.md) - Feature documentation

---

**Built with ❤️ using Next.js, TypeScript, and Firebase**

*Ready to run immediately after Firebase configuration!*
