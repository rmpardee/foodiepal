//Token Generator Function
//Generate Token using secret from process.env.JWT_SECRET

var jwt = require('jsonwebtoken');

module.exports = {

  generateToken: function(user) {
    //1. Dont use password and other sensitive fields
    //2. Use fields that are useful in other parts of the     
    //app/collections/models
    var u = {
      // name: user.name,
      email: user.email,
      // admin: user.admin,
      _id: user._id.toString(),
      // image: user.image
    };
    return token = jwt.sign(u, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24 * 365 // expires in 365 days
    });
  },

  //this can be tweeked to send client what we want about the user (note that password is omitted.
  getCleanUser: function(user) {
    var u = user.toJSON();
    return {
      _id: u._id,
      // name: u.name,
      // username: u.username,
      email: u.email
      // admin: u.admin,
      // createdAt: u.createdAt,
      // updatedAt: u.updatedAt,
      // image: u.image,
      // isEmailVerified: u.isEmailVerified
    };
  }
  // ,


  // validateSignUpForm: function(values, callback) {
  //   var errors = {};
  //   var hasErrors = false;

  //   if (!values.name || values.name.trim() === '') {
  //     errors.name = 'Enter a name';
  //     hasErrors = true;
  //   }
  //   if (!values.username || values.username.trim() === '') {
  //     errors.username = 'Enter username';
  //     hasErrors = true;
  //   }
  //   if (!values.email || values.email.trim() === '') {
  //     errors.email = 'Enter email';
  //     hasErrors = true;
  //   }
  //   if (!values.password || values.password.trim() === '') {
  //     errors.password = 'Enter password';
  //     hasErrors = true;
  //   }
  //   if (!values.confirmPassword || values.confirmPassword.trim() === '') {
  //     errors.confirmPassword = 'Enter Confirm Password';
  //     hasErrors = true;
  //   }

  //   if (values.confirmPassword && values.confirmPassword.trim() !== '' && values.password && values.password.trim() !== '' && values.password !== values.confirmPassword) {
  //     errors.password = 'Password And Confirm Password don\'t match';
  //     errors.password = 'Password And Confirm Password don\'t match';
  //     hasErrors = true;
  //   }

  //   if (callback) {
  //     callback(hasErrors && errors);
  //   } else {
  //     return hasErrors && errors;
  //   }
  // }


};