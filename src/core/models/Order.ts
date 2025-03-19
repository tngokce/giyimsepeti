import { Product } from './Product';
import { Address } from './Address';

/**
 * Sipariş durumu enum'u
 */
export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

/**
 * Sipariş öğesi interface'i
 */
export interface OrderItem {
  id: number;
  product_id: number;
  order_id: number;
  product?: Product;
  count: number;
  price: number;
  variant?: string;
  detail?: string;
  image?: string;
}

/**
 * Sipariş model interface'i
 */
export interface Order {
  id: number;
  user_id: number;
  address_id: number;
  address?: Address;
  status: OrderStatus;
  order_date: string;
  total_price: number;
  price: number;
  products: OrderItem[];
  card_name?: string;
  card_no?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Sipariş oluşturma payload'ı
 */
export interface CreateOrderPayload {
  address_id: number;
  order_date: string;
  card_no: string;
  card_name: string;
  card_expire_month: number;
  card_expire_year: number;
  card_ccv: string;
  price: number;
  products: {
    product_id: number;
    count: number;
    detail: string;
  }[];
} 