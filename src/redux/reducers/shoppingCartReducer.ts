// Action Types
export const SET_CART = 'SET_CART';
export const SET_PAYMENT = 'SET_PAYMENT';
export const SET_ADDRESS = 'SET_ADDRESS';

// Action Interfaces
interface SetCartAction {
  type: typeof SET_CART;
  payload: any[];
}

interface SetPaymentAction {
  type: typeof SET_PAYMENT;
  payload: any;
}

interface SetAddressAction {
  type: typeof SET_ADDRESS;
  payload: any;
}

export type ShoppingCartActionTypes = 
  | SetCartAction 
  | SetPaymentAction 
  | SetAddressAction;

// Initial State
interface ShoppingCartState {
  cart: Array<{
    count: number;
    product: any;
  }>;
  payment: any;
  address: any;
}

const initialState: ShoppingCartState = {
  cart: [],
  payment: null,
  address: null
};

// Reducer
const shoppingCartReducer = (state = initialState, action: ShoppingCartActionTypes): ShoppingCartState => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cart: action.payload
      };
    case SET_PAYMENT:
      return {
        ...state,
        payment: action.payload
      };
    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload
      };
    default:
      return state;
  }
};

export default shoppingCartReducer; 