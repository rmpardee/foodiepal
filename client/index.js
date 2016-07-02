import React, { Component } from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

const mount = document.getElementById('app');



let initialState = {
  user: {
    name: '',
    categories: {
      cheese: {
        brie: {
          notes: ''
        }
      }
    }
  }
};

function foodiePal(state = initialState, action) {
  switch (action.type) {
    case 'ADD_NOTES':
      var entryWithNotes = state;
      state.user.categories.cheese.brie.notes = 'testing';
      return entryWithNotes;
    default:
      return state;
  }
}

let store = createStore(foodiePal);

store.subscribe(() =>
  console.log(store.getState())
);

store.dispatch({ type: 'ADD_NOTES' });

ReactDOM.render(
  <Provider store={store} key="provider">
    { component }
  </Provider>
  , mount
);