import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addEntryRequest } from '../actions';

class AddEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: '',
      notes: ''
    }

    this.onTypeChange = this.onTypeChange.bind(this);
    this.onNotesChange = this.onNotesChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onTypeChange(event) {
    this.setState({ type: event.target.value });
  }

  onNotesChange(event) {
    this.setState({ notes: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    console.log('submitting:', this.state);
    this.props.addEntryRequest(this.state);
  }

  render() {
    return (
      <form onSubmit={ this.onFormSubmit }>
        <input 
          value={ this.state.type }
          onChange={ this.onTypeChange }
          type="text"
          placeholder="Type"
        />
        <input 
          value={ this.state.notes }
          onChange={ this.onNotesChange }
          type="text"
          placeholder="Notes"
        />
        <button type="submit">Add Entry</button>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addEntryRequest }, dispatch);
}

export default connect(null, mapDispatchToProps)(AddEntry);