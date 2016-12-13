import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import EntryList from './entry-list';
import SubcategoryList from './subcategory-list';
import ReactCSS from 'react-addons-css-transition-group';

import { modal } from 'react-redux-modal';
import EditCategory from './edit-category';


class Subcategory extends Component {
  componentWillMount() {
    console.log('call fetch action for subcategories');
    // this.props.???????????????(this.props.current.category.id);
  }

  constructor(props) {
    super(props);
  }

  openCategoryEdit(e, category) {
    e.preventDefault();
    console.log('entry: ', category);
    modal.add(EditCategory, {
      modalProps: category,
      title: 'Edit Category',
      closeOnOutsideClick: true,
      hideCloseButton: false
    });
  }

  render() {
    return (
      <ReactCSS component='div' transitionName="fade-in" transitionAppear={true} transitionAppearTimeout={300} transitionEnterTimeout={300} transitionLeaveTimeout={300}>
      <div className='container'>
        <div className='content'>
          <h6 className='grid-title'>{ this.props.current.category.name } <span className='breadcrumbs-separator'>&rsaquo;</span> Varieties><button className='btn-edit' onClick={ (e) => this.openCategoryEdit(e, this.props.current) }>Edit {this.props.current.category.name}</button></h6>
          <SubcategoryList />
        </div>
      </div>
      </ReactCSS>
    );
  };
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Subcategory);