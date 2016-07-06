import React, { Component } from 'react';

// Import component files
import Header from './header';
import Subcategory from './subcategory';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <a href="/subcategory">Cheese</a>
        { this.props.children }
      </div>
    );
  }
};