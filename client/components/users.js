import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class User extends Component {

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
      <form onSubmit={ handleSubmit(this.props.signUpUser) }>
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

User.contextTypes = {
  router: PropTypes.object
}