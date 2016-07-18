import axios from 'axios';
import {
  setCurrentUser,
  removeCurrentUser,
  removeCurrentCategory,
  removeCurrentSubcategory
} from './index.js';
import { push } from 'react-router-redux';

const API_USER = `https://gourmandapp.herokuapp.com/api/user/`;
//Local version:
// const API_USER = `http://localhost:3000/api/user/`;
const API_ADD_USER = `${API_USER}signup`;
const API_LOGIN_USER = `${API_USER}login`;
const API_RESETPW_USER = `${API_USER}forgotpassword`;
// const API_VALIDATE = `${API_URL}/users/validate/fields`;
//note: we cant have /users/validateFields because it'll match /users/:id path!

const API_REQUEST_PASSWORD_RESET = `${API_USER}forgotpassword`;

//Add user (sign up)
export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';

export function addUserRequest(user, dispatch) {
  return new Promise ((reject, resolve) => {
  //   dispatch(addUser());
    return axios({
      method: 'POST',
      url: API_ADD_USER,
      data: user
    })
    .then(response => {
      if (response.status !== 201) {
        dispatch(addUserFailure(response.data));
        reject(response.data);
      } else {
        dispatch(addUserSuccess(response.data));
        dispatch(push('/u'));
        resolve();
      }
    })
    .catch(response => console.error('user POST error:', response));
  });
}

export function addUser() {
  console.log("addUser called");
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
// export const VALIDATE_USER_FIELDS = 'VALIDATE_USER_FIELDS';
// export const VALIDATE_USER_FIELDS_SUCCESS = 'VALIDATE_USER_FIELDS_SUCCESS';
// export const VALIDATE_USER_FIELDS_FAILURE = 'VALIDATE_USER_FIELDS_FAILURE';
// export const RESET_VALIDATE_USER_FIELDS = 'RESET_VALIDATE_USER_FIELDS';

// export function asyncValidate(values) {
//   return dispatch => {
//     dispatch(validateUserFields(values));
//     return axios({
//       method: 'POST',
//       url: API_VALIDATE,
//       data: values
//     })
//     .then((response) => {
//       let data = response.payload.data;
//       if (response.payload.status !== 200 || data.username || data.email) {
//         dispatch(validateUserFieldsFailure(response.payload));
//         reject(data);
//       } else {
//         dispatch(validateUserFieldsSuccess(response.payload));
//         resolve();
//       }
//     });
//   };
// }

// function validateUserFields(values) {
//   return {
//     type: VALIDATE_USER_FIELDS,
//     payload: request
//   };
// }

// function validateUserFieldsSuccess() {
//   return {
//     type: VALIDATE_USER_FIELDS_SUCCESS
//   };
// }

// function validateUserFieldsFailure(error) {
//   return {
//     type: VALIDATE_USER_FIELDS_FAILURE,
//     payload: error
//   };
// }

// export function resetValidateUserFields() {
//   return {
//     type: RESET_VALIDATE_USER_FIELDS
//   };
// }

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

export function loginRequest(user, dispatch) {
  console.log("inside loginRequest");
  return new Promise ((reject, resolve) => {
  //   dispatch(login());
    return axios({
      method: 'POST',
      url: API_LOGIN_USER,
      data: user
    })
    .then(response => {
      if (response.status !== 200) {
        dispatch(loginFailure(response.data));
        reject(response.data);
      } else {
        localStorage.setItem('jwtToken', response.data.token);
        dispatch(setCurrentUser(response.data.user));
        dispatch(loginSuccess(response.data));
        dispatch(push('/u'));
        resolve();
      }
    })
    .catch(response => console.error('login POST error: ', response));
  });
}

export function login() {
  return {
    type: LOGIN_REQUEST
  };
}

function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: user
  };
}

function loginFailure(user) {
  return {
    type: LOGIN_FAILURE,
    payload: user
  };
}


export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export function logoutRequest() {
  return dispatch => {
    dispatch(logout());
    localStorage.removeItem('jwtToken');
    // Dispatch for removing current state variables?
    dispatch(removeCurrentUser());
    dispatch(removeCurrentCategory());
    dispatch(removeCurrentSubcategory());
    dispatch(logoutSuccess());
    dispatch(push('/login'));
  }
}

function logout() {
  return {
    type: LOGOUT_REQUEST
  }
}

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  }
}

//Forgot password
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export function resetPasswordRequest(user, dispatch) {
  return new Promise ((reject, resolve) => {
    return axios({
      method: 'POST',
      url: API_RESETPW_USER,
      data: user
    })
    .then(response => {
      if (response.status !== 201) {
        dispatch(resetPasswordFailure(response.data));
        reject(response.data);
      } else {
        dispatch(resetPasswordSuccess(response.data));
        dispatch(push('/u'));
        resolve();
      }
    })
    .catch(response => console.error('user POST error:', response));
  });
}

function resetPasswordSuccess(user) {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload: user
  };
}

function resetPasswordFailure(user) {
  return {
    type: RESET_PASSWORD_FAILURE,
    payload: user
  };
}
