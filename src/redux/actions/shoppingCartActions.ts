import { 
  SET_CART, 
  SET_PAYMENT, 
  SET_ADDRESS,
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