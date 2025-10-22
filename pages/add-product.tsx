import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Product } from '@/lib/types';
import { sanitizeInput, validateName, validatePrice, validateQuantity, validateSKU } from '@/lib/utils';
import { Package, AlertCircle, CheckCircle, Image as ImageIcon } from 'lucide-react';

interface ProductFormData {
  name: string;
  price: number;
  inStock: boolean;
  category: string;
  brand: string;
  status: 'Available' | 'Out of Stock' | 'Coming Soon';
  quantity: number;
  color: string;
  sku: string;
  image: string;
}

const categories = ['Electronics', 'Clothing', 'Furniture'];
const brands = [
  'Apple',
  'Samsung',
  'Sony',
  'Nike',
  'Adidas',
  'Levi\'s',
  'IKEA',
  'Herman Miller',
  'West Elm',
  'Dell',
  'Bose',
  'Canon',
  'Microsoft',
  'Nintendo',
  'LG',
  'Dyson',
  'Patagonia',
  'The North Face',
  'Ray-Ban',
  'Zara',
  'H&M',
  'Uniqlo',
  'Converse',
  'Vans',
  'Puma',
  'Wayfair',
  'CB2',
  'Crate & Barrel',
  'Article',
  'Floyd',
  'Burrow',
  'Muji',
  'Pottery Barn',
  'Room & Board',
  'Logitech',
  'Keychron',
  'Blue',
  'Elgato',
  'Anker',
  'Other',
];

export default function AddProduct() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [customBrand, setCustomBrand] = useState('');
  const [showCustomBrand, setShowCustomBrand] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ProductFormData>({
    defaultValues: {
      inStock: true,
      status: 'Available',
      quantity: 1,
      price: 0,
      image: '',
    },
  });

  const selectedBrand = watch('brand');

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    if (selectedBrand === 'Other') {
      setShowCustomBrand(true);
    } else {
      setShowCustomBrand(false);
      setCustomBrand('');
    }
  }, [selectedBrand]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setSubmitError('Image size must be less than 2MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        setSubmitError('Please select a valid image file');
        return;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
      setSubmitError('');
    }
  };

  const onSubmit = (data: ProductFormData) => {
    setSubmitError('');
    setSubmitSuccess(false);

    // Sanitize inputs
    const sanitizedName = sanitizeInput(data.name);
    const sanitizedSKU = sanitizeInput(data.sku);
    const sanitizedColor = sanitizeInput(data.color);
    const finalBrand = showCustomBrand ? sanitizeInput(customBrand) : data.brand;

    // Validate name (alphabets and numbers only)
    if (!validateName(sanitizedName)) {
      setSubmitError('Product name can only contain letters and numbers');
      return;
    }

    // Validate price (positive number)
    if (!validatePrice(data.price)) {
      setSubmitError('Price must be a positive number');
      return;
    }

    // Validate quantity (positive integer)
    if (!validateQuantity(data.quantity)) {
      setSubmitError('Quantity must be a positive integer');
      return;
    }

    // Validate SKU uniqueness
    if (!validateSKU(sanitizedSKU, products)) {
      setSubmitError('SKU must be unique. This SKU already exists.');
      return;
    }

    // Validate custom brand if selected
    if (showCustomBrand && !customBrand.trim()) {
      setSubmitError('Please enter a brand name');
      return;
    }

    // Create new product
    const newProduct: Product = {
      id: Date.now().toString(),
      name: sanitizedName,
      price: data.price,
      inStock: data.inStock,
      category: data.category,
      brand: finalBrand,
      status: data.status,
      quantity: data.quantity,
      color: sanitizedColor,
      sku: sanitizedSKU,
      rating: 4.0, // Default rating
      image: imagePreview || data.image || undefined,
    };

    // Save to localStorage
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Show success message
    setSubmitSuccess(true);

    // Reset form
    reset();
    setCustomBrand('');
    setImagePreview('');

    // Redirect after 2 seconds
    setTimeout(() => {
      router.push('/products');
    }, 2000);
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 bg-primary bg-opacity-10 rounded-lg">
                <Package className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
                <p className="text-gray-600">Fill in the details to add a new product</p>
              </div>
            </div>

            {submitError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700">{submitError}</p>
              </div>
            )}

            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-green-700">Product added successfully! Redirecting...</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div className="md:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name', { required: 'Product name is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Enter product name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($) *
                  </label>
                  <input
                    id="price"
                    type="number"
                    step="0.01"
                    {...register('price', {
                      required: 'Price is required',
                      min: { value: 0.01, message: 'Price must be greater than 0' },
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                  )}
                </div>

                {/* Quantity */}
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity *
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    {...register('quantity', {
                      required: 'Quantity is required',
                      min: { value: 1, message: 'Quantity must be at least 1' },
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="1"
                  />
                  {errors.quantity && (
                    <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    {...register('category', { required: 'Category is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                  )}
                </div>

                {/* Brand */}
                <div>
                  <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
                    Brand *
                  </label>
                  <select
                    id="brand"
                    {...register('brand', { required: 'Brand is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  >
                    <option value="">Select brand</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                  {errors.brand && (
                    <p className="mt-1 text-sm text-red-600">{errors.brand.message}</p>
                  )}
                </div>

                {/* Custom Brand Input */}
                {showCustomBrand && (
                  <div className="md:col-span-2">
                    <label htmlFor="customBrand" className="block text-sm font-medium text-gray-700 mb-2">
                      Custom Brand Name *
                    </label>
                    <input
                      id="customBrand"
                      type="text"
                      value={customBrand}
                      onChange={(e) => setCustomBrand(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      placeholder="Enter brand name"
                    />
                  </div>
                )}

                {/* Product Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Product Status *
                  </label>
                  <select
                    id="status"
                    {...register('status', { required: 'Status is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  >
                    <option value="Available">Available</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Coming Soon">Coming Soon</option>
                  </select>
                  {errors.status && (
                    <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
                  )}
                </div>

                {/* Color */}
                <div>
                  <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
                    Color *
                  </label>
                  <input
                    id="color"
                    type="text"
                    {...register('color', { required: 'Color is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="e.g., Black, White, Blue"
                  />
                  {errors.color && (
                    <p className="mt-1 text-sm text-red-600">{errors.color.message}</p>
                  )}
                </div>

                {/* SKU */}
                <div className="md:col-span-2">
                  <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-2">
                    SKU (Stock Keeping Unit) *
                  </label>
                  <input
                    id="sku"
                    type="text"
                    {...register('sku', { required: 'SKU is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="e.g., PROD-12345"
                  />
                  {errors.sku && (
                    <p className="mt-1 text-sm text-red-600">{errors.sku.message}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">Must be unique</p>
                </div>

                {/* Product Image */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image (Optional)
                  </label>
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <label 
                        htmlFor="image" 
                        className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary hover:bg-gray-50 transition"
                      >
                        <div className="text-center">
                          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-600">
                            <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 2MB</p>
                        </div>
                        <input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {imagePreview && (
                      <div className="relative w-32 h-32 border-2 border-primary rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setImagePreview('')}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition shadow-lg"
                          title="Remove image"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* In Stock Toggle */}
                <div className="md:col-span-2">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('inStock')}
                      className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-gray-700">Product is in stock</span>
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center space-x-4 pt-6 border-t">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
                >
                  Add Product
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/products')}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
