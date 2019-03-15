import * as types from '../constants/actionTypes';
import { debug } from 'util';

const initialState = {
  loginError: '',
  signupError: '',
  isLoggedIn: false,
  email: '',
  fullName: '',
  password: '',
  username: '',
  userInfo: {},
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.LOGIN:

      return {
        ...state,
        userInfo: action.payload.userInfo,
        isLoggedIn: true,
        username: action.payload.userInfo.username,
        password: '',
      }

    case types.LOGIN_FAILED:
      return {
        ...state,
        // username: '',
        password: '',
        loginError: action.payload,
      }
    
    case types.SIGNUP_FAILED:
      return {
        ...state,
        signupError: action.payload,
      }

    case types.ENTER_EMAIL:
      return {
        ...state,
        email: action.payload,
      }

    case types.ENTER_FULLNAME:
      return {
        ...state,
        fullName: action.payload,
      }

    case types.ENTER_PASSWORD:
      return {
        ...state,
        password: action.payload,
      }

    case types.ENTER_USERNAME:
      return {
        ...state,
        username: action.payload,
      }

    case types.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      }
    
    case types.DELETE_SNIPPET: 
      return {
        ...state,
      }

    default:
      return state;
  }
}

export default userReducer;