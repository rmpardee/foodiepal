import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { modal } from 'react-redux-modal';
import EditEntry from './edit-entry';

import {
  getCurrentSubcategory,
  getEntriesRequest
} from '../actions';
import TimeAgo from 'react-timeago';

class EntryList extends Component {
  componentWillMount() {
    this.props.getEntriesRequest(this.props.current.subcategory.id);
  }

  renderRating(rating) {
    var ratingStars = [];
    var ratingElement = '';

    for (var i = 0; i < 5; i++) {
      if (rating > 0) {
        ratingStars.push('is-active');
      } else {
        ratingStars.push('');
      }
      rating--;
    }

    return ratingStars.map((active, i) => {
      return (
        <a className={ (active !== '') ? 'read-only is-active' : 'read-only' } key={ i }>★</a>
      );
    });
  }

  renderDate(timestamp) {
    var newTimestamp = new Date(timestamp);

    return newTimestamp;
  }

  openEntryEdit(e, entry) {
    e.preventDefault();
    // TODO: figure out how to edit a specific entry
    modal.add(EditEntry, {
      modalProps: entry,
      title: 'Edit Entry',
      closeOnOutsideClick: true,
      hideCloseButton: false
    });
  }

  renderEntries() {
    const entries = this.props.entries.data;

    return entries.map((entry) => {
      return (
        <li key={ entry._id } className='entry-listing'>
          <div className='entry-listing-container'>
            <div className='entry-listing-header'>
              <h6 className='entry-listing-title'>{ entry.type }</h6>
              <div className='entry-listing-timestamp'>
                <TimeAgo date={ this.renderDate(entry.createdAt) } minPeriod={5} title={ entry.createdAt } />
              </div>
            </div>
            <div className='entry-listing-content'>
              <div className='entry-listing-rating react-rater'>
                { this.renderRating(entry.rating) }
              </div>
              <p className='entry-listing-notes'>{ entry.notes }</p>


              <button value={ entry._id } onClick={ (e) => this.openEntryEdit(e, entry) } className='btn btn-warn'>Change Entry</button>


            </div>
          </div>
        </li>
      );
    });
  }

  renderAddNewBlock() {
    let subcategoryName = this.props.current.subcategory.name.toLowerCase();

    return (
      <div className='add-new-block'>
        <h4>Nothing here yet!</h4>
        <p>Looks like you haven't logged any entries for { this.props.current.subcategory.name }.</p>
      </div>
    );
  }

  render() {
    return (
      <ul className='entry-list'>
        { !this.props.entries.isFetching ? this.renderEntries() : <div className='spinner'></div> }
        { !this.props.entries.isFetching && !this.props.entries.data.length ? this.renderAddNewBlock() : '' }
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