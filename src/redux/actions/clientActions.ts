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
export const verifyToken = () => async (dispatch: Dispatch) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return { success: false };
  }
  
  try {
    // Token'ı axios header'ına ekle
    setAuthToken(token);
    
    // Token doğrulama isteği
    const response = await api.get('/verify');
    
    // Kullanıcı bilgilerini store'a kaydet
    dispatch(setUser(response.data.user));
    
    // Yeni token varsa güncelle
    if (response.data.token) {
      setAuthToken(response.data.token);
    }
    
    return { success: true, data: response.data };
  } catch (error) {
    // Token geçersizse temizle
    setAuthToken(null);
    return { success: false };
  }
}; 