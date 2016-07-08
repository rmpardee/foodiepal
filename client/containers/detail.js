import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modal } from 'react-redux-modal';
import AddEntry from './add-entry';
import EntryList from './entry-list';
import { setCurrentSubcategory } from '../actions';

class Detail extends Component {
  constructor(props) {
    super(props);
    console.log('DETAIL this.props: ', this.props);
    this.state = {
      subcategoryID: this.props.params.id, // comes from route
      subcategories: this.props.subcategories,
      entries: this.props.entries
    }



    // this.openEntryForm = this.openEntryForm.bind(this);
  }

  openEntryForm(subcategory) {
    console.log('calling openEntryForm: ', arguments);
    modal.add(AddEntry, {
      title: 'Add Entry',
      size: 'medium',
      closeOnOutsideClick: true,
      hideCloseButton: false,
      subcategory: subcategory
    });
  }

  render() {
    const subcategoryID = this.state.subcategoryID;
    const subcategoryName = this.state.subcategories.map(function(subcategory) {
      if (subcategory.id === subcategoryID) {
        return subcategory.name;
      }
    });

    return (
      <div>
        This is a detail page
        <h3>{ subcategoryName }</h3>
        
        <Link to={ `${subcategoryName}/add` }>Log New Entry</Link>
        <button onClick={ this.openEntryForm.bind(this, this.state.subcategoryID ) }>Log Entry (Modal)</button>

        <h3>Your History for { subcategoryName }</h3>
        <EntryList subcategoryID={ this.state.subcategoryID }/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setCurrentSubcategory }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);