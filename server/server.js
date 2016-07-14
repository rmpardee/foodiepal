var express = require('express');
var app = express();
var mongoose = require('mongoose');

var middleware = require('./config/middleware.js'); 
var db = require('./db/db');


// configuration ===========================================
 
//Set up Middleware and Routes
middleware(app, express);

// set port
var port = process.env.PORT || 3000; 


// connect to mongoDB database 
mongoose.connect(db.url);

// uncomment one at a time and run to seed mongoDB with fake data
// NOTE: after each, you'll have to update json files of data with the actual ancestor IDs
// db.seedUsers();
// db.seedCategories();
// db.seedSubcategories();
// db.seedEntries();


// startup our app at http://localhost:3000
app.listen(port);               

// App server confirmation                     
console.log('Gourmand running on port: ' + port);

// expose app - use for testing         
exports = module.exports = app; 