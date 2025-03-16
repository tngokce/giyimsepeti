// Action Types
export const SET_CART = 'SET_CART';
export const SET_PAYMENT = 'SET_PAYMENT';
export const SET_ADDRESS = 'SET_ADDRESS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
export const CLEAR_CART = 'CLEAR_CART';
export const TOGGLE_CART_ITEM = 'TOGGLE_CART_ITEM';

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

interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: {
    product: any;
    count: number;
  };
}

interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: number; // Product ID
}

interface UpdateCartItemAction {
  type: typeof UPDATE_CART_ITEM;
  payload: {
    productId: number;
    count: number;
  };
}

interface ClearCartAction {
  type: typeof CLEAR_CART;
}

interface ToggleCartItemAction {
  type: typeof TOGGLE_CART_ITEM;
  payload: number; // Product ID
}

export type ShoppingCartActionTypes = 
  | SetCartAction 
  | SetPaymentAction 
  | SetAddressAction 
  | AddToCartAction 
  | RemoveFromCartAction 
  | UpdateCartItemAction 
  | ClearCartAction
  | ToggleCartItemAction;

// Initial State
interface ShoppingCartState {
  cart: Array<{
    count: number;
    product: any;
    checked: boolean;
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
    case ADD_TO_CART:
      // Ürün zaten sepette var mı kontrol et
      const existingItemIndex = state.cart.findIndex(
        item => item.product.id === action.payload.product.id
      );
      
      if (existingItemIndex >= 0) {
        // Ürün zaten sepette, miktarını güncelle
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          count: updatedCart[existingItemIndex].count + action.payload.count
        };
        
        return {
          ...state,
          cart: updatedCart
        };
      } else {
        // Ürün sepette yok, yeni ekle
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              count: action.payload.count,
              checked: true,
              product: action.payload.product
            }
          ]
        };
      }
      
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload)
      };
      
    case UPDATE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map(item => 
          item.product.id === action.payload.productId
            ? { ...item, count: action.payload.count }
            : item
        )
      };
      
    case CLEAR_CART:
      return {
        ...state,
        cart: []
      };
      
    case TOGGLE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map(item => 
          item.product.id === action.payload
            ? { ...item, checked: !item.checked }
            : item
        )
      };
      
    default:
      return state;
  }
};

export default shoppingCartReducer; 