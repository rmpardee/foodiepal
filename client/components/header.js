import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <nav>
        <div className="container">
          <div className="mobile-quick-nav"></div>

          <div className="portal">
            <a href="/" title="FoodiePal">FoodiePal</a>
          </div>
          
          <div className="mobile-quick-nav"></div>
        </div>
      </nav>
    );
  }
}