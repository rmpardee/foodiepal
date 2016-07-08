import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getCurrentCategory,
  getSubcategoriesRequest,
  setCurrentSubcategory
} from '../actions';

class SubcategoryList extends Component {
  componentWillMount() {
    this.props.getSubcategoriesRequest(this.props.current.category.id);
  }

  renderSubcategories() {
    const categoryName = this.props.current.category.name;
    const subcategories = this.props.subcategories;

    if (!subcategories.length) {
      return 'No subcategories.';
    }

    return subcategories.map((subcategory) => {
      return (
        <li key={ subcategory._id }>
          <Link to={`/${ categoryName }/${ subcategory._id }`}>{ subcategory.name }</Link>
        </li>
      );
    })
  }

  render() {
    return (
      <ul>
        { this.renderSubcategories() }
      </ul>
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