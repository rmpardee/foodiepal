import 'babel-polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { 
  combineReducers,
  createStore, 
  applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, useRouterHistory } from 'react-router';
import thunk from 'redux-thunk';
import { saveState, loadState } from './middleware/index.js';
import routes from './routes/index.js';
import rootReducer from './reducers';
import { createHistory } from 'history';

const mount = document.getElementById('app');
const browserHistory = useRouterHistory(createHistory)({
  basename: "/"
});
const persistedState = loadState();
const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));
// save the state in localStorage everytime it changes
store.subscribe( () => saveState(store.getState()));

render (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , mount
);

