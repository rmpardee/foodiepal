var userControl = require('./userController.js');
var foodControl = require('../food/foodController.js');
var utils = require('../config/utils.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');


module.exports = function(app) {

  app.route('/signup')
    .post(function(req, res) {
      userControl.doesUserExist(req.body.email).then(function(boolean) {
        if (boolean) {
          return res.status(204).json({
            error: true,
            message: 'User already exists' 
          });  
        } else {
        userControl.addUser(req.body).then(function(user) {
          // add all the standard categories to the new user
          for (category in foodControl.standardCategories) {
            var food = foodControl.standardCategories[category];
            food.userID = user._id;
            foodControl.addCategory(food);
          }
          // generate a token for authentication to send back to the client
          var token = utils.generateToken(user); //<----- Generate Token
          user = utils.getCleanUser(user);
          res.status(201).json({
            user: user,   //  <----- Return both cleaned up user and token
            token: token
          });
        }, function(err) {
          console.log('err in route api/user/signup POST: ', err);
          res.status(204).send(err);
        });  
        }
      });
    });

  //Generate JWT Token: SignIn Route
  app.route('/login') 
    .post(function(req, res) {
      userControl.getUserLogIn(req.body.email)  // <-- Check username
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
      jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
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

};