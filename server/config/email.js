var postmark = require('postmark')('01824264-d650-45a3-9c8a-217457dfea68')//(process.env.POSTMARK_API_TOKEN); //NOT WORKING
var async = require('async');
var crypto = require('crypto');

if (!'protoluxgourmand@gmail.com') {//(!process.env.FROM_EMAIL) {  //NOT WORKING
  console.log('Please set: FROM_EMAIL environment variable. This is a validated email address to send emails from to other users for email verification, reset pwd etc');
  console.log('TEST!!!!!!!!! ', process.env.FROM_EMAIL);
  process.exit();
}

var sendWelcomeEmail = function(user, host, finalCB) {
  host = host.indexOf('localhost') >= 0 ? 'http://' + host : 'https://' + host;

  async.waterfall([
    function(done) {
      crypto.randomBytes(15, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      user.verifyEmailToken = token;
      user.verifyEmailTokenExpires = Date.now() + 3600000 * 24; // 24 hours

      user.save(function(err) {
        done(err, user);
      });
    },
    function(user, done) {
      postmark.sendEmailWithTemplate({
        From: process.env.FROM_EMAIL,
        To: user.email,
        TemplateId: 491642,
        TemplateModel: {
          product_name: 'Gourmand',
          name: user.email,
          action_url: host + '/validateEmail/' + user.verifyEmailToken,
          username: user.email,
          sender_name: 'Gourmand Team',
          sender_name_Value: 'Gourmand',
          product_name_Value: 'Gourmand',
          product_address_line1: 'Fine foods',
          product_address_line2: 'The world'
        }
      }, done);
    }
  ],
  function(err) {
    if (err) {
      console.log('Could not send welcome email to: ' + user.email);
      console.error(err);
      if (finalCB) {
        finalCB({
          message: 'Could not send welcome email to: ' + user.email
        });
      }
    } else {
      if (finalCB) {
        finalCB();
      }
    }
  });

};

module.exports = {
  sendWelcomeEmail: sendWelcomeEmail
};