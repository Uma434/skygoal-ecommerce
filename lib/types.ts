export interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  category: string;
  brand: string;
  status: 'Available' | 'Out of Stock' | 'Coming Soon';
  quantity: number;
  color: string;
  sku: string;
  rating: number;
  image?: string;
}

export interface FilterState {
  search: string;
  status: string[];
  category: string[];
  brand: string[];
  minPrice: number;
  maxPrice: number;
}

export interface SortOption {
  value: string;
  label: string;
}
