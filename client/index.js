import React, { Component } from 'react';
import { render } from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';

import initialState from './initialstate';

import rootReducer from './reducers/';

import App from './containers/app';

const mount = document.getElementById('app')




let store = createStore(rootReducer);

store.subscribe(() =>
  console.log(store.getState())
)

store.dispatch({ type: 'ADD_ENTRY_REQUEST' });
store.dispatch({ type: 'ADD_ENTRY_SUCCESS' });
store.dispatch({ type: 'ADD_ENTRY_FAILURE' });







render (
  <Provider store={store} key="provider">
    <App />
  </Provider>
  , mount
);

