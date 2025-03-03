import axios from 'axios';

const api = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token'ı axios header'ına ekleyen fonksiyon
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = token;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

// Başlangıçta localStorage'dan token'ı kontrol et
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token');
  if (token) {
    setAuthToken(token);
  }
}

export default api; 