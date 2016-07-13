import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <nav>
        <div className='container'>
          <div
            className='mobile-quick-nav'
            onClick={ this.context.router.goBack }
            title='Go back'>
            <div className='mobile-chevron chevron-left'></div>
          </div>

          <div className='portal'>
            <Link to='/' title='Gourmand'>FoodiePal</Link>
          </div>
          
          <div className='mobile-quick-nav'></div>
          <ul className='main-nav'></ul>
        </div>
      </nav>
    );
  }
}

Header.contextTypes = {
  router: React.PropTypes.object
}