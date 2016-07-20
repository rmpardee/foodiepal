import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/app'; // Root layout

import Welcome from '../components/welcome';
import Public from '../components/public';
import SignUp from '../containers/signup';
import Login from '../containers/login';
import ForgotPassword from '../containers/forgotpw';

import Main from '../components/main'; // Main (user) layout
import Categories from '../components/categories';
import Subcategories from '../containers/subcategories';
import Detail from '../containers/detail';
// import AddEntry from '../containers/add-entry';

function requireAuth(nextState, replace, callback) {
  if (!localStorage.getItem('jwtToken')) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
  callback();
}

export default (
  <Route component={ App }>
    <Route path="/">
      <IndexRoute component={ Welcome }/>
      <Route component={ Public }>
        <Route path="login" component={ Login } />
        <Route path="signup" component={ SignUp } />
        <Route path="forgotpassword" component={ ForgotPassword } />
      </Route>
    </Route>
    <Route path="/u" component={ Main } onEnter={ requireAuth }>
      <IndexRoute component={ Categories } />
      <Route path=":name">
        <IndexRoute component={ Subcategories } />
        <Route path=":name" component={ Detail } />
      </Route>
    </Route>
  </Route>
);