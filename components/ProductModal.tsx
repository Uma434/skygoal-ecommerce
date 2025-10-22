import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { X, Star, Package } from 'lucide-react';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      case 'Coming Soon':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center mb-6 overflow-hidden">
            {product.image ? (
              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Package className="w-32 h-32 text-primary opacity-50" />
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-medium text-gray-900">{product.rating}</span>
                  <span className="text-gray-500">rating</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.status)}`}>
                {product.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm text-gray-500 mb-1">Price</p>
                <p className="text-3xl font-bold text-primary">{formatPrice(product.price)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Quantity Available</p>
                <p className="text-2xl font-bold text-gray-900">{product.quantity}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm text-gray-500 mb-1">Brand</p>
                <p className="text-lg font-medium text-gray-900">{product.brand}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Category</p>
                <p className="text-lg font-medium text-gray-900">{product.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Color</p>
                <p className="text-lg font-medium text-gray-900">{product.color}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">SKU</p>
                <p className="text-lg font-medium text-gray-900">{product.sku}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">In Stock</p>
                <p className="text-lg font-medium text-gray-900">{product.inStock ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
