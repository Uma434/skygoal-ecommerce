import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Star, Package } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
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
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden border border-gray-100"
    >
      <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Package className="w-20 h-20 text-primary opacity-50" />
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">{product.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
            {product.status}
          </span>
        </div>

        <div className="space-y-2 mb-3">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Brand:</span> {product.brand}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Category:</span> {product.category}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Color:</span> {product.color}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">SKU:</span> {product.sku}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-900">{product.rating}</span>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">{formatPrice(product.price)}</p>
            <p className="text-xs text-gray-500">Qty: {product.quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
