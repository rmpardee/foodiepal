import React, { Component } from 'react';
import ReduxModal from 'react-redux-modal';

export default class App extends Component {

  componentWillMount() {
    this.props.loadUserFromToken();
  }

  render() {
    return (
      <div>
        { this.props.children }
        <ReduxModal />
      </div>
    );
  }
}