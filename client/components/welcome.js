import React, { Component } from 'react';
import { Link } from 'react-router';
import Header from './header';

export default class Welcome extends Component {
  render() {
    return (
      <div>
        <Header />
        { this.props.children }
      </div>
    );
  }
}