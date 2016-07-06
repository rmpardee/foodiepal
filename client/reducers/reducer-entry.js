import {
  ADD_ENTRY_REQUEST,
  ADD_ENTRY_SUCCESS,
  GET_ENTRIES_SUCCESS
 } from '../actions';

const INITIAL_STATE = []

export default function(state = INITIAL_STATE, action) {
  console.log('action received: ', action);
  switch(action.type) {
  case ADD_ENTRY_REQUEST:
    return action.payload;

  case ADD_ENTRY_SUCCESS:
    return action.payload;

  case GET_ENTRIES_SUCCESS:
    // return Object.assign({}, state, {
    //   entries: action.payload
    // });
    return action.payload;

  default:
    return state;
  }
}