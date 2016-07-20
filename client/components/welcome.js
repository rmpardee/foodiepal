import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Welcome extends Component {
  render() {
    return (
      <div className='wrapper'>
        <section className='welcome-header-container'>
          <div className='container'>
            <section className='welcome-header'>
              <div className='container'>
                <div className='welcome-logo'><img src='./assets/img/logo-white-large.png' alt='logo' title='Gourmand'/></div>
                <div className='welcome-tagline'><h4>Your Personal Tasting Log</h4></div>
                <div className='welcome-links'>
                  <Link to='/signup' className='welcome-link link-signup'>Sign Up</Link>
                  <p>Already have an account?</p>
                  <Link to='/login' className='welcome-link link-login'>Login</Link>
                </div>
              </div>
            </section>
          </div>
        </section>
        <section className='welcome-content-container'>
          <div className='container'>
            <h2>How It Works</h2>
          </div>
        </section>
      </div>
    );
  }
}