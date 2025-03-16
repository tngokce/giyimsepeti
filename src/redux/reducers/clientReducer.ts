// Action Types
export const SET_USER = 'SET_USER';
export const SET_ROLES = 'SET_ROLES';
export const SET_THEME = 'SET_THEME';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_ADDRESS_LIST = 'SET_ADDRESS_LIST';
export const ADD_ADDRESS = 'ADD_ADDRESS';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
export const DELETE_ADDRESS = 'DELETE_ADDRESS';

// Action Interfaces
interface SetUserAction {
  type: typeof SET_USER;
  payload: any;
}

interface SetRolesAction {
  type: typeof SET_ROLES;
  payload: any[];
}

interface SetThemeAction {
  type: typeof SET_THEME;
  payload: string;
}

interface SetLanguageAction {
  type: typeof SET_LANGUAGE;
  payload: string;
}

interface SetAddressListAction {
  type: typeof SET_ADDRESS_LIST;
  payload: any[];
}

interface AddAddressAction {
  type: typeof ADD_ADDRESS;
  payload: any;
}

interface UpdateAddressAction {
  type: typeof UPDATE_ADDRESS;
  payload: any;
}

interface DeleteAddressAction {
  type: typeof DELETE_ADDRESS;
  payload: number;
}

export type ClientActionTypes = 
  | SetUserAction 
  | SetRolesAction 
  | SetThemeAction 
  | SetLanguageAction
  | SetAddressListAction
  | AddAddressAction
  | UpdateAddressAction
  | DeleteAddressAction;

// Initial State
interface ClientState {
  user: any;
  addressList: any[];
  creditCards: any[];
  roles: any[];
  theme: string;
  language: string;
}

const initialState: ClientState = {
  user: null,
  addressList: [],
  creditCards: [],
  roles: [],
  theme: 'light',
  language: 'tr'
};

// Reducer
const clientReducer = (state = initialState, action: ClientActionTypes): ClientState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case SET_ROLES:
      return {
        ...state,
        roles: action.payload
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    case SET_ADDRESS_LIST:
      return {
        ...state,
        addressList: action.payload
      };
    case ADD_ADDRESS:
      return {
        ...state,
        addressList: [...state.addressList, action.payload]
      };
    case UPDATE_ADDRESS:
      return {
        ...state,
        addressList: state.addressList.map(address => 
          address.id === action.payload.id ? action.payload : address
        )
      };
    case DELETE_ADDRESS:
      return {
        ...state,
        addressList: state.addressList.filter(address => address.id !== action.payload)
      };
    default:
      return state;
  }
};

export default clientReducer; 