import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getCurrentUser,
  getCategoriesRequest,
  setCurrentCategory
} from '../actions';

class CategoryList extends Component {
  componentWillMount() {
    console.log('getting CategoryList props: ', this.props);
    // this.props.getCategoriesRequest('577ee365c84865705e05497c');
    this.props.getCategoriesRequest(this.props.current.user.id);
  }

  setCategory(category) {
    this.props.setCurrentCategory(category);
  }

  renderCategories() {
    const categories = this.props.categories;

    if (!categories.length) {
      return 'No categories.';
    }

    return categories.map((category) => {
      return (
        <li key={ category._id }>
          <Link
            to={ `${ category.name }` }
            onClick={ () => this.setCategory({ id: category._id, name: category.name }) }>
            { category.name }
          </Link>
        </li>
      );
    })
  }

  render() {
    return (
      <ul>
        { this.renderCategories() }
      </ul>
    );
  }
}

function mapStateToProps(state) {
  console.log('category container state:', state);
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCurrentUser,
    getCategoriesRequest,
    setCurrentCategory
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);