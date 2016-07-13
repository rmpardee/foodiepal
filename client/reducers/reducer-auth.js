import {
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  VALIDATE_USER_FIELDS,
  VALIDATE_USER_FIELDS_SUCCESS,
  VALIDATE_USER_FIELDS_FAILURE,
  RESET_VALIDATE_USER_FIELDS
} from '../actions/auth';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  // console.log("action inside reducer-auth: ", action);
  switch(action.type) {

  case ADD_USER_REQUEST:
    return state;
  case ADD_USER_SUCCESS:
    return action.payload;

  case VALIDATE_USER_FIELDS:
    return state;
  case VALIDATE_USER_FIELDS_SUCCESS:
    return action.payload;
  case RESET_VALIDATE_USER_FIELDS:
    return state;
  

  default:
    return state;
  }
}