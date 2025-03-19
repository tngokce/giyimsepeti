/**
 * Adres model interface'i
 */
export interface Address {
  id: number;
  user_id: number;
  name: string;
  address_line: string;
  district: string;
  city: string;
  postal_code: string;
  phone?: string;
  is_default?: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Adres oluşturma payload'ı
 */
export interface CreateAddressPayload {
  name: string;
  address_line: string;
  district: string;
  city: string;
  postal_code: string;
  phone?: string;
  is_default?: boolean;
}

/**
 * Adres güncelleme payload'ı
 */
export interface UpdateAddressPayload extends CreateAddressPayload {
  id: number;
} 