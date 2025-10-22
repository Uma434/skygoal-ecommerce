import { useState, useEffect, useMemo } from 'react';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { Product, FilterState } from '@/lib/types';
import { initialProducts } from '@/data/products';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 20;

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(true);
  
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: [],
    category: [],
    brand: [],
    minPrice: 0,
    maxPrice: 10000,
  });
  
  const [sortBy, setSortBy] = useState<'rating-high' | 'rating-low'>('rating-high');

  // Load products from localStorage or use initial products
  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      const parsed = JSON.parse(storedProducts);
      // Check if products have images, if not, reload with new data
      if (parsed.length > 0 && !parsed[0].image) {
        // Old data without images, replace with new data
        setProducts(initialProducts);
        localStorage.setItem('products', JSON.stringify(initialProducts));
      } else {
        setProducts(parsed);
      }
    } else {
      setProducts(initialProducts);
      localStorage.setItem('products', JSON.stringify(initialProducts));
    }
  }, []);

  // Get unique values for filters
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  const brands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand)));
  }, [products]);

  const statuses = ['Available', 'Out of Stock', 'Coming Soon'];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      // Search filter
      if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(product.status)) {
        return false;
      }

      // Category filter
      if (filters.category.length > 0 && !filters.category.includes(product.category)) {
        return false;
      }

      // Brand filter
      if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) {
        return false;
      }

      // Price range filter
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      return true;
    });

    // Sort by rating
    filtered.sort((a, b) => {
      if (sortBy === 'rating-high') {
        return b.rating - a.rating;
      } else {
        return a.rating - b.rating;
      }
    });

    return filtered;
  }, [products, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  const handleFilterChange = (filterType: keyof FilterState, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleCheckboxFilter = (filterType: 'status' | 'category' | 'brand', value: string) => {
    setFilters((prev) => {
      const currentValues = prev[filterType] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [filterType]: newValues };
    });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: [],
      category: [],
      brand: [],
      minPrice: 0,
      maxPrice: 10000,
    });
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
            <p className="text-gray-600">Browse our collection of {filteredProducts.length} products</p>
          </div>

          {/* Search and Sort Bar */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              >
                <option value="rating-high">Rating: High to Low</option>
                <option value="rating-low">Rating: Low to High</option>
              </select>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Filters Sidebar */}
            {showFilters && (
              <div className="w-64 flex-shrink-0">
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-primary hover:underline"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Status Filter */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Status</h3>
                      <div className="space-y-2">
                        {statuses.map((status) => (
                          <label key={status} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={filters.status.includes(status)}
                              onChange={() => handleCheckboxFilter('status', status)}
                              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                            <span className="ml-2 text-sm text-gray-700">{status}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Category Filter */}
                    <div className="pt-4 border-t">
                      <h3 className="font-medium text-gray-900 mb-3">Category</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <label key={category} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={filters.category.includes(category)}
                              onChange={() => handleCheckboxFilter('category', category)}
                              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                            <span className="ml-2 text-sm text-gray-700">{category}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Brand Filter */}
                    <div className="pt-4 border-t">
                      <h3 className="font-medium text-gray-900 mb-3">Brand</h3>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {brands.map((brand) => (
                          <label key={brand} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={filters.brand.includes(brand)}
                              onChange={() => handleCheckboxFilter('brand', brand)}
                              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                            <span className="ml-2 text-sm text-gray-700">{brand}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Price Range Filter */}
                    <div className="pt-4 border-t">
                      <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm text-gray-600">Min Price: ${filters.minPrice}</label>
                          <input
                            type="range"
                            min="0"
                            max="10000"
                            step="50"
                            value={filters.minPrice}
                            onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Max Price: ${filters.maxPrice}</label>
                          <input
                            type="range"
                            min="0"
                            max="10000"
                            step="50"
                            value={filters.maxPrice}
                            onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              {paginatedProducts.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {paginatedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => setSelectedProduct(product)}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-center space-x-2">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded-lg font-medium transition ${
                              currentPage === page
                                ? 'bg-primary text-white'
                                : 'border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Product Modal */}
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </Layout>
    </ProtectedRoute>
  );
}
