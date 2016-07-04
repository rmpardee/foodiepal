import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import component files
import Header from '../components/header';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
};