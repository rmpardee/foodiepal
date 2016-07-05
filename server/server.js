var express = require('express');
var app = express();
var mongoose = require('mongoose');

var middleware = require('./config/middleware.js'); 


// configuration ===========================================
 
//Set up Middleware and Routes
middleware(app, express);

// db files
var db = require('./db/db');

// set port
var port = process.env.PORT || 3000; 


//------!!----------------------
// connect to mongoDB database 
// (uncomment after establishing credentials in db/db.js)
mongoose.connect(db.url); 
//------!!----------------------


// startup our app at http://localhost:3000
app.listen(port);               

// App server confirmation                     
console.log('FoodiePal running on port: ' + port);

// expose app - use for testing         
exports = module.exports = app; 