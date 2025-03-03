import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import clientReducer from './reducers/clientReducer';
import productReducer from './reducers/productReducer';
import shoppingCartReducer from './reducers/shoppingCartReducer';
import addressReducer from './reducers/addressReducer';
import paymentReducer from './reducers/paymentReducer';
import orderReducer from './reducers/orderReducer';

// Root reducer oluşturma
const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer,
  address: addressReducer,
  payment: paymentReducer,
  order: orderReducer
});

// Store tipi tanımlama
export type RootState = ReturnType<typeof rootReducer>;

// Store oluşturma
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);

export default store; 