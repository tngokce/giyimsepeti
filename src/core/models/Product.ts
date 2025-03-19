/**
 * Kategori model interface'i
 */
export interface Category {
  id: number;
  name: string;
  gender?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Ürün model interface'i
 */
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  stock: number;
  category_id: number;
  category?: Category;
  images?: string[];
  rating?: number;
  seller_id?: number;
  created_at?: string;
  updated_at?: string;
}

/**
 * Ürün filtreleme seçenekleri
 */
export interface ProductFilterOptions {
  category_id?: number;
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'rating';
  page?: number;
  limit?: number;
}

/**
 * Ürün listesi yanıtı
 */
export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 