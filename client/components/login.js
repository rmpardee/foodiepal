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
    const {fields: { email, password }, validate, handleSubmit, submitting } = this.props;

    return (
      <div className="container">
        <div className='content-alt'>
          <h2 className='page-title'>Welcome back!</h2>
          <p>Login below to log your tastings.</p>
          <div className='form-container'>
            <form onSubmit={ handleSubmit(this.props.loginUser) } noValidate>
              <div className={`form-group ${email.touched && email.invalid ? 'has-error' : ''}`}>
                <label className="control-label" htmlFor="email">Email</label>
                <input type="email" id="email" autoFocus tabIndex="1" placeholder='Email' className="form-control" {...email} />
                <div className={ `help-block ${ email.touched && email.invalid ? 'active' : ''}` }>
                  {email.touched ? email.error : ''}
                </div>
              </div>

              <div className={`form-group ${password.touched && password.invalid ? 'has-error' : ''}`}>
                <label className="control-label" htmlFor="password">Password</label> (<a href='#' onClick={ this.openRequestForm.bind(this) }>Forgot password?</a>)
                <input type="password" id="password" tabIndex="2" placeholder='Password' className="form-control" {...password} />
                <div className={ `help-block ${ password.touched && password.invalid ? 'active' : ''}` }>
                  {password.touched ? password.error : ''}
                </div>
              </div>
              <button type="submit" disabled={email.invalid || password.invalid || submitting} className='btn btn-primary'>Log In</button>
            </form>
          </div>
          <p className='subheading'>New to Gourmand? <Link to='/signup'>Sign Up</Link></p>
        </div>
      </div>
    );
  }
}

Login.contextTypes = {
  router: PropTypes.object
}