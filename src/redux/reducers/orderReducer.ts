import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE
} from '../actions/orderActions';

// Initial State
const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null
};

// Reducer
const orderReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
    case FETCH_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        currentOrder: action.payload,
        orders: [...state.orders, action.payload],
        loading: false,
        error: null
      };
      
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
        error: null
      };
      
    case CREATE_ORDER_FAILURE:
    case FETCH_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    default:
      return state;
  }
};

export default orderReducer; 