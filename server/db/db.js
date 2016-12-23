var usersSeed = require('./seeds/users.json');
var categoriesSeed = require('./seeds/categories.json');
var subcategoriesSeed = require('./seeds/subcategories.json');
var entriesSeed = require('./seeds/entries.json');

var foodControl = require('../food/foodController.js');
var userControl = require('../user/userController.js');

var mlab = require('../config/env.js').mlab;
  
module.exports = {
  // url to mongo db named foodiepal, for server to connect to
  url: 'mongodb://' + mlab.dbuser + ':' + mlab.dbpassword + '@ds017195.mlab.com:17195/gourmand',
  // url to testing DB.  
  // url: 'mongodb://' + mlab.dbuser + ':' + mlab.dbpassword + '@ds019786.mlab.com:19786/gourmand-testing',

  // adds the the seed data to our database:
  seedUsers: function() {
    for (var i = 0; i < usersSeed.length; i++) {
      userControl.addUser(usersSeed[i]);
    }
  },

  // NOTE: json files will need to be altered with actual userIDs once added
  seedCategories: function() {
    for (var i = 0; i < categoriesSeed.length; i++) {
      foodControl.addCategory(categoriesSeed[i]);
    }
  },

  // NOTE: json files will need to be altered with actual userIDs and categoryIDs once added
  seedSubcategories: function() {
    for (var i = 0; i < subcategoriesSeed.length; i++) {
      foodControl.addSubcategory(subcategoriesSeed[i]);
    }
  },

  // NOTE: json files will need to be altered with actual userIDs, categoryIDs, and subcategoryIDs once added
  seedEntries: function() {
    for (var i = 0; i < entriesSeed.length; i++) {
      foodControl.addEntry(entriesSeed[i]);
    }
  }
};