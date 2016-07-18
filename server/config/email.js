var expJwt = require('./config.js');
var postmark = require('postmark');
var client = new postmark.Client('5192dc2f-aa00-4c75-a611-03b7da2eb542');
process.env['FROM_EMAIL'] = expJwt.gouremail.email;



if (!'hello@gourmandapp.com') {  //NOT WORKING
  console.log('Please set: FROM_EMAIL environment variable. This is a validated email address to send emails from to other users for email verification, reset pwd etc');
  process.exit();
}

// This email should be sent on User SignUp after checkougn for duplicate users.
// Possible use: no token or access until responding to email (link to login)
var sendWelcomeEmail =  function(req, res) {  // This Sends Email with template
  client.sendEmailWithTemplate({
    "From": "hello@gourmandapp.com",
    "To": req.email,
    "TemplateId": 782101,
    "TemplateModel": {
      "product_name": "Gourmand",
      "name": req.email,
      "action_url": "https://gourmandapp.herokuapp.com/login", //add /login
      "username": req.email,
      "product_address_line1": "One Market",
      "product_address_line2": "San Francisco",
      "sender_name": "Gourmand"
    }
  }, function(error, success) {
    if (error) {
      console.error("Unable to send via postmark: " + error.message);
      // res.send(error); //res.send not working...
    }
    console.info("Sent to postmark for delivery: " + success);
    // res.send(success); //res.send not working...
  });
};



// Should send redirect to change pasword screen
var forgotPaswordEmail = function(req, res, finalCB) {
  // TODO: call function to generate token with userID

  client.sendEmailWithTemplate({    //template id 782081
    "From": "hello@gourmandapp.com",
    "To": req.email,
    "TemplateId": 782081,
    "TemplateModel": {
      "product_name": "Gourmand",
      "name": req.email,
      "action_url": "https://gourmandapp.herokuapp.com/changePasword",  //add /changePasword
      "sender_name": "Gourmand",
      "product_address_line1": "One Market",
      "product_address_line2": "San Francisco"
    }
  }, function(err) {
    if (err) {
      console.log('Could not send welcome email to: ' + req.email);
      console.error(err);
      if (finalCB) {
        finalCB({
          message: 'Could not send welcome email to: ' + req.email
        });
      }
    } else {
      if (finalCB) {
        finalCB({
          message: 'Success sending email to: ' + req.email
        });
      }
    }
  });

};

module.exports = {
  sendWelcomeEmail: sendWelcomeEmail,
  forgotPaswordEmail: forgotPaswordEmail
};