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
        <div className='content'>
          <h2 className='page-title'>Welcome back!</h2>
          <p>Login below to log your tastings.</p>
          <div className='form-container'>
            <form onSubmit={ handleSubmit(this.props.loginUser) }>
              <div className={`form-group ${email.touched && email.invalid ? 'has-error' : ''}`}>
                <label className="control-label" htmlFor="email">Email</label>
                <input type="email" id="email" tabIndex="1" autofocus="autofocus" className="form-control" {...email} />
                <div className={ `help-block ${ email.touched && email.invalid ? 'active' : ''}` }>
                  {email.touched ? email.error : ''}
                </div>
              </div>

              <div className={`form-group ${password.touched && password.invalid ? 'has-error' : ''}`}>
                <label className="control-label" htmlFor="password">Password</label> (<a href='#' onClick={ this.openRequestForm.bind(this) }>Forgot password?</a>)
                <input type="password" id="password" tabIndex="2" className="form-control" {...password} />
                <div className={ `help-block ${ password.touched && password.invalid ? 'active' : ''}` }>
                  {password.touched ? password.error : ''}
                </div>
              </div>
              <button type="submit" disabled={submitting} className='btn btn-primary'>Log In</button>
            </form>
          </div>
          <p>New to Gourmand? <Link to='/signup'>Sign Up</Link></p>
        </div>
      </div>
    );
  }
}

Login.contextTypes = {
  router: PropTypes.object
}