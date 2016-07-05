import {
  ADD_ENTRY_REQUEST,
  REQUEST_ENTRIES
 } from '../actions';

const INITIAL_STATE = [
  {
    id: 'ENTRY001',
    type: 'brie a la tga',
    notes: 'so good',
    rating: 5,
    ancestors: {
      user: 1,
      category: 'C1',
      subcategory: 'S1'
    },
    parent: 'S1'
  }
]

export default function(state = INITIAL_STATE, action) {
  console.log('action received: ', action);
  switch(action.type) {
  case ADD_ENTRY_REQUEST:
    return action.payload;

  case REQUEST_ENTRIES:
    return Object.assign({}, state, {
      entries: action.payload
    });
  default:
    return state;
  }
}