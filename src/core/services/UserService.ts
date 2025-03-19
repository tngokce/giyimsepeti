import apiClient from '../api/apiClient';
import { Address, CreateAddressPayload, UpdateAddressPayload } from '../models/Address';
import { CreditCard, CreateCreditCardPayload, UpdateCreditCardPayload } from '../models/CreditCard';

/**
 * Kullanıcı ile ilgili servis işlemlerini yönetir
 */
class UserService {
  private static instance: UserService;

  private constructor() {}

  /**
   * Singleton pattern ile tek bir servis instance'ı döndürür
   */
  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  /**
   * Kullanıcının adreslerini getirir
   */
  public async getAddresses(): Promise<Address[]> {
    return await apiClient.get<Address[]>('/user/address');
  }

  /**
   * Yeni bir adres oluşturur
   * @param addressData Adres verileri
   */
  public async createAddress(addressData: CreateAddressPayload): Promise<Address> {
    return await apiClient.post<Address>('/user/address', addressData);
  }

  /**
   * Bir adresi günceller
   * @param addressData Adres verileri
   */
  public async updateAddress(addressData: UpdateAddressPayload): Promise<Address> {
    return await apiClient.put<Address>('/user/address', addressData);
  }

  /**
   * Bir adresi siler
   * @param addressId Adres ID'si
   */
  public async deleteAddress(addressId: number): Promise<void> {
    await apiClient.delete(`/user/address/${addressId}`);
  }

  /**
   * Kullanıcının kredi kartlarını getirir
   */
  public async getCreditCards(): Promise<CreditCard[]> {
    return await apiClient.get<CreditCard[]>('/user/card');
  }

  /**
   * Yeni bir kredi kartı oluşturur
   * @param cardData Kredi kartı verileri
   */
  public async createCreditCard(cardData: CreateCreditCardPayload): Promise<CreditCard> {
    return await apiClient.post<CreditCard>('/user/card', cardData);
  }

  /**
   * Bir kredi kartını günceller
   * @param cardData Kredi kartı verileri
   */
  public async updateCreditCard(cardData: UpdateCreditCardPayload): Promise<CreditCard> {
    return await apiClient.put<CreditCard>('/user/card', cardData);
  }

  /**
   * Bir kredi kartını siler
   * @param cardId Kredi kartı ID'si
   */
  public async deleteCreditCard(cardId: number): Promise<void> {
    await apiClient.delete(`/user/card/${cardId}`);
  }
}

const userService = UserService.getInstance();

export default userService; 