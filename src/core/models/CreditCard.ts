/**
 * Kredi kartı model interface'i
 */
export interface CreditCard {
  id: number;
  user_id: number;
  card_name: string;
  card_no: string;
  expire_month: number;
  expire_year: number;
  is_default?: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Kredi kartı oluşturma payload'ı
 */
export interface CreateCreditCardPayload {
  card_name: string;
  card_no: string;
  expire_month: number;
  expire_year: number;
  ccv: string;
  is_default?: boolean;
}

/**
 * Kredi kartı güncelleme payload'ı
 */
export interface UpdateCreditCardPayload extends Omit<CreateCreditCardPayload, 'card_no'> {
  id: number;
} 