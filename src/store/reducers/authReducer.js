import {
  SET_LOGIN,
  SET_LOGOUT,
  ERROR_LOGIN,
  RESET_USER_DATA,
  SET_LOADING,
  SET_REG_MESSGAE,
  RESET_ERROR_LOGIN_DATA,
} from "../actions/types";
import cookies from "js-cookie";
const initialState = {
  loading: false,
  loggedIn: cookies.get("token") ? true : false,
  token: cookies.get("token"),
  user: JSON.parse(cookies.get("user") ? cookies.get("user") : "{}"),
  errors: {},
  regMsg: null,
};

const authReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_REG_MESSGAE:
      return {
        ...state,
        regMsg: actions.payload,
      };
    case SET_LOGIN:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        user: actions.payload.participant,
        token: actions.payload.access_token,
        errors: {},
        regMsg: null,
      };

    case SET_LOGOUT:
      return { ...state, loggedIn: false, user: {} };

    case RESET_USER_DATA:
      return {
        ...state,
        loggedIn: false,
        user: {},
        token: null,
        errors: {},
        regMsg: null,
      };

    case ERROR_LOGIN:
      return {
        ...state,
        errors: actions.payload,
        loading: false,
        regMsg: null,
      };
    case RESET_ERROR_LOGIN_DATA:
      return {
        ...state,
        errors: {},
        loading: false,
        regMsg: null,
      };

    default:
      return state;
  }
};

export default authReducer;
