import apiClient from '../api/apiClient';
import { Product, ProductFilterOptions, ProductListResponse, Category } from '../models/Product';

/**
 * Ürün ile ilgili servis işlemlerini yönetir
 */
class ProductService {
  private static instance: ProductService;

  private constructor() {}

  /**
   * Singleton pattern ile tek bir servis instance'ı döndürür
   */
  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  /**
   * Ürün listesini getirir
   * @param options Filtreleme seçenekleri
   */
  public async getProducts(options?: ProductFilterOptions): Promise<ProductListResponse> {
    const queryParams = new URLSearchParams();
    
    if (options) {
      Object.entries(options).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = queryParams.toString();
    const url = `/products${queryString ? `?${queryString}` : ''}`;
    
    return await apiClient.get<ProductListResponse>(url);
  }

  /**
   * Belirli bir ürünü ID'ye göre getirir
   * @param id Ürün ID'si
   */
  public async getProductById(id: number): Promise<Product> {
    return await apiClient.get<Product>(`/products/${id}`);
  }

  /**
   * Kategori listesini getirir
   */
  public async getCategories(): Promise<Category[]> {
    return await apiClient.get<Category[]>('/categories');
  }

  /**
   * Belirli bir kategoriyi ID'ye göre getirir
   * @param id Kategori ID'si
   */
  public async getCategoryById(id: number): Promise<Category> {
    return await apiClient.get<Category>(`/categories/${id}`);
  }

  /**
   * En çok satan ürünleri getirir
   * @param limit Ürün sayısı sınırı
   */
  public async getBestSellingProducts(limit: number = 10): Promise<Product[]> {
    return await apiClient.get<Product[]>(`/products/best-selling?limit=${limit}`);
  }

  /**
   * Yeni gelen ürünleri getirir
   * @param limit Ürün sayısı sınırı
   */
  public async getNewProducts(limit: number = 10): Promise<Product[]> {
    return await apiClient.get<Product[]>(`/products/new?limit=${limit}`);
  }
}

const productService = ProductService.getInstance();

export default productService; 