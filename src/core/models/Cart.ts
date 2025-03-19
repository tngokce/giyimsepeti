import { Product } from './Product';

/**
 * Sepet öğesi interface'i
 */
export interface CartItem {
  id: string;
  product_id: number;
  product?: Product;
  count: number;
  price: number;
  variant?: string;
}

/**
 * Sepet modeli interface'i
 */
export interface Cart {
  items: CartItem[];
  address_id?: number;
  payment?: Payment;
  total: number;
}

/**
 * Sepete ürün eklemek için kullanılan interface
 */
export interface AddToCartPayload {
  product_id: number;
  count: number;
  variant?: string;
}

/**
 * Ödeme bilgileri interface'i
 */
export interface Payment {
  card_id?: number;
  card_no?: string;
  card_name?: string;
  card_expire_month?: number;
  card_expire_year?: number;
  card_ccv?: string;
  secure_3d?: boolean;
} 