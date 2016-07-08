import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getCurrentSubcategory,
  getEntriesRequest
} from '../actions';

class EntryList extends Component {
  componentWillMount() {
    console.log('EntryList this.props: ', this.props);
    this.props.getEntriesRequest(this.props.current.subcategory.id);
  }

  renderEntries() {
    const entries = this.props.entries;

    if (!entries.length) {
      return 'You have not logged any tastings yet. Go out and be a foodie!';
    }

    console.log('entries props: ', this.props);

    return entries.map((entry, i) => {
      return (
        <li key={ entry._id }>
          <p><strong>Type</strong>: {entry.type}</p>
          <p><strong>notes</strong>: {entry.notes} | <strong>Rating</strong>: {entry.rating}</p>
        </li>
      );
    })
  }

  render() {
    return (
      <ul>
        { this.renderEntries() }
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCurrentSubcategory,
    getEntriesRequest
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryList);