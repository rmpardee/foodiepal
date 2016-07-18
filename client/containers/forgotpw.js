import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';

import ForgotPassword from '../components/forgotpw.js';
import { resetPasswordRequest } from '../actions/auth.js';
import { asyncValidate, resetValidateUserFields } from '../actions/auth.js';



//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;

  if (!values.email || values.email.trim() === '') {
    errors.email = 'Enter email';
    hasErrors = true;
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'Enter password';
    hasErrors = true;
  }
  if (!values.confirmPassword || values.confirmPassword.trim() === '') {
    errors.confirmPassword = 'Re-enter password';
    hasErrors = true;
  }

  if (values.confirmPassword && values.confirmPassword.trim() !== '' && values.password && values.password.trim() !== '' && values.password !== values.confirmPassword) {
    errors.password = 'Password And Re-entered Password don\'t match';
    errors.password = 'Password And Re-entered Password don\'t match';
    hasErrors = true;
  }
  
  return hasErrors && errors;
} 


function mapDispatchToProps(dispatch) {
  return {
    resetPassword: resetPasswordRequest
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
  form: 'User',
  fields: ['email', 'password', 'confirmPassword'], 
  // asyncValidate,
  validate 
}, mapStateToProps, mapDispatchToProps)(ForgotPassword);

