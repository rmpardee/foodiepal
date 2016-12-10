import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editEntryRequest, deleteEntryRequest } from '../actions/index';
import Rater from 'react-rater';

class EditEntry extends Component {

  constructor(props) {
    super(props);

    this.state = {
      type: this.props.current.subcategory.name,
      notes: this.props.current.subcategory.description,
      rating: 0,
      categoryID: this.props.current.category.id,
      subcategoryID: this.props.current.subcategory.id,
      userID: this.props.current.user.id
    };


    this.onTypeChange = this.onTypeChange.bind(this);
    this.onNotesChange = this.onNotesChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  closeModal() {
    this.props.removeModal();
  }

  onTypeChange(event) {
    this.setState({ type: event.target.value });
  }

  onNotesChange(event) {
    this.setState({ notes: event.target.value });
  }

  onRating(rating, lastRating) {
    if (lastRating !== undefined) {
      this.setState({ rating: rating });
    }
  }


  onFormSubmit(event) {
    event.preventDefault();

    this.props.editEntryRequest(this.state);
    this.closeModal();
  }


  onDeleteEntry(e) {
    e.preventDefault();

    var confirmDelete = confirm("Are you sure you want to delete this entry?");
    if (confirmDelete) {
      // TODO: call action to delete entry.  But pop-up warning first
      this.props.deleteEntryRequest(this.state);
    } else {
      return;
    }
  }




  render() {
// console.log('this.props: ', this.props);

    return (
      <div className='modal-form-container'>
        <form onSubmit={ this.onFormSubmit }>
          <input 
            value={ this.state.type }
            onChange={ this.onTypeChange }
            type="text"
          />
          <textarea 
            value={ this.state.notes }
            onChange={ this.onNotesChange }
          />
          <Rater
            onRate={ this.onRating.bind(this) }
            interactive={true}
          />
          <button type="submit" className='btn btn-primary'>Change Entry</button>
          <button onClick={ this.onDeleteEntry.bind(this) } className='btn btn-danger'>Delete Entry</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ editEntryRequest, deleteEntryRequest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEntry);
