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
import { saveState, loadState } from './middleware/index.js';
import routes from './routes/index.js';
import rootReducer from './reducers';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

const mount = document.getElementById('app');

// const browserHistory = useRouterHistory(createHistory)({
//   basename: "/"
// });

const persistedState = loadState();
export const store = createStore(rootReducer, persistedState, applyMiddleware(thunk, routerMiddleware(browserHistory)));
// save the state in localStorage everytime it changes
store.subscribe( () => saveState(store.getState()));

const history = syncHistoryWithStore(browserHistory, store, { adjustUrlOnReplay: false });

render (
  <Provider store={ store }>
    <Router history={ history } routes={ routes } />
  </Provider>
  , mount
);

