var User = require('./userModel.js');

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

  addUser: function(data) {
    var newUser = User({
     email: data.email,
     password: data.password,
     salt: data.salt
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