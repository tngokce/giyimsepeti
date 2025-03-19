'use client';

import { ReactNode } from 'react';
import { useProtectedRoute } from '@/core/hooks/useProtectedRoute';

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Korumalı rota bileşeni
 * Kullanıcı oturum açmadıysa giriş sayfasına yönlendirir
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoading, isAuthenticated } = useProtectedRoute();

  // Yükleniyor durumunu göster
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#23A6F0]"></div>
      </div>
    );
  }

  // Kimlik doğrulanmış ise çocukları render et
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Kimlik doğrulanmadıysa boş içerik döndür (zaten yönlendirme yapıldı)
  return null;
} 