import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Welcome extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user.status === 'authenticated' && nextProps.user.user && !nextProps.user.error) {
      this.context.router.push('/');
    }
  }

  mapDispatchToProps(dispatch) {
    return {
     loadUserFromToken: () => {
       let token = sessionStorage.getItem(‘jwtToken’);
       if (!token || token === ‘’) {//if there is no token, dont bother
         return;
       }
       //fetch user from token (if server deems it’s valid token)
       dispatch(meFromToken(token))
       .then((response) => {
         if (!response.error) {
           //store token 
           sessionStorage.setItem(‘jwtToken’, response.payload.data.token);
           dispatch(meFromTokenSuccess(response.payload))
         } else {
           //remove token from storage
           sessionStorage.removeItem(‘jwtToken’);
           dispatch(meFromTokenFailure(response.payload));
         }
       });
     },
     resetMe: () => { // logout
       sessionStorage.removeItem(‘jwtToken’); //remove token from storage
       dispatch(resetToken());
     }
    };
  }

  render() {
    const {asyncValidating, fields: { email, password, confirmPassword }, handleSubmit, submitting } = this.props;

    return (
      <div className="container">
      <form onSubmit={handleSubmit(this.props.addUser.bind(this))}>
        <div className={`form-group ${email.touched && email.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Email*</label>
          <input type="email" className="form-control" {...email} />
          <div className="help-block">
            {email.touched ? email.error : ''}
          </div>
          <div className="help-block">
            {asyncValidating === 'email' ? 'validating..': ''}
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