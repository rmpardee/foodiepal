import axios from 'axios';
import {
  setCurrentUser,
  removeCurrentUser,
  removeCurrentCategory,
  removeCurrentSubcategory
} from './index.js';
import { push } from 'react-router-redux';

// Deployed version:
const API_USER = `/api/user/`;
// Local version:
// const API_USER = `http://localhost:3000/api/user/`;
const API_ADD_USER = `${API_USER}signup`;
const API_LOGIN_USER = `${API_USER}login`;
const API_FORGOTPW_USER = `${API_USER}forgotPassword`;
const API_RESETPW_USER = `${API_USER}resetPassword`;


// SIGN-UP
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
    .catch(response => {
      console.error('user POST error:', response);
      reject();
    });
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


// LOGIN
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export function loginRequest(user, dispatch) {
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
    .catch(response => {
      console.error('login POST error: ', response);
      reject();
    });
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

// LOGOUT
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
    localStorage.removeItem('gourmandState');
  };
}

function logout() {
  return {
    type: LOGOUT_REQUEST
  };
}

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  };
}

// FORGOT PASSWORD (send email to user to initiate reset password)
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';

export function forgotPasswordRequest(user) {
  return dispatch => {
    dispatch(forgotPassword(user));
    return axios({
      method: 'POST',
      url: API_FORGOTPW_USER,
      data: user
    })
    .then(response => {
      if (response.status !== 201) {
        dispatch(forgotPasswordFailure(response.data));
      } else {
        dispatch(forgotPasswordSuccess(response.data));
      }
    })
    .catch(response => console.error('forgot password POST error:', response));
  };
}

function forgotPassword(user) {
  return {
    type: FORGOT_PASSWORD_REQUEST,
    payload: user
  };
}

function forgotPasswordSuccess(user) {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    payload: user
  };
}

function forgotPasswordFailure(user) {
  return {
    type: FORGOT_PASSWORD_FAILURE,
    payload: user
  };
}


// RESET PASSWORD (update user's password in database)
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

// we need a global variable that resetPasswordRequest can access
let resetpwUserID;
// export a function that we can call as a prop on the resetpw component, passing in the userID from the URL where we have access to it (in the component itself on mount)
export function setUserID(userID) {
  resetpwUserID = userID;
}

export function resetPasswordRequest(user, dispatch) {
  // add the userID we got from the forgot pw email URL to the user we send in our POST
  user.userID = resetpwUserID;
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
    .catch(response => {
      console.error('reset password POST error:', response);
      reject();
    });
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