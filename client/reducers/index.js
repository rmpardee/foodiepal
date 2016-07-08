import * as A from '../actions';
import { combineReducers } from 'redux';

import { reducer as ModalReducer } from 'react-redux-modal';
import Current from './reducer-current';
import Categories from './reducer-category';
import Subcategories from './reducer-subcategory';
import Entry from './reducer-entry';

export default combineReducers({
  current: Current,
  modals: ModalReducer,
  categories: Categories,
  subcategories: Subcategories,
  entries: Entry
});