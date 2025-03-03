'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ShoppingBag, Home } from 'lucide-react';

interface OrderSuccessProps {
  orderId: string | number;
}

export default function OrderSuccess({ orderId }: OrderSuccessProps) {
  const router = useRouter();
  
  // Sayfa yüklendiğinde sayfanın en üstüne kaydır
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
      <div className="flex justify-center mb-4">
        <CheckCircle className="w-16 h-16 text-green-500" />
      </div>
      
      <h2 className="text-2xl font-bold mb-2">Siparişiniz Başarıyla Oluşturuldu!</h2>
      <p className="text-gray-600 mb-6">
        Sipariş numaranız: <span className="font-medium">{orderId}</span>
      </p>
      
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <p className="text-sm text-gray-600">
          Siparişiniz en kısa sürede hazırlanıp kargoya verilecektir. Siparişinizin durumunu "Hesabım &gt; Siparişlerim" bölümünden takip edebilirsiniz.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        <button 
          onClick={() => router.push('/account/orders')}
          className="px-6 py-3 bg-[#F27A1A] text-white rounded-md hover:bg-[#e06c10] flex items-center justify-center"
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          Siparişlerim
        </button>
        
        <button 
          onClick={() => router.push('/')}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center justify-center"
        >
          <Home className="w-5 h-5 mr-2" />
          Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
} 