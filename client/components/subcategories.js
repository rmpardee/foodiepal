import React, { Component } from 'react';

import EntryList from '../containers/entry-list';
import SubcategoryList from '../containers/subcategory-list';

export default class Subcategory extends Component {
  componentWillMount() {
    console.log('call fetch action for subcategories');
  }

  render() {
    return (
      <div>
        <h3>Select a subcategory</h3>
        <SubcategoryList />
        { this.props.children }
      </div>
    );
  };
}