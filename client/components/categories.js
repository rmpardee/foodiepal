import React, { Component } from 'react';
import CategoryList from '../containers/category-list';

export default class Category extends Component {
  componentWillMount() {
    console.log('call fetch action for categories');
  }

  render() {
    return (
      <div className='container'>
        <h6 className='grid-title'>Categories</h6>
        <CategoryList />
      </div>
    );
  };
}