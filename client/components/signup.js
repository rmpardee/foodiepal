import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class SignUp extends Component {

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    // console.log("this.props in user component: ", this.props);
    // this.props.resetMe();
  }

  // asyncValidating, 

  // <div className="help-block">
  //   {asyncValidating === 'email' ? 'validating..': ''}
  // </div>

  render() {
    const {fields: { email, password, confirmPassword }, handleSubmit, submitting } = this.props;

    return (
      <div className="container">
        <div className='content-alt'>
          <h2 className='page-title'>Get Started</h2>
          <p className="subheading">Sign up and start logging your tastings!</p>
          <div className='form-container'>
            <form onSubmit={ handleSubmit(this.props.signUpUser) } noValidate>
              <div className={ `form-group ${email.touched && email.invalid ? 'has-error' : ''}` }>
                <label className="control-label" htmlFor="email">Email</label>
                <input type="email" id="email" autoFocus placeholder="Email" className="form-control" {...email} />
                <div className={ `help-block ${ email.touched && email.invalid ? 'active' : ''}` }>
                  { email.touched ? email.error : '' }
                </div>
              </div>

              <div className={`form-group ${password.touched && password.invalid ? 'has-error' : ''}`}>
                <label className="control-label" htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter password" className="form-control" {...password} />
                <div className={ `help-block ${ password.touched && password.invalid ? 'active' : ''}` }>
                  { password.touched ? password.error : '' }
                </div>
              </div>
              <div className={ `form-group ${confirmPassword.touched && confirmPassword.invalid ? 'has-error' : ''}` }>
                <label className="control-label" htmlFor="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" placeholder="Confirm password" className="form-control" {...confirmPassword} />
                <div className={ `help-block ${ confirmPassword.touched && confirmPassword.invalid ? 'active' : ''}` }>
                  { confirmPassword.touched ? confirmPassword.error : '' }
                </div>
              </div>
              <button type="submit" disabled={email.invalid || password.invalid || confirmPassword.invalid || submitting} className="btn btn-primary">Sign Up</button>
            </form>
          </div>
          <p className='subheading'>Already have an account? <Link to='/login'>Login</Link></p>
        </div>
      </div>
    );
  }
}

SignUp.contextTypes = {
  router: PropTypes.object
}