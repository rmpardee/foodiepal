import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modal } from 'react-redux-modal';
import AddEntry from './add-entry';
import EntryList from './entry-list';
import { getCurrentSubcategory } from '../actions';

class Detail extends Component {
  componentWillMount() {
    // this.setState({
    //   subcategory: this.props.getCurrentSubcategory()
    // });
    console.log('Detail STATE: ', this.state);
  }
  constructor(props) {
    super(props);
    console.log('DETAIL this.props: ', this.props);
    // this.state = {
    //   subcategoryID: this.props.params.id, // comes from route
    //   subcategories: this.props.subcategories,
    //   entries: this.props.entries
    // }



    // this.openEntryForm = this.openEntryForm.bind(this);
  }

  openEntryForm(subcategory) {
    modal.add(AddEntry, {
      title: 'Add Entry',
      size: 'medium',
      closeOnOutsideClick: true,
      hideCloseButton: false
    });
  }

  render() {
    // const subcategoryID = this.state.subcategoryID;
    // const subcategoryName = this.state.subcategories.map(function(subcategory) {
    //   if (subcategory.id === subcategoryID) {
    //     return subcategory.name;
    //   }
    // });

    const subcategory = this.props.current.subcategory;

    return (
      <div>
        This is a detail page
        <h3>{ subcategory.name }</h3>
        
        <button onClick={ this.openEntryForm.bind(this) }>Log Entry (Modal)</button>

        <h3>Your History for { subcategory.name }</h3>
        <EntryList />
      </div>
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