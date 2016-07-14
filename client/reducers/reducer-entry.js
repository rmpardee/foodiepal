import {
  ADD_ENTRY_REQUEST,
  ADD_ENTRY_SUCCESS,
  GET_ENTRIES_REQUEST,
  GET_ENTRIES_SUCCESS
 } from '../actions';

// const INITIAL_STATE = [];
const INITIAL_STATE = {
  isFetching: false,
  data: []
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case GET_ENTRIES_REQUEST:
    // return state;
    return Object.assign({}, state, {
      isFetching: true
    });

  case GET_ENTRIES_SUCCESS:
    // return action.payload;
    return Object.assign({}, state, {
      isFetching: false,
      data: action.payload
    })

  case ADD_ENTRY_REQUEST:
    // return action.payload;
    return state;

  case ADD_ENTRY_SUCCESS:
    // return state;
    return Object.assign({}, state, {
      data: action.payload
    })


  default:
    return state;
  }
}