import React, { Component } from 'react';
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
          <a href={`/${subcategory.name}`}>{ subcategory.name }</a>
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