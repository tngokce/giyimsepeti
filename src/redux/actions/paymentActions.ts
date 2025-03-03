import { Dispatch } from 'redux';
import api from '@/lib/axios';

// Action Types
export const FETCH_CARDS_REQUEST = 'FETCH_CARDS_REQUEST';
export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';
export const FETCH_CARDS_FAILURE = 'FETCH_CARDS_FAILURE';
export const ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS';
export const UPDATE_CARD_SUCCESS = 'UPDATE_CARD_SUCCESS';
export const DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS';
export const SET_SELECTED_CARD = 'SET_SELECTED_CARD';

// Kart listesini getirme
export const fetchCards = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_CARDS_REQUEST });
  
  try {
    const response = await api.get('/user/card');
    dispatch({ 
      type: FETCH_CARDS_SUCCESS, 
      payload: response.data 
    });
    return response.data;
  } catch (error) {
    dispatch({ 
      type: FETCH_CARDS_FAILURE, 
      payload: error instanceof Error ? error.message : 'Kartlar alınırken bir hata oluştu' 
    });
    return null;
  }
};

// Yeni kart ekleme
export const addCard = (cardData: any) => async (dispatch: Dispatch) => {
  try {
    const response = await api.post('/user/card', cardData);
    dispatch({ 
      type: ADD_CARD_SUCCESS, 
      payload: response.data 
    });
    return response.data;
  } catch (error) {
    console.error('Kart eklenirken hata oluştu:', error);
    return null;
  }
};

// Kart güncelleme
export const updateCard = (cardData: any) => async (dispatch: Dispatch) => {
  try {
    const response = await api.put('/user/card', cardData);
    dispatch({ 
      type: UPDATE_CARD_SUCCESS, 
      payload: response.data 
    });
    return response.data;
  } catch (error) {
    console.error('Kart güncellenirken hata oluştu:', error);
    return null;
  }
};

// Kart silme
export const deleteCard = (cardId: number) => async (dispatch: Dispatch) => {
  try {
    await api.delete(`/user/card/${cardId}`);
    dispatch({ 
      type: DELETE_CARD_SUCCESS, 
      payload: cardId 
    });
    return true;
  } catch (error) {
    console.error('Kart silinirken hata oluştu:', error);
    return false;
  }
};

// Seçili kartı ayarlama
export const setSelectedCard = (cardId: number) => ({
  type: SET_SELECTED_CARD,
  payload: cardId
}); 