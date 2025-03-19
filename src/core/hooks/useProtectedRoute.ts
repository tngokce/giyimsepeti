import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import authService from '../services/AuthService';

/**
 * Korumalı rotalar için custom hook
 * Kullanıcı oturum açmadıysa giriş sayfasına yönlendirir
 */
export const useProtectedRoute = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Token'ın geçerliliğini kontrol et
        await authService.verifyToken();
        setIsAuthenticated(true);
      } catch (error) {
        // Geçersiz token veya hata durumunda giriş sayfasına yönlendir
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  return { isLoading, isAuthenticated };
}; 