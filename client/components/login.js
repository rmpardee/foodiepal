import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import RequestPasswordReset from '../containers/request-password-reset';
import { modal } from 'react-redux-modal';

export default class Login extends Component {

  openRequestForm(e) {
    e.preventDefault();
    
    modal.add(RequestPasswordReset, {
      title: 'Forgot your password?',
      closeOnOutsideClick: true,
      hideCloseButton: false
    });
  }

  render() {
    const {fields: { email, password }, handleSubmit, submitting } = this.props;

    return (
      <div className="container">
      <form onSubmit={ handleSubmit(this.props.loginUser) }>
        <div className={`form-group ${email.touched && email.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Email</label>
          <input type="email" className="form-control" {...email} />
          <div className="help-block">
            {email.touched ? email.error : ''}
          </div>
        </div>

        <div className={`form-group ${password.touched && password.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Password</label>
          <input type="password" className="form-control" {...password} />
          <div className="help-block">
            {password.touched ? password.error : ''}
          </div>
          <a href='#' onClick={ this.openRequestForm.bind(this) }>Forgot password?</a>
        </div>
        <button type="submit" disabled={submitting} >Submit</button>
        <Link to="/">Cancel</Link>
      </form>
      </div>
    );
  }
}

Login.contextTypes = {
  router: PropTypes.object
}