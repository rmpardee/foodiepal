// Actions
import axios from 'axios'

const API_URL = 'http://localhost:3000';
const API_CATEGORY = `${API_URL}/api/food/category`;
const API_SUBCATEGORY = `${API_URL}/api/food/subcategory`;
const API_ENTRY = `${API_URL}/api/food/entry`;
const API_USER = `${API_URL}/api/user`;

// Authentication
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';


export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

// Category
export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE';
export function getCategoriesRequest(userID) {
  return dispatch => {
    dispatch(getCategories());

    return axios({
      method: 'GET',
      url: API_CATEGORY,
      params: {
        userID: userID
      }
    })
    .then(response => dispatch(getCategoriesSuccess(response.data)))
    .catch(response => console.error('categories GET error:', response));
  };
}

function getCategories() {
  return {
    type: GET_CATEGORIES_REQUEST
  }
}

function getCategoriesSuccess(categories) {
  return {
    type: GET_CATEGORIES_SUCCESS,
    payload: categories
  }
}

// Subcategory
export const ADD_SUBCATEGORY_REQUEST = 'ADD_SUBCATEGORY_REQUEST';
export const ADD_SUBCATEGORY_SUCCESS = 'ADD_SUBCATEGORY_SUCCESS';
export const ADD_SUBCATEGORY_FAILURE = 'ADD_SUBCATEGORY_FAILURE';
export function addSubcategoryRequest(subcategory) {
  return dispatch => {
    dispatch(addSubcategory());

    return axios({
      method: 'POST',
      url: API_SUBCATEGORY,
      data: subcategory
    })
    .then(response => dispatch(addSubcategorySuccess(response.data)))
    .catch(response => console.error('subcategories POST error:', response));
  };
}

function addSubcategory() {
  return {
    type: ADD_SUBCATEGORY_REQUEST
  }
}

function addSubcategorySuccess(subcategory) {
  return {
    type: ADD_SUBCATEGORY_SUCCESS,
    payload: subcategory
  }
}

export const GET_SUBCATEGORIES_REQUEST = 'GET_SUBCATEGORIES_REQUEST';
export const GET_SUBCATEGORIES_SUCCESS = 'GET_SUBCATEGORIES_SUCCESS';
export const GET_SUBCATEGORIES_FAILURE = 'GET_SUBCATEGORIES_FAILURE';
export function getSubcategoriesRequest(categoryID) {
  return dispatch => {
    dispatch(getSubcategories());

    return axios({
      method: 'GET',
      url: API_SUBCATEGORY,
      params: {
        categoryID: categoryID
      }
    })
    .then(response => dispatch(getSubcategoriesSuccess(response.data)))
    .catch(response => console.error('subcategories GET error:', response));
  };
}

function getSubcategories() {
  return {
    type: GET_SUBCATEGORIES_REQUEST,
    // payload: subcategories
  };
}

function getSubcategoriesSuccess(subcategories) {
  return {
    type: GET_SUBCATEGORIES_SUCCESS,
    payload: subcategories
  }
}


// Entry
export const ADD_ENTRY_REQUEST = 'ADD_ENTRY_REQUEST';
export const ADD_ENTRY_SUCCESS = 'ADD_ENTRY_SUCCESS';
export const ADD_ENTRY_FAILURE = 'ADD_ENTRY_FAILURE';


export function addEntryRequest(entry) {
  return dispatch => {
    dispatch(addEntry(entry));

    return axios({
      method: 'POST',
      url: API_ENTRY,
      data: entry,
      contentType: 'application/json'
    })
    .then(response => {
      var res = JSON.parse(response.config.data);

      dispatch(addEntrySuccess(response.config.data));
      dispatch(getEntriesRequest(res.subcategoryID));
    })
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
    payload: JSON.parse(entry)
  }
}

export const GET_ENTRIES_REQUEST = 'GET_ENTRIES_REQUEST';
export const GET_ENTRIES_SUCCESS = 'GET_ENTRIES_SUCCESS';
export const GET_ENTRIES_FAILURE = 'GET_ENTRIES_FAILURE';

export function getEntriesRequest(subcategory) {
  return dispatch => {
    dispatch(getEntries());

    return axios({
      method: 'GET',
      url: API_ENTRY,
      params: {
        subcategoryID: subcategory
      }
    })
    .then(response => dispatch(getEntriesSuccess(response.data.reverse())))
    .catch(response => console.error('le error:', response));
  };
}

function getEntries() {
  return {
    type: GET_ENTRIES_REQUEST
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

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';
export const SET_CURRENT_SUBCATEGORY = 'SET_CURRENT_SUBCATEGORY';
export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const GET_CURRENT_CATEGORY = 'GET_CURRENT_CATEGORY';
export const GET_CURRENT_SUBCATEGORY = 'GET_CURRENT_SUBCATEGORY';
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
export const REMOVE_CURRENT_CATEGORY = 'REMOVE_CURRENT_CATEGORY';
export const REMOVE_CURRENT_SUBCATEGORY = 'REMOVE_CURRENT_SUBCATEGORY';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    payload: user
  }
}

export function setCurrentCategory(category) {
  return {
    type: SET_CURRENT_CATEGORY,
    payload: category
  }
}

export function setCurrentSubcategory(subcategory) {
  return {
    type: SET_CURRENT_SUBCATEGORY,
    payload: subcategory
  }
}

export function getCurrentUser() {
  return {
    type: GET_CURRENT_USER,
    // payload: user
  }
}

export function getCurrentCategory() {
  return {
    type: GET_CURRENT_CATEGORY,
    // payload: category
  }
}

export function getCurrentSubcategory() {
  return {
    type: GET_CURRENT_SUBCATEGORY,
    // payload: subcategory
  }
}