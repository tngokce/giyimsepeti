'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { ChevronDown, ChevronUp, Package, Calendar, CreditCard, MapPin } from 'lucide-react';
import { toast } from 'react-toastify';
import { useOrderViewModel } from '../viewModels/OrderViewModel';
import ProtectedRoute from '@/shared/components/ProtectedRoute';
import { OrderStatus } from '@/core/models/Order';

/**
 * Siparişler sayfası görünümü
 */
export default function OrdersView() {
  const { orders, isLoading, error, fetchOrders } = useOrderViewModel();
  const [expandedOrderIds, setExpandedOrderIds] = useState<number[]>([]);

  useEffect(() => {
    const loadOrders = async () => {
      const success = await fetchOrders();
      if (!success && error) {
        toast.error(error);
      }
    };

    loadOrders();
  }, [fetchOrders, error]);

  const toggleOrderExpand = (orderId: number) => {
    setExpandedOrderIds(prev => 
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMMM yyyy, HH:mm', { locale: tr });
    } catch (error) {
      return dateString;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  };

  const getOrderStatusText = (status: string) => {
    switch (status) {
      case OrderStatus.PENDING:
        return 'Beklemede';
      case OrderStatus.PROCESSING:
        return 'İşleniyor';
      case OrderStatus.SHIPPED:
        return 'Kargoya Verildi';
      case OrderStatus.DELIVERED:
        return 'Teslim Edildi';
      case OrderStatus.CANCELLED:
        return 'İptal Edildi';
      default:
        return status;
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case OrderStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case OrderStatus.PROCESSING:
        return 'bg-blue-100 text-blue-800';
      case OrderStatus.SHIPPED:
        return 'bg-purple-100 text-purple-800';
      case OrderStatus.DELIVERED:
        return 'bg-green-100 text-green-800';
      case OrderStatus.CANCELLED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Siparişlerim</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#23A6F0]"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Henüz siparişiniz bulunmuyor</h2>
            <p className="text-gray-500 mb-6">Siparişleriniz burada görüntülenecektir.</p>
            <a 
              href="/shop" 
              className="inline-block px-6 py-3 bg-[#23A6F0] text-white rounded-md hover:bg-[#1a7ac0]"
            >
              Alışverişe Başla
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Order Header */}
                <div className="p-6 border-b">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-3">
                        <span className="text-lg font-semibold">Sipariş #{order.id}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                          {getOrderStatusText(order.status)}
                        </span>
                      </div>
                      <div className="flex items-center mt-2 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{formatDate(order.order_date)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex items-center space-x-4">
                      <span className="font-semibold text-lg">{formatPrice(order.price)}</span>
                      <button 
                        onClick={() => toggleOrderExpand(order.id)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        {expandedOrderIds.includes(order.id) ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Order Details (Collapsible) */}
                {expandedOrderIds.includes(order.id) && (
                  <div className="p-6 bg-gray-50">
                    {/* Order Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center mb-3">
                          <Package className="w-5 h-5 text-[#23A6F0] mr-2" />
                          <h3 className="font-semibold">Sipariş Bilgileri</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p><span className="text-gray-500">Sipariş Numarası:</span> #{order.id}</p>
                          <p><span className="text-gray-500">Tarih:</span> {formatDate(order.order_date)}</p>
                          <p><span className="text-gray-500">Durum:</span> {getOrderStatusText(order.status)}</p>
                          <p><span className="text-gray-500">Toplam Tutar:</span> {formatPrice(order.price)}</p>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center mb-3">
                          <MapPin className="w-5 h-5 text-[#23A6F0] mr-2" />
                          <h3 className="font-semibold">Teslimat Adresi</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                          {order.address ? (
                            <>
                              <p>{order.address.name}</p>
                              <p>{order.address.address_line}</p>
                              <p>{order.address.district} / {order.address.city}</p>
                              <p>{order.address.postal_code}</p>
                            </>
                          ) : (
                            <p className="text-gray-500">Adres bilgisi bulunamadı</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center mb-3">
                          <CreditCard className="w-5 h-5 text-[#23A6F0] mr-2" />
                          <h3 className="font-semibold">Ödeme Bilgileri</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p><span className="text-gray-500">Ödeme Yöntemi:</span> Kredi Kartı</p>
                          <p><span className="text-gray-500">Kart Sahibi:</span> {order.card_name || 'Bilgi yok'}</p>
                          <p>
                            <span className="text-gray-500">Kart Numarası:</span> 
                            {order.card_no ? `**** **** **** ${order.card_no.slice(-4)}` : 'Bilgi yok'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Products */}
                    <h3 className="font-semibold text-lg mb-4">Sipariş Ürünleri</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Ürün
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Adet
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Birim Fiyat
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Toplam
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {order.products && order.products.map((product, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  {product.image && (
                                    <div className="flex-shrink-0 h-10 w-10 mr-3">
                                      <img 
                                        className="h-10 w-10 rounded-md object-cover" 
                                        src={product.image} 
                                        alt={product.detail || 'Ürün'} 
                                      />
                                    </div>
                                  )}
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">
                                      {product.detail || `Ürün #${product.product_id}`}
                                    </div>
                                    {product.variant && (
                                      <div className="text-sm text-gray-500">
                                        {product.variant}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {product.count}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {product.price ? formatPrice(product.price) : '-'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {product.price ? formatPrice(product.price * product.count) : '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
} 