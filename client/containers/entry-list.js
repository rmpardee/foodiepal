import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEntriesRequest } from '../actions';

class EntryList extends Component {
  componentWillMount() {
    this.props.getEntriesRequest('S1');
  }

  renderEntries() {
    if (!this.props.entries) {
      return 'You have not logged any tastings yet. Go out and be a foodie!';
    }

    console.log('entries props: ', this.props);

    return this.props.entries.map((entry, i) => {
      return (
        <li key={ entry._id }>
          <p><strong>Type</strong>: {entry.type} | <strong>notes</strong>: {entry.notes} | <strong>Rating</strong>: {entry.rating}</p>
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
  return bindActionCreators({ getEntriesRequest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryList);