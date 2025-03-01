// Action Types
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
export const SET_TOTAL = 'SET_TOTAL';
export const SET_FETCH_STATE = 'SET_FETCH_STATE';
export const SET_LIMIT = 'SET_LIMIT';
export const SET_OFFSET = 'SET_OFFSET';
export const SET_FILTER = 'SET_FILTER';

// Fetch States
export const FETCH_STATES = {
  NOT_FETCHED: 'NOT_FETCHED',
  FETCHING: 'FETCHING',
  FETCHED: 'FETCHED',
  FAILED: 'FAILED'
};

// Action Interfaces
interface SetCategoriesAction {
  type: typeof SET_CATEGORIES;
  payload: any[];
}

interface SetProductListAction {
  type: typeof SET_PRODUCT_LIST;
  payload: any[];
}

interface SetTotalAction {
  type: typeof SET_TOTAL;
  payload: number;
}

interface SetFetchStateAction {
  type: typeof SET_FETCH_STATE;
  payload: string;
}

interface SetLimitAction {
  type: typeof SET_LIMIT;
  payload: number;
}

interface SetOffsetAction {
  type: typeof SET_OFFSET;
  payload: number;
}

interface SetFilterAction {
  type: typeof SET_FILTER;
  payload: string;
}

export type ProductActionTypes = 
  | SetCategoriesAction 
  | SetProductListAction 
  | SetTotalAction 
  | SetFetchStateAction 
  | SetLimitAction 
  | SetOffsetAction 
  | SetFilterAction;

// Initial State
interface ProductState {
  categories: any[];
  productList: any[];
  total: number;
  limit: number;
  offset: number;
  filter: string;
  fetchState: string;
}

const initialState: ProductState = {
  categories: [],
  productList: [],
  total: 0,
  limit: 25,
  offset: 0,
  filter: '',
  fetchState: FETCH_STATES.NOT_FETCHED
};

// Reducer
const productReducer = (state = initialState, action: ProductActionTypes): ProductState => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case SET_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload
      };
    case SET_TOTAL:
      return {
        ...state,
        total: action.payload
      };
    case SET_FETCH_STATE:
      return {
        ...state,
        fetchState: action.payload
      };
    case SET_LIMIT:
      return {
        ...state,
        limit: action.payload
      };
    case SET_OFFSET:
      return {
        ...state,
        offset: action.payload
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state;
  }
};

export default productReducer; 