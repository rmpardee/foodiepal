import 'babel-polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { 
  combineReducers,
  createStore, 
  applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import thunk from 'redux-thunk';

import routes from './routes/index.js';

// import initialState from './initialstate';

import rootReducer from './reducers';

// import App from './components/app';

const mount = document.getElementById('app')
const store = applyMiddleware(thunk)(createStore)(rootReducer);

// console.log('GLOBAL INITIAL STATE:', store.getState());





render (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , mount
);

