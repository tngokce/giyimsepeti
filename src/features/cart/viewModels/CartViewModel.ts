import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Cart, CartItem, AddToCartPayload, Payment } from '@/core/models/Cart';
import productService from '@/core/services/ProductService';

/**
 * Sepet için ViewModel
 */
export const useCartViewModel = () => {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * LocalStorage'dan sepeti yükler
   */
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (err) {
        console.error('Sepet yüklenirken hata oluştu:', err);
      }
    };

    loadCart();
  }, []);

  /**
   * Sepeti LocalStorage'a kaydeder
   */
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  /**
   * Toplam fiyatı hesaplar
   */
  const calculateTotal = useCallback((items: CartItem[]): number => {
    return items.reduce((total, item) => total + (item.price * item.count), 0);
  }, []);

  /**
   * Sepete ürün ekler
   */
  const addToCart = useCallback(async (payload: AddToCartPayload): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Ürün bilgilerini getir
      const product = await productService.getProductById(payload.product_id);
      
      // Mevcut sepeti kontrol et
      const existingItemIndex = cart.items.findIndex(
        item => item.product_id === payload.product_id && 
        (item.variant === payload.variant || (!item.variant && !payload.variant))
      );

      let newItems = [...cart.items];

      if (existingItemIndex >= 0) {
        // Mevcut ürünü güncelle
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          count: newItems[existingItemIndex].count + payload.count
        };
      } else {
        // Yeni ürün ekle
        newItems.push({
          id: uuidv4(),
          product_id: product.id,
          product: product,
          count: payload.count,
          price: product.discount_price || product.price,
          variant: payload.variant
        });
      }

      // Sepeti güncelle
      const total = calculateTotal(newItems);
      setCart(prevCart => ({
        ...prevCart,
        items: newItems,
        total
      }));

      return true;
    } catch (err: any) {
      setError('Ürün sepete eklenirken bir hata oluştu');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [cart, calculateTotal]);

  /**
   * Sepetten ürün çıkarır
   */
  const removeFromCart = useCallback((itemId: string): void => {
    const newItems = cart.items.filter(item => item.id !== itemId);
    const total = calculateTotal(newItems);
    
    setCart(prevCart => ({
      ...prevCart,
      items: newItems,
      total
    }));
  }, [cart, calculateTotal]);

  /**
   * Sepetteki ürün miktarını günceller
   */
  const updateItemCount = useCallback((itemId: string, count: number): void => {
    if (count <= 0) {
      removeFromCart(itemId);
      return;
    }

    const newItems = cart.items.map(item => {
      if (item.id === itemId) {
        return { ...item, count };
      }
      return item;
    });

    const total = calculateTotal(newItems);
    
    setCart(prevCart => ({
      ...prevCart,
      items: newItems,
      total
    }));
  }, [cart, calculateTotal, removeFromCart]);

  /**
   * Sepeti temizler
   */
  const clearCart = useCallback((): void => {
    setCart({ items: [], total: 0 });
  }, []);

  /**
   * Teslimat adresi ayarlar
   */
  const setDeliveryAddress = useCallback((addressId: number): void => {
    setCart(prevCart => ({
      ...prevCart,
      address_id: addressId
    }));
  }, []);

  /**
   * Ödeme bilgilerini ayarlar
   */
  const setPayment = useCallback((payment: Payment): void => {
    setCart(prevCart => ({
      ...prevCart,
      payment
    }));
  }, []);

  return {
    cart,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    updateItemCount,
    clearCart,
    setDeliveryAddress,
    setPayment
  };
}; 