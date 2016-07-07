import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class SubcategoryList extends Component {
  renderSubcategories() {
    const subcategories = this.props.subcategories;

    if (!subcategories) {
      return 'No subcategories.';
    }

    return subcategories.map((subcategory) => {
      return (
        <li key={subcategory.name}>
          <Link to={`/subcategories/${subcategory.name}`}>{ subcategory.name }</Link>
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

function mapStateToProps({ subcategories}) {
  return { subcategories };
}

export default connect(mapStateToProps)(SubcategoryList);