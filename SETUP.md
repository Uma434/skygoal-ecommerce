# Setup Instructions

## Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager
- A Firebase account (free tier is sufficient)

## Step 1: Install Dependencies

Open a terminal in the project directory and run:

```bash
npm install
```

## Step 2: Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication:
   - Click on "Authentication" in the left sidebar
   - Click "Get Started"
   - Enable "Email/Password" sign-in method
4. Get your Firebase configuration:
   - Click on the gear icon (Project Settings)
   - Scroll down to "Your apps"
   - Click on the web icon (</>)
   - Register your app
   - Copy the configuration values

## Step 3: Configure Environment Variables

1. Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```

2. Replace the placeholder values with your actual Firebase configuration

## Step 4: Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Step 5: Create Your First Account

1. Navigate to [http://localhost:3000](http://localhost:3000)
2. You'll be redirected to the login page
3. Click "Sign up" to create a new account
4. Enter your email and password
5. After successful registration, you'll be redirected to the products page

## Features Overview

### Authentication
- **Login**: `/login` - Email and password authentication
- **Signup**: `/signup` - Create a new account
- **Protected Routes**: Unauthenticated users are redirected to login

### Products Page (`/products`)
- View all products with pagination (20 items per page)
- **Search**: Search products by name
- **Filters**:
  - Status (Available, Out of Stock, Coming Soon)
  - Category (Electronics, Clothing, Furniture)
  - Brand (Multiple brands available)
  - Price Range (Min-Max slider)
- **Sort**: By rating (High to Low, Low to High)
- **Product Details**: Click on any product card to view details in a modal

### Add Product Page (`/add-product`)
- Add new products with the following fields:
  - Name (alphabets/numbers only)
  - Price (positive number)
  - Quantity (positive integer)
  - Category (dropdown)
  - Brand (dropdown with custom option)
  - Status (Available, Out of Stock, Coming Soon)
  - Color
  - SKU (must be unique)
  - In-stock toggle
- **Validation**:
  - All inputs are sanitized to prevent XSS
  - SKU uniqueness check
  - Form validation with error messages
- **Persistence**: Products are saved to localStorage

## Data Persistence

- Products are stored in localStorage
- Initial dataset includes 45 products
- New products are immediately visible after adding
- Data persists across page reloads

## Troubleshooting

### Firebase Authentication Error
- Make sure you've enabled Email/Password authentication in Firebase Console
- Verify your `.env.local` file has correct Firebase credentials
- Restart the development server after changing environment variables

### Products Not Showing
- Check browser console for errors
- Clear localStorage and reload the page
- Verify the initial products data is loading correctly

### Build Errors
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

## Production Build

To create a production build:

```bash
npm run build
npm start
```

## Technologies Used

- **Next.js 14**: React framework with server-side rendering
- **TypeScript**: Type-safe development
- **Firebase Authentication**: User authentication
- **Tailwind CSS**: Utility-first CSS framework
- **React Hook Form**: Form validation
- **Lucide Icons**: Modern icon library
- **DOMPurify**: XSS protection

## Project Structure

```
skygoal/
├── components/          # Reusable React components
│   ├── Layout.tsx
│   ├── ProtectedRoute.tsx
│   ├── ProductCard.tsx
│   └── ProductModal.tsx
├── data/               # Static data
│   └── products.ts
├── lib/                # Utilities and configurations
│   ├── AuthContext.tsx
│   ├── firebase.ts
│   ├── types.ts
│   └── utils.ts
├── pages/              # Next.js pages
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx
│   ├── login.tsx
│   ├── signup.tsx
│   ├── products.tsx
│   └── add-product.tsx
├── styles/             # Global styles
│   └── globals.css
└── public/             # Static assets
```

## Support

For issues or questions, please check:
1. Firebase Console for authentication issues
2. Browser console for JavaScript errors
3. Network tab for API call failures
