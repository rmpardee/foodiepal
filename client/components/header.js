import React, { PropTypes, Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <nav>
        <div className="mobile-quick-nav">
          Back
        </div>

        <div className="portal">
          <a href="/" title="FoodiePal">FoodiePal</a>
        </div>
        
        <div className="mobile-quick-nav">
          Logout
        </div>
      </nav>
    );
  }
}