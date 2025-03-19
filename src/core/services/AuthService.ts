import apiClient from '../api/apiClient';
import { User, AuthResponse, LoginCredentials, SignupCredentials } from '../models/User';

/**
 * Kimlik doğrulama ile ilgili servis işlemlerini yönetir
 */
class AuthService {
  private static instance: AuthService;

  private constructor() {}

  /**
   * Singleton pattern ile tek bir servis instance'ı döndürür
   */
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Kullanıcı girişi yapar
   * @param credentials Kullanıcı giriş bilgileri
   */
  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/login', credentials);
    apiClient.setToken(response.token);
    return response;
  }

  /**
   * Kullanıcı kaydı oluşturur
   * @param data Kullanıcı kayıt bilgileri
   */
  public async register(data: SignupCredentials): Promise<{ message: string }> {
    return await apiClient.post<{ message: string }>('/signup', data);
  }

  /**
   * Oturum açmış kullanıcı bilgilerini getirir
   */
  public async getCurrentUser(): Promise<User> {
    return await apiClient.get<User>('/me');
  }

  /**
   * Çıkış yapar
   */
  public logout(): void {
    apiClient.clearToken();
  }

  /**
   * Token'ın geçerliliğini kontrol eder
   */
  public async verifyToken(): Promise<User> {
    try {
      const user = await this.getCurrentUser();
      return user;
    } catch (error) {
      apiClient.clearToken();
      throw error;
    }
  }
}

const authService = AuthService.getInstance();

export default authService; 