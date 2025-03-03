'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Package } from 'lucide-react';
import { RootState } from '@/redux/store';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import OrderDetail from '@/components/account/OrderDetail';
import { fetchOrders } from '@/redux/actions/orderActions';

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state: RootState) => state.order);
  
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-2xl font-bold mb-6">Siparişlerim</h1>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#23A6F0]"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Siparişleriniz yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <Package className="w-16 h-16 text-gray-300" />
            </div>
            <h2 className="text-xl font-medium mb-2">Henüz Siparişiniz Bulunmuyor</h2>
            <p className="text-gray-500 mb-6">
              Siparişleriniz burada listelenecektir. Alışverişe başlamak için ana sayfaya dönebilirsiniz.
            </p>
            <a 
              href="/"
              className="inline-block px-6 py-3 bg-[#F27A1A] text-white rounded-md hover:bg-[#e06c10]"
            >
              Alışverişe Başla
            </a>
          </div>
        ) : (
          <div>
            {orders.map((order: any) => (
              <OrderDetail key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
} 