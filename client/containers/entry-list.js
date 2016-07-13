import React, { Component } from 'react';
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
      // ratingBlock.push({ (rating > 0) ? 'is-active' : '' });
      rating--;
    }
    // ratingBlock.push(ratingElement);

    return ratingStars.map((active, i) => {
      return (
        <a className={ (active !== '') ? 'read-only is-active' : 'read-only' } key={ i }>★</a>
      );
    });
  }

  renderDate(timestamp) {
    var newTimestamp = new Date(timestamp);

    console.log('le date: ', newTimestamp);
    console.log('le date type: ', typeof newTimestamp);
    return newTimestamp;
  }

  renderEntries() {
    const entries = this.props.entries;

    if (!entries.length) {
      return 'You have not logged any tastings yet. Go out and be a foodie!';
    }

    console.log('entries: ', entries);

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
  return bindActionCreators({
    getCurrentSubcategory,
    getEntriesRequest
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryList);