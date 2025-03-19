import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { LoginCredentials, SignupCredentials, User } from '@/core/models/User';
import authService from '@/core/services/AuthService';

/**
 * Kimlik doğrulama için ViewModel
 */
export const useAuthViewModel = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  /**
   * Kullanıcı girişi yapar
   */
  const login = useCallback(async (credentials: LoginCredentials, rememberMe: boolean): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Giriş başarısız oldu');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Kullanıcı kaydı yapar
   */
  const register = useCallback(async (data: SignupCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.register(data);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Kayıt işlemi başarısız oldu');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Token'ın geçerliliğini kontrol eder
   */
  const verifyToken = useCallback(async (): Promise<boolean> => {
    try {
      const currentUser = await authService.verifyToken();
      setUser(currentUser);
      return true;
    } catch (error) {
      setUser(null);
      return false;
    }
  }, []);

  /**
   * Çıkış yapar
   */
  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    router.push('/');
  }, [router]);

  return {
    user,
    isLoading,
    error,
    login,
    logout,
    register,
    verifyToken,
  };
}; 