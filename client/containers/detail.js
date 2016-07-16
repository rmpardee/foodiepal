import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modal } from 'react-redux-modal';
import AddEntry from './add-entry';
import EntryList from './entry-list';
import { getCurrentSubcategory } from '../actions';
import ReactCSS from 'react-addons-css-transition-group'

class Detail extends Component {
  // componentWillMount() {

  // }
  
  // constructor(props) {
  //   super(props);
  // }

  openEntryForm(subcategory) {
    modal.add(AddEntry, {
      title: 'Add Entry',
      closeOnOutsideClick: true,
      hideCloseButton: false
    });
  }

  render() {
    const subcategory = this.props.current.subcategory;

    return (
      <ReactCSS component='div' transitionName="fade-in" transitionAppear={true} transitionAppearTimeout={300} transitionEnterTimeout={300} transitionLeaveTimeout={300}>
        <div className='container'>
          <div className='content'>
            <h6 className='grid-title'>{ this.props.current.category.name } <span className='breadcrumbs-separator'>&rsaquo;</span> { subcategory.name }</h6>
            
            <div className='detail-header'>
              <button onClick={ this.openEntryForm.bind(this) } className='btn btn-primary'>Add New Entry</button>
            </div>

            <h3>Your History for { subcategory.name }</h3>
            <EntryList />
          </div>
        </div>
      </ReactCSS>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCurrentSubcategory }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);