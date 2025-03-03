'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Package } from 'lucide-react';

interface OrderDetailProps {
  order: any;
}

export default function OrderDetail({ order }: OrderDetailProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Sipariş durumu
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Hazırlanıyor</span>;
      case 'shipped':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Kargoya Verildi</span>;
      case 'delivered':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Teslim Edildi</span>;
      case 'cancelled':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">İptal Edildi</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };
  
  // Tarih formatı
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Fiyat formatı
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2
    }).format(price);
  };
  
  return (
    <div className="border rounded-md mb-4 overflow-hidden">
      <div 
        className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <Package className="w-5 h-5 text-gray-500 mr-3" />
          <div>
            <div className="font-medium">Sipariş #{order.id}</div>
            <div className="text-sm text-gray-500">{formatDate(order.order_date)}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div>
            {getStatusBadge(order.status || 'pending')}
          </div>
          <div className="font-medium">
            {formatPrice(order.price)}
          </div>
          <button className="text-gray-500">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 border-t">
          <h3 className="font-medium mb-3">Sipariş Detayları</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ürün
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Detay
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Adet
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fiyat
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.products.map((product: any) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {product.product_name || `Ürün #${product.product_id}`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{product.detail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.count}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.price ? formatPrice(product.price * product.count) : '-'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Teslimat Adresi:</span>
              <span className="text-gray-900">{order.address?.title || 'Belirtilmemiş'}</span>
            </div>
            {order.address && (
              <div className="text-sm text-gray-500">
                {order.address.name} {order.address.surname}, {order.address.neighborhood}, {order.address.district}/{order.address.city}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 