import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addEntryRequest } from '../actions';
import Rater from 'react-rater';

class AddEntry extends Component {
  constructor(props) {
    super(props);

    console.log('AddEntry props:', this.props);

    this.state = {
      type: '',
      notes: '',
      rating: 0,
      categoryID: this.props.current.category.id,
      subcategoryID: this.props.current.subcategory.id,
      userID: this.props.current.user.id
    }


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
    console.log('submitting:', this.state);
    this.props.addEntryRequest(this.state);
    this.closeModal();
  }

  render() {
    return (
      <div className='form-container'>
        <form onSubmit={ this.onFormSubmit }>
          <input 
            value={ this.state.type }
            onChange={ this.onTypeChange }
            type="text"
            placeholder="Type"
          />
          <textarea 
            value={ this.state.notes }
            onChange={ this.onNotesChange }
            placeholder="Notes"
          />
          <Rater
            onRate={ this.onRating.bind(this) }
            interactive={true}
          />
          <button type="submit" className='btn btn-primary'>Add Entry</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addEntryRequest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEntry);