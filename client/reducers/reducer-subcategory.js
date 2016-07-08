import {
  GET_SUBCATEGORIES_REQUEST,
  GET_SUBCATEGORIES_SUCCESS,
  GET_SUBCATEGORIES_FAILURE,
  ADD_SUBCATEGORY_REQUEST,
  ADD_SUBCATEGORY_SUCCESS
} from '../actions';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case GET_SUBCATEGORIES_REQUEST:
    return state;
  case GET_SUBCATEGORIES_SUCCESS:
    return action.payload;
  case ADD_SUBCATEGORY_REQUEST:
    return state;
  case ADD_SUBCATEGORY_SUCCESS:
    return action.payload;
  default:
    return state;
  }
}