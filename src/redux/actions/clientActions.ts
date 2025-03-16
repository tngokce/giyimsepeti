import { Dispatch } from 'redux';
import api from '@/lib/axios';
import { 
  SET_USER, 
  SET_ROLES, 
  SET_THEME, 
  SET_LANGUAGE,
  ClientActionTypes 
} from '../reducers/clientReducer';
import { setAuthToken } from '@/lib/axios';
import { AppDispatch } from '../store';

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
export const fetchRoles = () => async (dispatch: AppDispatch) => {
  try {
    const response = await api.get('/roles');
    dispatch(setRoles(response.data));
  } catch (error) {
    console.error('Error fetching roles:', error);
  }
};

// Login Thunk
export const loginUser = (credentials: { email: string; password: string }, rememberMe: boolean) => 
  async (dispatch: AppDispatch) => {
    try {
      const response = await api.post('/login', credentials);
      
      // Kullanıcı bilgilerini store'a kaydet
      dispatch(setUser(response.data.user));
      
      // Token'ı kaydet (eğer rememberMe seçiliyse)
      if (response.data.token) {
        if (rememberMe) {
          setAuthToken(response.data.token);
        } else {
          // Sadece session için token'ı ayarla, localStorage'a kaydetme
          api.defaults.headers.common['Authorization'] = response.data.token;
        }
      }
      
      return { success: true, data: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Giriş başarısız oldu' 
      };
    }
  };

// Token doğrulama thunk'ı
export const verifyToken = () => async (dispatch: AppDispatch) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return { success: false };
  }
  
  try {
    // Token'ı axios header'ına ekle
    api.defaults.headers.common['Authorization'] = token;
    
    // Kullanıcı bilgilerini al
    const response = await api.get('/me');
    
    // Kullanıcı bilgilerini store'a kaydet
    dispatch(setUser(response.data));
    
    return { success: true, data: response.data };
  } catch (error) {
    // Token geçersiz, temizle
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    
    return { success: false };
  }
}; 