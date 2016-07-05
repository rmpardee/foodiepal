import React, { Component } from 'react';
import { connect } from 'react-redux';

import EntryList from './entry-list';

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subcat: this.props.params.name // comes from route
    }
  }

  render() {
    const itemType = this.props.item.type;
    const subcat = this.state.subcat;

    return (
      <div>
        This is a detail page
        <h3>{ subcat }</h3>
        { this.props.children }
        <h3>Your History for { subcat }</h3>
        <EntryList />
      </div>
    );
  }
}

function mapStateToProps(data) {
  console.log('item:', data);
  return {
    item: {
      // type: item.type,
      // notes: item.notes
    }
  };
}

export default connect(mapStateToProps)(Detail);