var userControl = require('./userController.js');
var foodControl = require('../food/foodController.js');
var utils = require('../config/utils.js');
var email = require('../config/email.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var expressJwt = require('express-jwt');
var expJwt = require('../config/config.js');


//----PostMark------------------------------------------------------------>
var postmark = require('postmark');
var client = new postmark.Client('5192dc2f-aa00-4c75-a611-03b7da2eb542');
process.env['FROM_EMAIL'] = expJwt.gouremail.email;
//----PostMark------------------------------------------------------------>


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
        }  // TODO!! Send validation email
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

//----------------------------------------------------------------------

  //send a validation email -> WORKS!
  app.route('/testingemail')
    .get(function(req, res) {
      console.log('TEST!:', client);
      client.sendEmail({
        "From": "hello@gourmandapp.com",
        "To": "protoluxgourmand@gmail.com",
        "Subject": "Test", 
        "TextBody": "Hello from Postmark!"
      }, function(error, success) {
        if (error) {
          console.error("Unable to send via postmark: " + error.message);
          res.send(error);
        }
        console.info("Sent to postmark for delivery: " + success);
        res.send(success);
      });
    });


  //send a validation email
  app.route('/forgotPasword')
    .post(function(req, res) {
      userControl.doesUserExist(req.body.email).then(function(boolean) {
        if (!boolean) {
          return res.status(204).json({
            message: 'User does not exist' 
          });  
        } else {
        //call getUserLogin(req.body.email) (returns full user with ID)
          //use userID to generate token
          
        //send forgot pasword email w/ verification token
          email.forgotPaswordEmail(req.body, function(err) {
            if (err) {
              res.status(404).json(err);
            } else {
              res.send({
                message: 'Email was resent'
              });
            }
          });
        }
      });
    });
    

  // Not set up yet...
  app.route('/updateEmail')
    .post(function(req, res, next) {

      var newEmail = req.body.email && req.body.email.trim();

      User.findOneAndUpdate({
        '_id': req.user._id
      }, {
        email: newEmail
      }, {
        new: true
      }, function(err, user) {
        if (err) throw err;

        console.dir(user.toJSON());
        //send welcome email w/ verification token
        email.sendWelcomeEmail(user, req.headers.host);

        res.json({message: 'Email was updated'});

      });
    });




//----------------------------------------------------------------------

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