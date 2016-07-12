var User = require('./userModel.js');
var bcrypt = require('bcrypt');

module.exports = {

  // given a userID, return that user
  getUser: function(userID) {
    return User.findOne({'_id': userID}, function(err, user) {
      if (err) {
        console.log("err in controller getUser fn: ", err);
        return err;
      }
      return user;
    });
  },

  // given a userName, return that user
  getUserSignIn: function(email) {
    return User.findOne({'email': email}, function(err, user) {
      if (err) {
        console.log("err in controller getUser fn: ", err);
        return err;
      }
      return user;
    });
  },



  addUser: function(data) {
    var hash = bcrypt.hashSync(data.password.trim(), 10);
    var newUser = User({
     email: data.email.trim(),
     password: hash
     // salt: data.salt
    });

    return newUser.save(function(err, savedUser) {
      if (err) {
        console.log("err in controller addUser fn: ", err);
        return err;
      }
      console.log('Success saving user to db: ', savedUser);
      return savedUser;
    });
  }
};