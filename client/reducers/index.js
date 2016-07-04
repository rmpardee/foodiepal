import {
ADD_ENTRY_REQUEST, ADD_ENTRY_SUCCESS, ADD_ENTRY_FAILURE
} from '../actions';
import { combineReducers } from 'redux';

import initialState from '../initialstate';

function foodiePal(state = initialState(), action) {
  switch (action.type) {
    case ADD_ENTRY_REQUEST:
      console.log('ADD_ENTRY_REQUEST action');
    case ADD_ENTRY_SUCCESS:
      console.log('ADD_ENTRY_SUCCESS action');
    case ADD_ENTRY_FAILURE:
      console.log('ADD_ENTRY_FAILURE action');
    default:
      return state
  }
}

export default combineReducers({
  foodiePal
});