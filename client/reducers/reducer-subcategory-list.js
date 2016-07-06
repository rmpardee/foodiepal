
import { REQUEST_SUBCATEGORIES } from '../actions';

// import INITIAL_STATE from '../initialstate';

// Subcategory initial state
const INITIAL_STATE = [{
  id: 'S1',
  name: 'brie',
  ancestors: {
    user: 1,
    category: 'C1'
  },
  parent: 'C1'
}]

export default function(state = INITIAL_STATE, action) {
  console.log('action received: ', action);
  switch(action.type) {
  case REQUEST_SUBCATEGORIES:
    // return { ...state, subcategories: action.payload };
    return Object.assign({}, state, {
        subcategories: action.payload
      });
  default:
    return state;
  }
}