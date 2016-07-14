import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

  renderEntries() {
    const entries = this.props.entries.data;

    return entries.map((entry) => {
      return (
        <li key={ entry._id } className='entry-listing'>
          <p><strong>Type</strong>: {entry.type}</p>
          <p><strong>notes</strong>: {entry.notes}</p>
          <p><strong>Rating</strong>: {entry.rating}</p>
          <div className='react-rater'>
            { this.renderRating(entry.rating) }
          </div>
          <TimeAgo date={ this.renderDate(entry.createdAt) } minPeriod={5} title={ entry.createdAt } />
        </li>
      );
    })
  }

  renderAddNewBlock() {
    return (
      <div className='add-new-block'>
        <h4>What have you tried lately?</h4>
        <p>Looks like you haven't added any logs for { this.props.current.subcategory.name }!</p>
      </div>
    );
  }

  render() {
    return (
      <ul>
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