import apiClient from '../api/apiClient';
import { Order, CreateOrderPayload } from '../models/Order';

/**
 * Sipariş ile ilgili servis işlemlerini yönetir
 */
class OrderService {
  private static instance: OrderService;

  private constructor() {}

  /**
   * Singleton pattern ile tek bir servis instance'ı döndürür
   */
  public static getInstance(): OrderService {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService();
    }
    return OrderService.instance;
  }

  /**
   * Kullanıcının siparişlerini getirir
   */
  public async getOrders(): Promise<Order[]> {
    return await apiClient.get<Order[]>('/order');
  }

  /**
   * Belirli bir siparişi ID'ye göre getirir
   * @param id Sipariş ID'si
   */
  public async getOrderById(id: number): Promise<Order> {
    return await apiClient.get<Order>(`/order/${id}`);
  }

  /**
   * Yeni bir sipariş oluşturur
   * @param orderData Sipariş verileri
   */
  public async createOrder(orderData: CreateOrderPayload): Promise<Order> {
    return await apiClient.post<Order>('/order', orderData);
  }
}

const orderService = OrderService.getInstance();

export default orderService; 