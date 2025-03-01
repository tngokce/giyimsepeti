import { Dispatch } from 'redux';
import api from '@/lib/axios';
import { 
  SET_USER, 
  SET_ROLES, 
  SET_THEME, 
  SET_LANGUAGE,
  ClientActionTypes 
} from '../reducers/clientReducer';

// Action Creators
export const setUser = (user: any): ClientActionTypes => ({
  type: SET_USER,
  payload: user
});

export const setRoles = (roles: any[]): ClientActionTypes => ({
  type: SET_ROLES,
  payload: roles
});

export const setTheme = (theme: string): ClientActionTypes => ({
  type: SET_THEME,
  payload: theme
});

export const setLanguage = (language: string): ClientActionTypes => ({
  type: SET_LANGUAGE,
  payload: language
});

// Thunk Action Creator
export const fetchRoles = () => async (dispatch: Dispatch) => {
  try {
    const response = await api.get('/roles');
    dispatch(setRoles(response.data));
  } catch (error) {
    console.error('Error fetching roles:', error);
  }
};

// Login Thunk
export const loginUser = (credentials: { email: string; password: string }, rememberMe: boolean) => 
  async (dispatch: Dispatch) => {
    try {
      const response = await api.post('/login', credentials);
      
      // Kullanıcı bilgilerini store'a kaydet
      dispatch(setUser(response.data.user));
      
      // Token'ı localStorage'a kaydet (eğer rememberMe seçiliyse)
      if (rememberMe && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      return { success: true, data: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Giriş başarısız oldu' 
      };
    }
  }; 