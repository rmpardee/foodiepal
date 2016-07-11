import React, { Component } from 'react';

import EntryList from '../containers/entry-list';
import SubcategoryList from '../containers/subcategory-list';

export default class Subcategory extends Component {
  componentWillMount() {
    console.log('call fetch action for subcategories');
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container'>
        <h6 className='grid-title'>Subcategories</h6>
        <SubcategoryList />
      </div>
    );
  };
}