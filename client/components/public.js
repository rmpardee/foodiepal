import React, { Component } from 'react';
import { Link } from 'react-router';
import HeaderPublic from './header-public.js';

export default class Public extends Component {
  render() {
    return (
      <div className='content-wrapper'>
        <HeaderPublic />
        { this.props.children }
      </div>
    );
  }
}