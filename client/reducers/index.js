import * as A from '../actions';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { reducer as ModalReducer } from 'react-redux-modal';
import Current from './reducer-current';
import Categories from './reducer-category';
import Subcategories from './reducer-subcategory';
import Entry from './reducer-entry';
import Auth from './reducer-auth';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  current: Current,
  modals: ModalReducer,
  categories: Categories,
  subcategories: Subcategories,
  entries: Entry,
  auth: Auth,
  form: formReducer,
  routing: routerReducer
});