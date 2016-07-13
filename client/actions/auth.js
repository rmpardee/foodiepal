import axios from 'axios';

const API_URL = 'http://localhost:3000';
const API_USER = `${API_URL}/api/user/`;
const API_VALIDATE = `${API_URL}/users/validate/fields`;
//note: we cant have /users/validateFields because it'll match /users/:id path!

//Add user (sign up)
export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';

export function addUserRequest(user) {
  return dispatch => {
    dispatch(addUser());

    return axios({
      method: 'POST',
      url: API_USER,
      data: user
    })
    .then(response => {
      if (response.payload.status !== 200) {
        dispatch(addUserFailure(response.payload));
        reject(response.payload.data);
      } else {
        sessionStorage.setItem('jwtToken', response.payload.data.token);
        dispatch(addUserSuccess(response.data));
        resolve();
      }
    })
    .catch(response => console.error('user POST error:', response));
  };
}

export function addUser() {
  return {
    type: ADD_USER_REQUEST
  };
}

function addUserSuccess(user) {
  return {
    type: ADD_USER_SUCCESS,
    payload: user
  };
}

function addUserFailure(user) {
  return {
    type: ADD_USER_FAILURE,
    payload: user
  };
}


//Validation
export const VALIDATE_USER_FIELDS = 'VALIDATE_USER_FIELDS';
export const VALIDATE_USER_FIELDS_SUCCESS = 'VALIDATE_USER_FIELDS_SUCCESS';
export const VALIDATE_USER_FIELDS_FAILURE = 'VALIDATE_USER_FIELDS_FAILURE';
export const RESET_VALIDATE_USER_FIELDS = 'RESET_VALIDATE_USER_FIELDS';

export function asyncValidate(values) {
  return dispatch => {
    dispatch(validateUserFields(values));
    return axios({
      method: 'POST',
      url: API_VALIDATE,
      data: values
    })
    .then((response) => {
      let data = response.payload.data;
      if (response.payload.status !== 200 || data.username || data.email) {
        dispatch(validateUserFieldsFailure(response.payload));
        reject(data);
      } else {
        dispatch(validateUserFieldsSuccess(response.payload));
        resolve();
      }
    });
  };
}

function validateUserFields(values) {
  return {
    type: VALIDATE_USER_FIELDS,
    payload: request
  };
}

function validateUserFieldsSuccess() {
  return {
    type: VALIDATE_USER_FIELDS_SUCCESS
  };
}

function validateUserFieldsFailure(error) {
  return {
    type: VALIDATE_USER_FIELDS_FAILURE,
    payload: error
  };
}

export function resetValidateUserFields() {
  return {
    type: RESET_VALIDATE_USER_FIELDS
  };
}

//Get current user(me) from token in localStorage
export const ME_FROM_TOKEN = 'ME_FROM_TOKEN';
export const ME_FROM_TOKEN_SUCCESS = 'ME_FROM_TOKEN_SUCCESS';
export const ME_FROM_TOKEN_FAILURE = 'ME_FROM_TOKEN_FAILURE';
export const RESET_TOKEN = 'RESET_TOKEN';

export function meFromToken(tokenFromStorage) {
  //check if the token is still valid, if so, get me from the server
  const request = axios.get(`${API_URL}/me/from/token?token=${tokenFromStorage}`);
  return {
    type: ME_FROM_TOKEN,
    payload: request
  };
}

export function meFromTokenSuccess(currentUser) {
  return {
    type: ME_FROM_TOKEN_SUCCESS,
    payload: currentUser
  };
}

export function meFromTokenFailure(error) {
  return {
    type: ME_FROM_TOKEN_FAILURE,
    payload: error
  };
}

export function resetToken() {//used for logout
  return {
    type: RESET_TOKEN
  };
}


export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
