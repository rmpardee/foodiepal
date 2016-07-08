import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEntriesRequest } from '../actions';

class EntryList extends Component {
  componentWillMount() {
    this.props.getEntriesRequest(this.props.subcategoryID);
  }

  renderEntries() {
    if (this.props.entries.length < 1) {
      return 'You have not logged any tastings yet. Go out and be a foodie!';
    }

    console.log('entries props: ', this.props);

    return this.props.entries.map((entry, i) => {
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
  console.log('ENTRYLIST state: ', state);
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getEntriesRequest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryList);