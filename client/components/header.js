import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <nav>
        <div className="container">
          <div
            className="mobile-quick-nav"
            onClick={ this.context.router.goBack }>
            <div className="mobile-chevron chevron-left"></div>Back
          </div>

          <div className="portal">
            <Link to="/" title="FoodiePal">FoodiePal</Link>
          </div>
          
          <div className="mobile-quick-nav"></div>
        </div>
      </nav>
    );
  }
}

Header.contextTypes = {
  router: React.PropTypes.object
}