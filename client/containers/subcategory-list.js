import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modal } from 'react-redux-modal';
import AddSubcategory from './add-subcategory';
import {
  getCurrentCategory,
  getSubcategoriesRequest,
  setCurrentSubcategory
} from '../actions';

class SubcategoryList extends Component {
  componentWillMount() {
    this.props.getSubcategoriesRequest(this.props.current.category.id);
  }

  setSubcategory(subcategory) {
    this.props.setCurrentSubcategory(subcategory);
  }

  openEntryForm(e) {
    e.preventDefault();

    modal.add(AddSubcategory, {
      title: 'Add Subcategory',
      closeOnOutsideClick: true,
      hideCloseButton: false
    });
  }

  renderSubcategories() {
    const category = this.props.current.category.name;
    const subcategories = this.props.subcategories;

    return subcategories.map((subcategory) => {
      let subcategoryInfo = {
        id: subcategory._id,
        name: subcategory.name
      }

      return (
        <li key={ subcategory._id } className='grid-links-block'>
          <Link
            to={`/${ category }/${ subcategory.name }`}
            onClick={ () => this.setSubcategory(subcategoryInfo) }>
            <div className="grid-link-container">
              <span className='grid-link-name'>{ subcategory.name }</span>
            </div>
          </Link>
        </li>
      );
    })
  }

  renderAddNewButtonGrid() {
    if (this.props.subcategories.length) {
      return (
        <li key='add-subcategory' className='grid-links-block'>
          <Link to='#' onClick={ this.openEntryForm.bind(this) }>
            <div className="grid-link-container">
              <div className='grid-link-icon'>+</div>
              <span className='grid-link-name'>Add New</span>
            </div>
          </Link>
        </li>
      );
    }
  }

  renderAddNewBlock() {
    if (!this.props.subcategories.length) {
      return (
        <div className='add-new-block'>
          <h4>Oh noes!</h4>
          <p>You haven't added any types of { this.props.current.category.name }!</p>
          <Link to='#' onClick={ this.openEntryForm.bind(this) }>
            <div className="grid-link-container">
              <div className='grid-link-icon'>+</div>
              <span className='grid-link-name'>Add New</span>
            </div>
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className='grid-container'>
        <ul className='grid-links'>
          { this.props.subcategories.length ? this.renderSubcategories() : '' }
          { this.renderAddNewButtonGrid() }
        </ul>
        { this.renderAddNewBlock() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCurrentCategory,
    getSubcategoriesRequest,
    setCurrentSubcategory
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubcategoryList);