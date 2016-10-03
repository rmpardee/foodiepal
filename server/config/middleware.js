var morgan = require('morgan');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var path = require('path');
var foodRoutes = require('../food/foodRoutes.js');
var userRoutes = require('../user/userRoutes.js');
var secret = require('./env.js').jwtSecret;

module.exports = function (app, express) {
  var userRouter = express.Router();
  var foodRouter = express.Router();


  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(path.resolve(__dirname + '/../../client')));

  app.all('*', function(req, res, next) {
    if (!req.url.match(/\/api\/*/g)) {
      res.sendFile(path.resolve(__dirname + '/../../client/index.html'));
    } else {
      next();
    }
  });

  app.use(expressJwt({secret: secret})
    .unless({path: [
      '/api/user/login',
      '/api/user/signup',
      '/api/user/forgotPassword',
      '/api/user/resetPassword'
      , '/api/food/entry' // Comment this out when done testing
      , '/api/food/subcategory' // Comment this out when done testing
      , '/api/food/category' // Comment this out when done testing
    ]})
  );


  //inject routes into Router
  userRoutes(userRouter);
  foodRoutes(foodRouter);

  // authentication middleware used to decode token and made available on the request
  app.use('/api/food', foodRouter);
  app.use('/api/user', userRouter);
};