import {
  FETCH_ADDRESSES_REQUEST,
  FETCH_ADDRESSES_SUCCESS,
  FETCH_ADDRESSES_FAILURE,
  ADD_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_SUCCESS,
  SET_SELECTED_SHIPPING_ADDRESS,
  SET_SELECTED_BILLING_ADDRESS,
  SET_SAME_BILLING_ADDRESS
} from '../actions/addressActions';

// Initial State
const initialState = {
  addresses: [],
  loading: false,
  error: null,
  selectedShippingAddressId: null,
  selectedBillingAddressId: null,
  sameBillingAddress: true
};

// Reducer
const addressReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_ADDRESSES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case FETCH_ADDRESSES_SUCCESS:
      return {
        ...state,
        addresses: action.payload,
        loading: false,
        error: null
      };
      
    case FETCH_ADDRESSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    case ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: [...state.addresses, action.payload]
      };
      
    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: state.addresses.map((address: any) => 
          address.id === action.payload.id ? action.payload : address
        )
      };
      
    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: state.addresses.filter((address: any) => address.id !== action.payload)
      };
      
    case SET_SELECTED_SHIPPING_ADDRESS:
      return {
        ...state,
        selectedShippingAddressId: action.payload
      };
      
    case SET_SELECTED_BILLING_ADDRESS:
      return {
        ...state,
        selectedBillingAddressId: action.payload
      };
      
    case SET_SAME_BILLING_ADDRESS:
      return {
        ...state,
        sameBillingAddress: action.payload,
        // Eğer aynı adres seçeneği işaretlendiyse, fatura adresi ID'sini teslimat adresi ID'si ile aynı yap
        selectedBillingAddressId: action.payload ? state.selectedShippingAddressId : state.selectedBillingAddressId
      };
      
    default:
      return state;
  }
};

export default addressReducer; 