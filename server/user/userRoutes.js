var userControl = require('./userController.js');
var utils = require('../config/utils.js');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var expJTW = require('../config/config.js');
var bcrypt = require('bcrypt');

module.exports = function(app) {

  app.route('/')
    // Get the user for the given userID
    .get(function(req, res) {
      userControl.getUser(req.query.userID).then(function(user) {
        res.status(200).send(user);
      }, function(err) {
        console.log('err in route api/user/ GET: ', err);
        res.status(204).send(err);
      });
    })
    // Add user to db
    .post(function(req, res) {
      userControl.addUser(req.body).then(function(user) {
        res.status(201).send(user);
      }, function(err) {
        console.log('err in route api/user/ POST: ', err);
        res.status(204).send(err);
      });
    });


  //In middleware.js for now
  // app.use(expressJwt({ secret: 'keyboard cat' }));

  //Generate JWT Token: Signup Route
  app.route('/signup')
    .post(function(req, res, next) {
      userControl.addUser(req.body).then(function() {
        user.save(function(err, user) {  // <-- Save User
          if (err) { throw err; }
          var token = utils.generateToken(user); //<----- Generate Token
          res.json({
            user: user,   //  <----- Return both user and token
            token: token
          });
        });
      });
    });


  //Generate JWT Token: SignIn Route
  app.route('/signin') 
    .post(function(req, res) {
      userControl.getUserSignIn(req.body.email)  // <-- Check username
      .exec(function(err, user) {
        if (err) { throw err; }
        if (!user) {
          return res.status(404).json({
            error: true,
            message: 'Username or Password is Wrong'
          });
        }
        bcrypt.compare(req.body.password, user.password, //  <-- check pwd         
          function(err, valid) {
            if (!valid) {
              return res.status(404).json({
                error: true,
                message: 'Username or Password is Wrong'
              });
            }

            var token = utils.generateToken(user); //  <-- Generate token
            user = utils.getCleanUser(user);
            res.json({
              user: user,  //  <--- Return both user and token
              token: token
            });
          });
      });
    });


  //Generate JWT Token: Re-Authenticate Route
  //get current user from token
  app.route('/me/from/token') //TODO: check path
    .get(function(req, res, next) {
    // check header or url parameters or post parameters for token
      var token = req.body.token || req.query.token;
      if (!token) {
        return res.status(401).json({message: 'Must pass token'});
      }
    // Check token that was passed by decoding token using secret
      jwt.verify(token, 'keyboard cat', function(err, user) {
      // jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
        if (err) { throw err; }
        //return user using the id from w/in JWTToken
        User.findById({
          '_id': user._id
        }, function(err, user) {
          if (err) { throw err; }
          user = utils.getCleanUser(user); 
          //Note: you can renew token by creating new token(i.e.    
          //refresh it)w/ new expiration time at this point, or not...
          var token = utils.generateToken(user);
          res.json({
            user: user,  //  <--- return both user and token
            token: token
          });
        });
      });
    });


//Testing
//Pass secret to expressJWt
  app.route('/test')
    // .post(expressJwt({secret: expJTW.scrt}), function(req, res, next) {
    // });
    // .post(expressJwt({secret: process.env.JWT_SECRET}), function(req, res, next) {
    // });
    .post(expressJwt({secret: 'keyboard cat'}), function(req, res, next) {
    });


};