var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override'); //Can add to package.json if needed
var mongoose = require('mongoose');

// For setting up Routes (Uncomment when routes are complete)
var middleware = require('./config/middleware.js'); 

// configuration ===========================================
 
//Set up Middleware and Routes (Uncomment when routes are complete)
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




//====For Posible Later Use===============
// used for logging incoming request
app.use(morgan('dev'));

// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /client/img will be /img for users
app.use(express.static(__dirname + '../client')); 
//====For Posible Later Use===============




// Configure routes // Currently being required in config/middleware.js
// require('./food/foodRoutes')(app);
// require('./user/userRoutes')(app);



// startup our app at http://localhost:3000
app.listen(port);               

// App server confirmation                     
console.log('FoodiePal running on port: ' + port);

// expose app - use for testing         
exports = module.exports = app; 