import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/app';
import AddEntry from '../containers/add-entry';
import Subcategory from '../components/subcategory';
import Detail from '../containers/detail';

export default (
  <Route path="/" component={App}>
    <Route path="add" component={AddEntry} />
    <Route path="subcategory" component={Subcategory} />
    <Route path=":name" component={ Detail } />
  </Route>
);