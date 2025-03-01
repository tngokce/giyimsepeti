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