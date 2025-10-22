import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/AuthContext';
import { ShoppingBag, LogOut, Plus, User } from 'lucide-react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/products" className="flex items-center space-x-2">
              <ShoppingBag className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-gray-900">ShopStore</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link
                href="/products"
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  router.pathname === '/products'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Products
              </Link>
              <Link
                href="/add-product"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition ${
                  router.pathname === '/add-product'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </Link>
              {user && (
                <div className="flex items-center space-x-3 pl-4 border-l">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-700">{user.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
}
