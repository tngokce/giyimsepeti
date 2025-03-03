import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE
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
      
    case CREATE_ORDER_FAILURE:
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