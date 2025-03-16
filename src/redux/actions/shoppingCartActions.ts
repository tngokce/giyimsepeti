import { 
  SET_CART, 
  SET_PAYMENT, 
  SET_ADDRESS,
  ADD_TO_CART, 
  REMOVE_FROM_CART, 
  UPDATE_CART_ITEM, 
  CLEAR_CART, 
  TOGGLE_CART_ITEM,
  ShoppingCartActionTypes 
} from '../reducers/shoppingCartReducer';
import { AppDispatch } from '../store';
import api from '@/lib/axios';

// Action Creators
export const setCart = (cart: any[]): ShoppingCartActionTypes => ({
  type: SET_CART,
  payload: cart
});

export const setPayment = (payment: any): ShoppingCartActionTypes => ({
  type: SET_PAYMENT,
  payload: payment
});

export const setAddress = (address: any): ShoppingCartActionTypes => ({
  type: SET_ADDRESS,
  payload: address
});

export const addToCart = (product: any, count: number = 1): ShoppingCartActionTypes => ({
  type: ADD_TO_CART,
  payload: { product, count }
});

export const removeFromCart = (productId: number): ShoppingCartActionTypes => ({
  type: REMOVE_FROM_CART,
  payload: productId
});

export const updateCartItem = (productId: number, count: number): ShoppingCartActionTypes => ({
  type: UPDATE_CART_ITEM,
  payload: { productId, count }
});

export const clearCart = (): ShoppingCartActionTypes => ({
  type: CLEAR_CART
});

export const toggleCartItem = (productId: number): ShoppingCartActionTypes => ({
  type: TOGGLE_CART_ITEM,
  payload: productId
});

// Sipariş oluşturma thunk'ı
export const createOrder = (orderData: any) => async (dispatch: AppDispatch) => {
  try {
    const response = await api.post('/order', orderData);
    
    // Başarılı sipariş sonrası sepeti temizle
    dispatch(clearCart());
    dispatch(setAddress(null));
    dispatch(setPayment(null));
    
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Sipariş oluşturulurken hata:', error);
    return { 
      success: false, 
      error: error.response?.data?.message || 'Sipariş oluşturma başarısız oldu' 
    };
  }
}; 