import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class ResetPassword extends Component {

  componentWillMount() {
    // when the component loads, send the userID that's contained in the URL as a query parameter to the global variable in the auth actions
    this.props.sendUserID(location.search.slice(1));
  }

  render() {
    const {fields: { email, password, confirmPassword }, handleSubmit, submitting } = this.props;

    return (
      <div className="container">
      <h3>Reset Password</h3>
      <form onSubmit={ handleSubmit(this.props.resetPassword) }>
        <div className={`form-group ${email.touched && email.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Email*</label>
          <input type="email" className="form-control" {...email} />
          <div className="help-block">
            {email.touched ? email.error : ''}
          </div>
        </div>

        <div className={`form-group ${password.touched && password.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Password*</label>
          <input type="password" className="form-control" {...password} />
          <div className="help-block">
            {password.touched ? password.error : ''}
          </div>
        </div>
        <div className={`form-group ${confirmPassword.touched && confirmPassword.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Confirm Password*</label>
          <input type="password" className="form-control" {...confirmPassword} />
          <div className="help-block">
            {confirmPassword.touched ? confirmPassword.error : ''}
          </div>
        </div>
        <button type="submit" disabled={submitting} >Submit</button>
        <Link to="/">Cancel</Link>
      </form>
      </div>
    );
  }
}

ResetPassword.contextTypes = {
  router: PropTypes.object
}