// Actions

import fetch from 'isomorphic-fetch';

const API_URL = 'http://localhost:8080';
const API_FOOD = `${API_URL}/api/food/`;

// Authentication
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';


export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';


// Subcategory
export const REQUEST_SUBCATEGORIES = 'REQUEST_SUBCATEGORIES';
export function requestSubcategories() {
  return {
    type: REQUEST_SUBCATEGORIES,
    payload: subcategories
  };
}


// Entry
export const ADD_ENTRY_REQUEST = 'ADD_ENTRY_REQUEST';
export const ADD_ENTRY_SUCCESS = 'ADD_ENTRY_SUCCESS';
export const ADD_ENTRY_FAILURE = 'ADD_ENTRY_FAILURE';

export function addEntry(entry) {
  return {
    type: ADD_ENTRY_REQUEST,
    payload: entry
  };
}

export function addEntryRequest(entry) {
  return dispatch => {
    dispatch(addEntry(entry));

    return fetch(API_FOOD, {
      method: 'POST',
      body: JSON.stringify({entry})
    }).then(response => {
      response.JSON();
    }).catch(err => {
      console.error(err);
    });
  }
}

export const REQUEST_ENTRIES = 'REQUEST_ENTRIES';
export function requestEntries(subcategory) {
  return {
    type: REQUEST_ENTRIES,
    payload: subcategory
  }
}

export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES';
function receiveEntries(subcategory, json) {
  return {
    type: RECEIVE_ENTRIES,
    payload: subcategory,
    entries: json.data.map(entry => entry.data)
  };
}