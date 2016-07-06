// Actions
import axios from 'axios'

const API_URL = 'http://localhost:3000';
const API_ENTRY = `${API_URL}/api/food/entry`;

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


export function addEntryRequest(entry) {
  // return dispatch => {
  //   dispatch(addEntry(entry));

  //   return fetch(API_ENTRY, {
  //     method: 'POST',
  //     body: JSON.stringify({entry}),
  //     headers: {
  //       "X-Custom-Header": "yes",
  //       "Access-Control-Allow-Origin": "*"
  //     }
  //   }).then(response => {
  //     response.JSON();
  //   }).catch(err => {
  //     console.error(err);
  //   });
  // }

  // console.log('entry: ', entry);

  // const request = axios({
  //   method: 'post',
  //   url: API_ENTRY,
  //   data: entry,
  //   contentType: 'application/json'
  // });

  // return {
  //   type: ADD_ENTRY_REQUEST,
  //   payload: request
  // }

  return dispatch => {
    dispatch(addEntry(entry));

    return axios({
      method: 'POST',
      url: API_ENTRY,
      data: entry,
      contentType: 'application/json'
    })
    .then(response => dispatch(addEntrySuccess(response.config.data)))
    .catch(response => console.error('le error:', response));
  };
}

function addEntry(entry) {
  return {
    type: ADD_ENTRY_REQUEST,
    payload: entry
  };
}

function addEntrySuccess(entry) {
  return {
    type: ADD_ENTRY_SUCCESS,
    payload: entry
  }
}

export const GET_ENTRIES_REQUEST = 'GET_ENTRIES_REQUEST';
export const GET_ENTRIES_SUCCESS = 'GET_ENTRIES_SUCCESS';
export const GET_ENTRIES_FAILURE = 'GET_ENTRIES_FAILURE';

export function getEntriesRequest(subcategory) {
  return dispatch => {
    dispatch(getEntries(subcategory));

    return axios({
      method: 'GET',
      url: API_ENTRY,
      params: {
        subcatID: subcategory
      }
    })
    .then(response => dispatch(getEntriesSuccess(response.data)))
    .catch(response => console.error('le error:', response));
  };
}

function getEntries(subcategory) {
  return {
    type: GET_ENTRIES_REQUEST,
    payload: subcategory
  }
}

function getEntriesSuccess(entries) {
  return {
    type: GET_ENTRIES_SUCCESS,
    payload: entries
  }
}

// export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES';
// function receiveEntries(subcategory, json) {
//   return {
//     type: RECEIVE_ENTRIES,
//     payload: subcategory,
//     entries: json.data.map(entry => entry.data)
//   };
// }