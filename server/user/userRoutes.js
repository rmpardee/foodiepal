var userControl = require('./userController.js');
var foodControl = require('../food/foodController.js');
var utils = require('../config/utils.js');
var email = require('../config/email.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var expJwt = require('../config/config.js');


//----PostMark------------------------------------------------------------>
var postmark = require('postmark');
var client = new postmark.Client('5192dc2f-aa00-4c75-a611-03b7da2eb542');
process.env['FROM_EMAIL'] = expJwt.gouremail.email;
//----PostMark------------------------------------------------------------>


module.exports = function(app) {

  app.route('/signup')
    .post(function(req, res) {
      // doesUserExist should return a boolean, but seems to pass the user to the promise, unclear why...
      userControl.doesUserExist(req.body.email).then(function(verifiedUser) {
        if (verifiedUser) {
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
        "Subject": "Test Email", 
        "TextBody": "Hello from Gourmand!"
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
  app.route('/forgotPassword')
    .post(function(req, res) {
      // doesUserExist should return a boolean, but seems to pass the user to the promise, unclear why...
      userControl.doesUserExist(req.body.email).then(function(verifiedUser) {
        if (!verifiedUser) {
          console.log('Not a verified user');
          res.sendStatus(204);
        } else {
          email.forgotPasswordEmail(verifiedUser, function(err) {
            if (err) {
              console.log('Could not send email: ', err);
              res.sendStatus(204);
            } else {
              res.status(201).json({
                message: 'Email was sent'
              });
            }
          });
        }
      });
    });


  app.route('/resetPassword')
    .post(function(req, res) {
      userControl.doesUserExist(req.body.email).then(function(verifiedUser) {
      //change email to userid from forgotpswd email paramiter 
        if (!verifiedUser) {
          console.log('Not a verified user');
          res.sendStatus(204);
        } else {
          userControl.resetPassword(req.body, verifiedUser, function(err) {
            if (err) {
              res.status(204).json({
                message: 'Could not change password'
              });
            } else {
              res.status(201).json({
                message: 'Password Changed'
              });
            }
          });
        }
      });
    });


};