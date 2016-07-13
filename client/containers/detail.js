import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modal } from 'react-redux-modal';
import AddEntry from './add-entry';
import EntryList from './entry-list';
import { getCurrentSubcategory } from '../actions';
import ReactCSS from 'react-addons-css-transition-group'

class Detail extends Component {
  componentWillMount() {
    // this.setState({
    //   subcategory: this.props.getCurrentSubcategory()
    // });
    // console.log('Detail STATE: ', this.state);
  }
  constructor(props) {
    super(props);
    // console.log('DETAIL this.props: ', this.props);
    // // this.state = {
    // //   subcategoryID: this.props.params.id, // comes from route
    // //   subcategories: this.props.subcategories,
    // //   entries: this.props.entries
    // // }



    // // this.openEntryForm = this.openEntryForm.bind(this);
  }

  openEntryForm(subcategory) {
    modal.add(AddEntry, {
      title: 'Add Entry',
      closeOnOutsideClick: true,
      hideCloseButton: false
    });
  }

  render() {
    const subcategory = this.props.current.subcategory;

    return (
      <ReactCSS component='div' transitionName="fade-in" transitionAppear={true} transitionAppearTimeout={300} transitionEnterTimeout={300} transitionLeaveTimeout={300}>
        <div className='container'>
          <h3>{ subcategory.name }</h3>
          
          <button onClick={ this.openEntryForm.bind(this) } className='btn btn-primary'>Add New Entry</button>

          <h3>Your History for { subcategory.name }</h3>
          <EntryList />
        </div>
      </ReactCSS>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCurrentSubcategory }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);