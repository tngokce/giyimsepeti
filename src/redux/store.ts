import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import clientReducer from './reducers/clientReducer';
import productReducer from './reducers/productReducer';
import shoppingCartReducer from './reducers/shoppingCartReducer';

// Root reducer oluşturma
const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer
});

// Store tipi tanımlama
export type RootState = ReturnType<typeof rootReducer>;

// Store oluşturma
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);

export default store; 