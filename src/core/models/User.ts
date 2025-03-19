/**
 * Kullanıcı rolü enum'u
 */
export enum UserRole {
  CUSTOMER = 1,
  SELLER = 2,
  ADMIN = 3
}

/**
 * Mağaza bilgileri interface'i
 */
export interface Store {
  id?: number;
  name: string;
  phone: string;
  tax_no: string;
  bank_account: string;
}

/**
 * Kullanıcı model interface'i
 */
export interface User {
  id: number;
  name: string;
  email: string;
  role_id: UserRole;
  store?: Store;
  created_at?: string;
  updated_at?: string;
}

/**
 * Giriş yapan kullanıcı için token ile birlikte dönen yanıt
 */
export interface AuthResponse {
  user: User;
  token: string;
}

/**
 * Giriş bilgileri
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Kayıt bilgileri
 */
export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  role_id: UserRole;
  store?: Store;
} 