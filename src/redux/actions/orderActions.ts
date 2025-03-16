import { Dispatch } from 'redux';
import api from '@/lib/axios';
import { clearCart } from './shoppingCartActions';

// Action Types
export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';
export const FETCH_ORDERS_REQUEST = 'FETCH_ORDERS_REQUEST';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';

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

// Sipariş listesini getirme
export const fetchOrders = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_ORDERS_REQUEST });
  
  try {
    const response = await api.get('/order');
    
    dispatch({ 
      type: FETCH_ORDERS_SUCCESS, 
      payload: response.data 
    });
    
    return response.data;
  } catch (error) {
    dispatch({ 
      type: FETCH_ORDERS_FAILURE, 
      payload: error instanceof Error ? error.message : 'Siparişler alınırken bir hata oluştu' 
    });
    return null;
  }
}; 