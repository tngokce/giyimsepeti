import {
  FETCH_CARDS_REQUEST,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_FAILURE,
  ADD_CARD_SUCCESS,
  UPDATE_CARD_SUCCESS,
  DELETE_CARD_SUCCESS,
  SET_SELECTED_CARD
} from '../actions/paymentActions';

// Initial State
const initialState = {
  cards: [],
  loading: false,
  error: null,
  selectedCardId: null
};

// Reducer
const paymentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_CARDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case FETCH_CARDS_SUCCESS:
      return {
        ...state,
        cards: action.payload,
        loading: false,
        error: null
      };
      
    case FETCH_CARDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    case ADD_CARD_SUCCESS:
      return {
        ...state,
        cards: [...state.cards, action.payload]
      };
      
    case UPDATE_CARD_SUCCESS:
      return {
        ...state,
        cards: state.cards.map((card: any) => 
          card.id === action.payload.id ? action.payload : card
        )
      };
      
    case DELETE_CARD_SUCCESS:
      return {
        ...state,
        cards: state.cards.filter((card: any) => card.id !== action.payload)
      };
      
    case SET_SELECTED_CARD:
      return {
        ...state,
        selectedCardId: action.payload
      };
      
    default:
      return state;
  }
};

export default paymentReducer; 