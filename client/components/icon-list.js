import React, { Component } from 'react';
import { iconList } from '../assets/img/icon-catalogue';


export default class IconList extends Component {

  renderIcons() {
    return iconList.map((icon) => {
      return (
        <li key={ icon } className='grid-links-block'>
          <div className="grid-link-container-modal">
            <div className={ `grid-link-icon-smaller grid-link-icon-${ icon }` }></div>
            <span className='grid-link-name-smaller'>{ icon }</span>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div className='container'>
        <div className='grid-container'>
          <ul className='grid-links'>
            { this.renderIcons() }
          </ul>
        </div>
      </div>
    );
  }
}
