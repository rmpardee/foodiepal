import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';

import Login from '../components/login.js';
import { loginRequest } from '../actions/auth.js';



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
  
  return hasErrors && errors;
} 


function mapDispatchToProps(dispatch) {
  return {
    loginUser: loginRequest
  };
};

function mapStateToProps(state, ownProps) {
  return { 
    user: state.user,
    validateFields: state.validateFields
  };
};


export default reduxForm({
  form: 'Login',
  fields: ['email', 'password'],
  validate 
}, mapStateToProps, mapDispatchToProps)(Login);

