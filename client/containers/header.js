import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutRequest } from '../actions/auth';


class Header extends Component {
  componentWillMount() {
    this.state = {
      account: {
        menuActive: false
      },
      prevRoute: this.props.routing.locationBeforeTransitions.pathname
    }
  }

  constructor(props) {
    super(props);

    console.log('header props: ', this.props);
  }

  onAccountClick() {
    var activeFlag = this.state.account.menuActive;

    this.setState({
      account: {
        menuActive: !activeFlag
        }
      });
  }

  closeAccountDropdown() {
    this.setState({
      account: {
        menuActive: false
      }
    });
  }

  onChangeEmailClick() {
    // TODO: add modal for change email form
  }

  onLogoutClick() {
    this.props.logoutRequest();
  }

  render() {
    return (
      <nav>
        <div className='container'>
          { this.props.routing.locationBeforeTransitions.pathname !== '/u' ? <div
            className='mobile-quick-nav mobile-nav-left'
            onClick={ this.context.router.goBack }
            title='Go back'>
            <div className='mobile-chevron chevron-left'></div>
          </div> : <div className='mobile-quick-nav inactive'></div> }

          <div className='portal'>
            <Link to='/' title='Gourmand'>FoodiePal</Link>
          </div>
          
          <div className='mobile-quick-nav mobile-nav-right' onClick={ this.onAccountClick.bind(this) }>
            <ul className='mobile-account-nav'>
              <li>Account &#x25BE;
                <ul className={ `mobile-account-subnav ${ this.state.account.menuActive ? 'active' : '' }` }>
                  <li onClick={ this.onChangeEmailClick.bind(this) }>Change Email</li>
                  <li onClick={ this.onLogoutClick.bind(this) }>Logout</li>
                </ul>
              </li>
            </ul>
          </div>
          <ul className='main-nav'></ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutRequest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

Header.contextTypes = {
  router: React.PropTypes.object,
}