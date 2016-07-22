import React, { Component } from 'react';
import { Link } from 'react-router';
import Header from '../containers/header';
import Footer from './footer';

export default class Main extends Component {
  render() {
    return (
      <div className='wrapper'>
        <div className='content-wrapper'>
          <Header />
          { this.props.children }
        </div>
        <Footer />
      </div>
    );
  }
};