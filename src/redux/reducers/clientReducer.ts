// Action Types
export const SET_USER = 'SET_USER';
export const SET_ROLES = 'SET_ROLES';
export const SET_THEME = 'SET_THEME';
export const SET_LANGUAGE = 'SET_LANGUAGE';

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

export type ClientActionTypes = 
  | SetUserAction 
  | SetRolesAction 
  | SetThemeAction 
  | SetLanguageAction;

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
    default:
      return state;
  }
};

export default clientReducer; 