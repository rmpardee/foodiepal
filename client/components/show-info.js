import React, { Component } from 'react';



export default class ShowInfo extends Component {
  render() {
    return (
      <div className='modal-form-container'>
        <p>Welcome to Gourmand!</p>
        <p>There are many ways to organize your favorite foods. But the basic structure of the app follows this logic:</p>
        <p>Categories > Subcategories > Entries</p>
        <p>We have preloaded some examples.  You can delete or rename these if you wish. It may also be that you really love Cookies, and want to make those a category.  Please go right ahead! You can also remove Olives as a Category, or make it a Subcategory under something else.</p>
        <p>Finally, there are icons which match many common Category/Subcategory names. Under "Show Icon List" on the dropdown list, there is a list of the icons with their names. All names can be either singular or plural. Not seeing the one you want?  Let us know!</p>
        <a href='mailto:protoluxgourmand@gmail.com'>Contact Us</a>
      </div>
    );
  }
}
