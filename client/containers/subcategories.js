import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import EntryList from './entry-list';
import SubcategoryList from './subcategory-list';
import ReactCSS from 'react-addons-css-transition-group';


class Subcategory extends Component {
  componentWillMount() {
    // console.log('call fetch action for subcategories');
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ReactCSS component='div' transitionName="fade-in" transitionAppear={true} transitionAppearTimeout={300} transitionEnterTimeout={300} transitionLeaveTimeout={300}>
      <div className='container'>
        <div className='content'>
          <h6 className='grid-title'>{ this.props.current.category.name } <span className='breadcrumbs-separator'>&rsaquo;</span> Varieties</h6>
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