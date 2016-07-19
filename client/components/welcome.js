import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Welcome extends Component {
  render() {
    return (
      <div>
        <div className='container'>
          <h1 className='welcome-logo'>Gourmand</h1>
          <h6>Your Personal Tasting Log</h6>

          <Link to='/signup' className='btn btn-primary'>Sign Up</Link>
          <Link to='/login' className='btn'>Login</Link>
        </div>
      </div>
    );
  }
}