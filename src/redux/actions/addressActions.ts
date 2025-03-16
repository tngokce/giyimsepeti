import { Dispatch } from 'redux';
import api from '@/lib/axios';

// Action Types
export const FETCH_ADDRESSES_REQUEST = 'FETCH_ADDRESSES_REQUEST';
export const FETCH_ADDRESSES_SUCCESS = 'FETCH_ADDRESSES_SUCCESS';
export const FETCH_ADDRESSES_FAILURE = 'FETCH_ADDRESSES_FAILURE';
export const ADD_ADDRESS_SUCCESS = 'ADD_ADDRESS_SUCCESS';
export const UPDATE_ADDRESS_SUCCESS = 'UPDATE_ADDRESS_SUCCESS';
export const DELETE_ADDRESS_SUCCESS = 'DELETE_ADDRESS_SUCCESS';
export const SET_SELECTED_SHIPPING_ADDRESS = 'SET_SELECTED_SHIPPING_ADDRESS';
export const SET_SELECTED_BILLING_ADDRESS = 'SET_SELECTED_BILLING_ADDRESS';
export const SET_SAME_BILLING_ADDRESS = 'SET_SAME_BILLING_ADDRESS';

// Adres listesini getirme
export const fetchAddresses = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_ADDRESSES_REQUEST });
  
  try {
    const response = await api.get('/user/address');
    dispatch({ 
      type: FETCH_ADDRESSES_SUCCESS, 
      payload: response.data 
    });
    return response.data;
  } catch (error) {
    dispatch({ 
      type: FETCH_ADDRESSES_FAILURE, 
      payload: error instanceof Error ? error.message : 'Adresler alınırken bir hata oluştu' 
    });
    return null;
  }
};

// Yeni adres ekleme
export const addAddress = (addressData: any) => async (dispatch: Dispatch) => {
  try {
    const response = await api.post('/user/address', addressData);
    dispatch({ 
      type: ADD_ADDRESS_SUCCESS, 
      payload: response.data 
    });
    return response.data;
  } catch (error) {
    console.error('Adres eklenirken hata oluştu:', error);
    return null;
  }
};

// Adres güncelleme
export const updateAddress = (addressData: any) => async (dispatch: Dispatch) => {
  try {
    const response = await api.put('/user/address', addressData);
    dispatch({ 
      type: UPDATE_ADDRESS_SUCCESS, 
      payload: response.data 
    });
    return response.data;
  } catch (error) {
    console.error('Adres güncellenirken hata oluştu:', error);
    return null;
  }
};

// Adres silme
export const deleteAddress = (addressId: number) => async (dispatch: Dispatch) => {
  try {
    await api.delete(`/user/address/${addressId}`);
    dispatch({ 
      type: DELETE_ADDRESS_SUCCESS, 
      payload: addressId 
    });
    return true;
  } catch (error) {
    console.error('Adres silinirken hata oluştu:', error);
    return false;
  }
};

// Seçili teslimat adresini ayarlama
export const setSelectedShippingAddress = (addressId: number) => ({
  type: SET_SELECTED_SHIPPING_ADDRESS,
  payload: addressId
});

// Seçili fatura adresini ayarlama
export const setSelectedBillingAddress = (addressId: number) => ({
  type: SET_SELECTED_BILLING_ADDRESS,
  payload: addressId
});

// Fatura adresi teslimat adresi ile aynı mı
export const setSameBillingAddress = (isSame: boolean) => ({
  type: SET_SAME_BILLING_ADDRESS,
  payload: isSame
}); 