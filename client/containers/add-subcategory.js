import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addSubcategoryRequest } from '../actions';

class AddSubcategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      categoryID: this.props.current.category.id
    }

    this.onNameChange = this.onNameChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  closeModal() {
    this.props.removeModal();
  }

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }


  onFormSubmit(event) {
    event.preventDefault();
    console.log('Adding subcategory:', this.state);
    this.props.addSubcategoryRequest(this.state);
    this.closeModal();
  }

  render() {
    return (
      <form onSubmit={ this.onFormSubmit }>
        <input 
          value={ this.state.name }
          onChange={ this.onNameChange.bind(this) }
          type="text"
          placeholder="Name"
        />
        <textarea 
          value={ this.state.description }
          onChange={ this.onDescriptionChange }
          placeholder="Description"
        />
        <button type="submit">Add Subcategory</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addSubcategoryRequest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSubcategory);