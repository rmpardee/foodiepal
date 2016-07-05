import React, { Component } from 'react';
import { connect } from 'react-redux';

class EntryList extends Component {
  renderEntries() {
    if (!this.props.entries) {
      return 'You have not logged any tastings yet. Go out and be a foodie!';
    }
    return this.props.entries.map((entry) => {
      return (
        <li key={ entry.id }>
          <p>Type: {entry.type}</p>
          <p>notes: {entry.notes}</p>
          <p>Rating: {entry.rating}</p>

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

function mapStateToProps({ entries }) {
  return { entries };
}

export default connect(mapStateToProps)(EntryList);