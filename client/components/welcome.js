import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Welcome extends Component {
  render() {
    return (
      <div>
        Welcome!
        { this.props.children }
        <Link to='/login'>Login</Link>
      </div>
    );
  }
}