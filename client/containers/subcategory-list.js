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

  openEntryForm(subcategory) {
    modal.add(AddSubcategory, {
      title: 'Add Subcategory',
      size: 'small',
      closeOnOutsideClick: true,
      hideCloseButton: false
    });
  }

  renderSubcategories() {
    const category = this.props.current.category.name;
    const subcategories = this.props.subcategories;

    if (!subcategories.length) {
      return 'No subcategories.';
    }

    return subcategories.map((subcategory) => {
      let subcategoryInfo = {
        id: subcategory._id,
        name: subcategory.name
      }

      return (
        <li key={ subcategory._id }>
          <Link
            to={`/${ category }/${ subcategory.name }`}
            onClick={ () => this.setSubcategory(subcategoryInfo) }>
            { subcategory.name }
          </Link>
        </li>
      );
    })
  }

  render() {
    return (
      <div>
        <ul>
          { this.renderSubcategories() }
        </ul>
        <button onClick={ this.openEntryForm.bind(this) }>Add Subcategory</button> 
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