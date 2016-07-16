import React, { Component } from 'react';
import CategoryList from '../containers/category-list';
import ReactCSS from 'react-addons-css-transition-group';

export default class Category extends Component {
  componentWillMount() {
    // console.log('call fetch action for categories');
  }

  render() {
    return (
      <ReactCSS component='div' transitionName="fade-in" transitionAppear={true} transitionAppearTimeout={300} transitionEnterTimeout={300} transitionLeaveTimeout={300}>
        <div className='container'>
          <div className='content'>
            <h6 className='grid-title'>Categories</h6>
            <CategoryList />
          </div>
        </div>
      </ReactCSS>
    );
  };
}