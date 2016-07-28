import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div className='container'>
          <div className='footer-content'>
            <p>2016 Gourmand. <a href='mailto:protoluxgourmand@gmail.com'>Contact Us</a></p>
            <p>Built with <span className='heart'>&#x2764;</span> by <a href='https://github.com/atsao' target='_blank'>Andrew</a>, <a href='https://github.com/rmpardee' target='_blank'>Ruth</a>, and <a href='https://github.com/tivrama' target='_blank'>Joel</a>.</p>
            <p>Icons for categories were created by <a href='http://www.flaticon.com/' target='_blank'>Flaticon</a>.</p>
          </div>
        </div>
      </footer>
    );
  }
}