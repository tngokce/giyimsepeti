import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Order, CreateOrderPayload } from '@/core/models/Order';
import orderService from '@/core/services/OrderService';
import { Cart } from '@/core/models/Cart';

/**
 * Sipariş için ViewModel
 */
export const useOrderViewModel = (onOrderSuccess?: () => void) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  /**
   * Siparişleri getirir
   */
  const fetchOrders = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const fetchedOrders = await orderService.getOrders();
      setOrders(fetchedOrders);
      return true;
    } catch (err: any) {
      setError('Siparişler yüklenirken bir hata oluştu');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Belirli bir siparişi getirir
   */
  const fetchOrderById = useCallback(async (orderId: number): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const order = await orderService.getOrderById(orderId);
      setSelectedOrder(order);
      return true;
    } catch (err: any) {
      setError('Sipariş detayları yüklenirken bir hata oluştu');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Sipariş oluşturur
   */
  const createOrder = useCallback(async (cart: Cart): Promise<boolean> => {
    if (!cart.address_id || !cart.payment) {
      setError('Teslimat adresi ve ödeme bilgileri eksik');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Sipariş verisini oluştur
      const orderData: CreateOrderPayload = {
        address_id: cart.address_id,
        order_date: new Date().toISOString(),
        card_no: cart.payment.card_no || '',
        card_name: cart.payment.card_name || '',
        card_expire_month: cart.payment.card_expire_month || 0,
        card_expire_year: cart.payment.card_expire_year || 0,
        card_ccv: cart.payment.card_ccv || '',
        price: cart.total,
        products: cart.items.map(item => ({
          product_id: item.product_id,
          count: item.count,
          detail: item.product?.name || `Ürün #${item.product_id}`
        }))
      };

      // Siparişi oluştur
      await orderService.createOrder(orderData);
      
      // Başarı durumunda
      if (onOrderSuccess) {
        onOrderSuccess();
      }
      
      router.push('/checkout/confirmation');
      return true;
    } catch (err: any) {
      setError('Sipariş oluşturulurken bir hata oluştu');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [router, onOrderSuccess]);

  return {
    orders,
    selectedOrder,
    isLoading,
    error,
    fetchOrders,
    fetchOrderById,
    createOrder
  };
}; 