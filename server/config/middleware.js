var morgan = require('morgan'); // used for logging incoming request
var bodyParser = require('body-parser');
// var methodOverride = require('method-override'); //Not needed yet
// var helpers = require('./helpers.js'); //Custom middleware
var foodRoutes = require('../food/foodRoutes.js');
var userRoutes = require('../user/userRoutes.js');
var expressJwt = require('express-jwt');
// var expJwt = require('./config.js');


module.exports = function (app, express) {
  // Express 4 allows us to use multiple routers with their own configurations
  var userRouter = express.Router();
  var foodRouter = express.Router();

  // app.use(expressJwt({ secret: expJwt.scrt }));
  process.env.JWT_SECRET = 'keyboard cat';
  app.use(expressJwt({
      secret: process.env.JWT_SECRET,
      getToken: function(req) {
        return req.query.token;
      }
    }).unless({
      path: ['/api/user/login', '/api/user/signup']
    })
  );

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));
  app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Max-Age', '86400');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    // the next() function continues execution and will move onto the requested URL/URI
    next();
  });

  //inject routes into Router
  userRoutes(userRouter);
  foodRoutes(foodRouter);


  // authentication middleware used to decode token and made available on the request
  //app.use('/api/links', helpers.decode);
  app.use('/api/food', foodRouter);
  app.use('/api/user', userRouter);
  // app.use(helpers.errorLogger);
  // app.use(helpers.errorHandler);

};