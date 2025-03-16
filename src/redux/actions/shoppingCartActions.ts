import { 
  SET_CART, 
  SET_PAYMENT, 
  SET_ADDRESS,
  ADD_TO_CART, 
  REMOVE_FROM_CART, 
  UPDATE_CART_ITEM, 
  CLEAR_CART, 
  TOGGLE_CART_ITEM,
  ShoppingCartActionTypes 
} from '../reducers/shoppingCartReducer';

// Action Creators
export const setCart = (cart: any[]): ShoppingCartActionTypes => ({
  type: SET_CART,
  payload: cart
});

export const setPayment = (payment: any): ShoppingCartActionTypes => ({
  type: SET_PAYMENT,
  payload: payment
});

export const setAddress = (address: any): ShoppingCartActionTypes => ({
  type: SET_ADDRESS,
  payload: address
});

export const addToCart = (product: any, count: number): ShoppingCartActionTypes => ({
  type: ADD_TO_CART,
  payload: { product, count }
});

export const removeFromCart = (productId: number): ShoppingCartActionTypes => ({
  type: REMOVE_FROM_CART,
  payload: productId
});

export const updateCartItem = (productId: number, count: number): ShoppingCartActionTypes => ({
  type: UPDATE_CART_ITEM,
  payload: { productId, count }
});

export const clearCart = (): ShoppingCartActionTypes => ({
  type: CLEAR_CART
});

export const toggleCartItem = (productId: number): ShoppingCartActionTypes => ({
  type: TOGGLE_CART_ITEM,
  payload: productId
}); 