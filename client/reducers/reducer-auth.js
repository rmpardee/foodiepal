import {
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  REQUEST_PASSWORD_RESET_REQUEST,
  REQUEST_PASSWORD_RESET_SUCCESS,
  REQUEST_PASSWORD_RESET_FAILURE
} from '../actions/auth';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  // console.log("action inside reducer-auth: ", action);
  switch(action.type) {

  case ADD_USER_REQUEST:
    return state;
  case ADD_USER_SUCCESS:
    return action.payload;

  case LOGIN_REQUEST:
    return state;
  case LOGIN_SUCCESS:
    return action.payload;
  case LOGIN_FAILURE:
    return state;

  case REQUEST_PASSWORD_RESET_REQUEST:
    return state;
  
  case REQUEST_PASSWORD_RESET_SUCCESS:
    return state;

  case REQUEST_PASSWORD_RESET_FAILURE:
    return state;

  default:
    return state;
  }
}