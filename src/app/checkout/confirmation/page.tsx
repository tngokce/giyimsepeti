'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import ProtectedRoute from '@/components/common/ProtectedRoute';

export default function OrderConfirmationPage() {
  const router = useRouter();
  const { cart } = useSelector((state: RootState) => state.shoppingCart);
  
  // Eğer sepet boş değilse ve kullanıcı doğrudan bu sayfaya geldiyse, 
  // sepet sayfasına yönlendir
  useEffect(() => {
    if (cart.length > 0) {
      router.push('/cart');
    }
  }, [cart, router]);

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Siparişiniz Alındı!</h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Siparişiniz başarıyla oluşturuldu. Siparişinizle ilgili detaylar e-posta adresinize gönderilecektir.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Teşekkür Ederiz!</h2>
            <p className="text-gray-600">
              Siparişiniz en kısa sürede hazırlanıp kargoya verilecektir. 
              Siparişinizin durumunu hesabınızdan takip edebilirsiniz.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/account/orders" 
              className="px-6 py-3 bg-[#23A6F0] text-white rounded-md hover:bg-[#1a7ac0]"
            >
              Siparişlerim
            </Link>
            <Link 
              href="/shop" 
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Alışverişe Devam Et
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 