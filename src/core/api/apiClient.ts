import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * API istemci sınıfı
 * Axios üzerinde konfigürasyon ve interceptor'ları yönetir
 */
class ApiClient {
  private client: AxiosInstance;
  private static instance: ApiClient;

  private constructor() {
    this.client = axios.create({
      baseURL: 'https://workintech-fe-ecommerce.onrender.com',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Singleton pattern ile tek bir API istemci instance'ı döndürür
   */
  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  /**
   * Axios interceptorlarını ayarlar
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Token varsa ekle
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('token');
          if (token && config.headers) {
            config.headers['Authorization'] = token;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        // 401 Unauthorized hatası varsa token'ı temizle
        if (error.response && error.response.status === 401) {
          this.clearToken();
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Token'ı ayarlar
   */
  public setToken(token: string): void {
    if (token) {
      localStorage.setItem('token', token);
      this.client.defaults.headers.common['Authorization'] = token;
    }
  }

  /**
   * Token'ı temizler
   */
  public clearToken(): void {
    localStorage.removeItem('token');
    delete this.client.defaults.headers.common['Authorization'];
  }

  /**
   * GET isteği gönderir
   */
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  /**
   * POST isteği gönderir
   */
  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  /**
   * PUT isteği gönderir
   */
  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  /**
   * DELETE isteği gönderir
   */
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  /**
   * API istemcisini döndürür (ileri seviye kullanım için)
   */
  public getClient(): AxiosInstance {
    return this.client;
  }
}

// API istemci singleton instance'ı
const apiClient = ApiClient.getInstance();

export default apiClient; 