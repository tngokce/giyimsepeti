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
  SET_PRODUCT_DETAIL,
  FETCH_STATES,
  ProductActionTypes 
} from '../reducers/productReducer';
import { AppDispatch } from '../store';

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

export const setProductDetail = (product: any): ProductActionTypes => ({
  type: SET_PRODUCT_DETAIL,
  payload: product
});

// Thunk Action Creator
export const fetchCategories = () => async (dispatch: AppDispatch) => {
  try {
    const response = await api.get('/categories');
    dispatch(setCategories(response.data));
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

export const fetchProducts = (params: {
  limit?: number;
  offset?: number;
  filter?: string;
  categoryId?: number;
  sort?: string;
}) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setFetchState(FETCH_STATES.FETCHING));
    
    const { limit, offset, filter, categoryId, sort } = params;
    
    // API isteği için parametreleri hazırla
    const queryParams = new URLSearchParams();
    if (limit) queryParams.append('limit', limit.toString());
    if (offset) queryParams.append('offset', offset.toString());
    if (filter) queryParams.append('filter', filter);
    if (categoryId) queryParams.append('categoryId', categoryId.toString());
    if (sort) queryParams.append('sort', sort);
    
    const response = await api.get(`/products?${queryParams.toString()}`);
    
    dispatch(setProductList(response.data.products));
    dispatch(setTotal(response.data.total));
    dispatch(setFetchState(FETCH_STATES.FETCHED));
  } catch (error) {
    console.error('Error fetching products:', error);
    dispatch(setFetchState(FETCH_STATES.FAILED));
  }
};

export const fetchProductDetail = (productId: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setFetchState(FETCH_STATES.FETCHING));
    
    const response = await api.get(`/products/${productId}`);
    
    dispatch(setProductDetail(response.data));
    dispatch(setFetchState(FETCH_STATES.FETCHED));
    
    return response.data;
  } catch (error) {
    console.error('Error fetching product detail:', error);
    dispatch(setFetchState(FETCH_STATES.FAILED));
    return null;
  }
}; 