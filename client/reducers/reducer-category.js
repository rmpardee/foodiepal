import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE
} from '../actions';

// import INITIAL_STATE from '../initialstate';

// Subcategory initial state
// const INITIAL_STATE = [{
//   id: 'S1',
//   name: 'brie',
//   ancestors: {
//     user: 1,
//     category: 'C1'
//   },
//   parent: 'C1'
// }]
const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  console.log('action received: ', action);
  switch(action.type) {
  case GET_CATEGORIES_REQUEST:
    return state;
  case GET_CATEGORIES_SUCCESS:
    return action.payload;
  default:
    return state;
  }
}