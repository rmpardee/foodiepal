import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <nav>
        <div className="container">
          <div className="mobile-quick-nav"></div>

          <div className="portal">
            <Link to="/" title="FoodiePal">FoodiePal</Link>
          </div>
          
          <div className="mobile-quick-nav"></div>
        </div>
      </nav>
    );
  }
}