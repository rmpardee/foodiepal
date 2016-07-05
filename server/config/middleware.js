var morgan = require('morgan'); // used for logging incoming request
var bodyParser = require('body-parser');
// var methodOverride = require('method-override'); //Not needed yet
// var helpers = require('./helpers.js'); //Custom middleware
var foodRoutes = require('../food/foodRoutes.js');
// var userRoutes = require('../user/userRoutes.js');


module.exports = function (app, express) {
  // Express 4 allows us to use multiple routers with their own configurations
  // var userRouter = express.Router(); //Use when setting up user routes
  var foodRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  //inject routes into Router
  // routes(userRouter);
  foodRoutes(foodRouter);


  // authentication middleware used to decode token and made available on the request
  //app.use('/api/links', helpers.decode);
  app.use('/api/food', foodRouter); // user link router for link request
  // app.use(helpers.errorLogger);
  // app.use(helpers.errorHandler);

};