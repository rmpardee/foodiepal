import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';

import SignUp from '../components/signup.js';
import { addUserRequest } from '../actions/auth.js';
import { asyncValidate, resetValidateUserFields } from '../actions/auth.js';



//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;

  if (!values.email || values.email.trim() === '') {
    errors.email = 'Email is required!';
    hasErrors = true;
  }

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address!';
    hasErrors = true;
  }

  if (!values.password || values.password.trim() === '') {
    errors.password = 'Password is required!';
    hasErrors = true;
  }

  if (!values.confirmPassword || values.confirmPassword.trim() === '') {
    errors.confirmPassword = 'Confirm password is required!';
    hasErrors = true;
  }

  if (values.confirmPassword && values.confirmPassword.trim() !== '' && values.password && values.password.trim() !== '' && values.password !== values.confirmPassword) {
    errors.password = 'Password and re-entered password don\'t match';
    errors.password = 'Password and re-entered password don\'t match';
    hasErrors = true;
  }
  
  return hasErrors && errors;
} 


function mapDispatchToProps(dispatch) {
  return {
    signUpUser: addUserRequest
    // ,
    // resetMe: () => {
    //   console.log("resetMe in user container");
    //   return bindActionCreators({ resetValidateUserFields }, dispatch);
    //   // dispatch(resetValidateUserFields);
    // }
  };
};

function mapStateToProps(state, ownProps) {
  return { 
    user: state.user,
    validateFields: state.validateFields
  };
};


// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'SignUp',
  fields: ['email', 'password', 'confirmPassword'], 
  // asyncValidate,
  validate 
}, mapStateToProps, mapDispatchToProps)(SignUp);

