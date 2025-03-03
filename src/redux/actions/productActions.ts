import { Dispatch } from 'redux';
import api from '@/lib/axios';
import { 
  SET_CATEGORIES, 
  SET_PRODUCT_LIST, 
  SET_TOTAL, 
  SET_FETCH_STATE, 
  SET_LIMIT, 
  SET_OFFSET, 
  SET_FILTER,
  FETCH_STATES,
  ProductActionTypes 
} from '../reducers/productReducer';

// Action Creators
export const setCategories = (categories: any[]): ProductActionTypes => ({
  type: SET_CATEGORIES,
  payload: categories
});

export const setProductList = (products: any[]): ProductActionTypes => ({
  type: SET_PRODUCT_LIST,
  payload: products
});

export const setTotal = (total: number): ProductActionTypes => ({
  type: SET_TOTAL,
  payload: total
});

export const setFetchState = (state: string): ProductActionTypes => ({
  type: SET_FETCH_STATE,
  payload: state
});

export const setLimit = (limit: number): ProductActionTypes => ({
  type: SET_LIMIT,
  payload: limit
});

export const setOffset = (offset: number): ProductActionTypes => ({
  type: SET_OFFSET,
  payload: offset
});

export const setFilter = (filter: string): ProductActionTypes => ({
  type: SET_FILTER,
  payload: filter
});

// Thunk Action Creator
export const fetchCategories = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setFetchState(FETCH_STATES.FETCHING));
    const response = await api.get('/categories');
    dispatch(setCategories(response.data));
    dispatch(setFetchState(FETCH_STATES.FETCHED));
    return response.data;
  } catch (error) {
    dispatch(setFetchState(FETCH_STATES.FAILED));
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Ürünleri getirme thunk'ı
export const fetchProducts = (params?: { 
  limit?: number; 
  offset?: number; 
  categoryId?: number;
  filter?: string;
  sort?: string;
}) => async (dispatch: Dispatch) => {
  try {
    dispatch(setFetchState(FETCH_STATES.FETCHING));
    
    // Query parametrelerini oluştur
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    if (params?.categoryId) queryParams.append('categoryId', params.categoryId.toString());
    if (params?.filter) queryParams.append('filter', params.filter);
    if (params?.sort) queryParams.append('sort', params.sort);
    
    const queryString = queryParams.toString();
    const url = `/products${queryString ? `?${queryString}` : ''}`;
    
    const response = await api.get(url);
    
    // Toplam ürün sayısını ve ürün listesini store'a kaydet
    dispatch(setTotal(response.data.total));
    dispatch(setProductList(response.data.products));
    dispatch(setFetchState(FETCH_STATES.FETCHED));
    
    return response.data;
  } catch (error) {
    dispatch(setFetchState(FETCH_STATES.FAILED));
    console.error('Error fetching products:', error);
    return { total: 0, products: [] };
  }
}; 