'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.client.user);
  
  useEffect(() => {
    if (!user) {
      // Kullanıcı giriş yapmamışsa, giriş sayfasına yönlendir
      // Giriş yaptıktan sonra geri dönebilmesi için mevcut URL'yi query param olarak ekle
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
    }
  }, [user, router]);
  
  // Kullanıcı giriş yapmamışsa, içeriği gösterme
  if (!user) {
    return null;
  }
  
  return <>{children}</>;
} 