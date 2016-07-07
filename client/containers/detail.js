import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { modal } from 'react-redux-modal';
import AddEntry from './add-entry';

import EntryList from './entry-list';

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subcat: this.props.params.name // comes from route
    }

    // this.openEntryForm = this.openEntryForm.bind(this);
  }

  openEntryForm() {
    console.log('calling openEntryForm: ');
    modal.add(AddEntry, {
      title: 'Add Entry',
      size: 'medium',
      closeOnOutsideClick: true,
      hideCloseButton: false
    });
  }

  render() {
    const itemType = this.props.item.type;
    const subcat = this.state.subcat;

    return (
      <div>
        This is a detail page
        <h3>{ subcat }</h3>
        
        <Link to={ `${subcat}/add` }>Log New Entry</Link>
        <button onClick={ this.openEntryForm.bind(this) }>Log Entry (Modal)</button>

        <h3>Your History for { subcat }</h3>
        <EntryList />
      </div>
    );
  }
}

function mapStateToProps(data) {
  console.log('item:', data);
  return {
    item: 'test'
  };
}

export default connect(mapStateToProps)(Detail);