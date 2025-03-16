import { Dispatch } from 'redux';
import api from '@/lib/axios';
import { clearCart } from './shoppingCartActions';

// Action Types
export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';

// Sipariş oluşturma
export const createOrder = (orderData: any) => async (dispatch: Dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  
  try {
    const response = await api.post('/order', orderData);
    
    dispatch({ 
      type: CREATE_ORDER_SUCCESS, 
      payload: response.data 
    });
    
    // Sipariş başarıyla oluşturulduğunda sepeti temizle
    dispatch(clearCart());
    
    return response.data;
  } catch (error) {
    dispatch({ 
      type: CREATE_ORDER_FAILURE, 
      payload: error instanceof Error ? error.message : 'Sipariş oluşturulurken bir hata oluştu' 
    });
    return null;
  }
}; 