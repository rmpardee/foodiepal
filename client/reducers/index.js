import * as A from '../actions';
import { combineReducers } from 'redux';

import { reducer as ModalReducer } from 'react-redux-modal';
import Entry from './reducer-entry';
import Subcategories from './reducer-subcategory-list';

// import INITIAL_STATE from '../initialstate';

export default combineReducers({
  modals: ModalReducer,
  subcategories: Subcategories,
  entries: Entry
});