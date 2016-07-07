import React, { Component } from 'react';
import { Link } from 'react-router';
import Header from './header';

export default class Main extends Component {
  render() {
    return (
      <div>
        <Header />
        { this.props.children }
        <Link to='/subcategories'>Subcategories</Link>
      </div>
    );
  }
};