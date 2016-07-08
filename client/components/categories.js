import React, { Component } from 'react';
import CategoryList from '../containers/category-list';

export default class Category extends Component {
  componentWillMount() {
    console.log('call fetch action for categories');
  }

  render() {
    return (
      <div>
        <h3>Categories</h3>
        <CategoryList />
      </div>
    );
  };
}