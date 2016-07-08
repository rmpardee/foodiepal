var mongoose = require('mongoose');
    // bcrypt   = require('bcrypt-nodejs');
    // SALT_WORK_FACTOR  = 10;


var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
    // we'd like to have a 'unique: true' param here, but it causes
    // the POST to fail after adding one user
  },

  password: {
    type: String,
    required: true
  },

  salt: {
    type: String,
    required: true
  }
});

// FOR FUTURE USE WITH AUTHENTICATION:
// UserSchema.methods.comparePasswords = function (candidatePassword) {
//   var defer = Q.defer();
//   var savedPassword = this.password;
//   bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
//     if (err) {
//       defer.reject(err);
//     } else {
//       defer.resolve(isMatch);
//     }
//   });
//   return defer.promise;
// };

// UserSchema.pre('save', function (next) {
//   var user = this;

//   // only hash the password if it has been modified (or is new)
//   if (!user.isModified('password')) {
//     return next();
//   }

//   // generate a salt
//   bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//     if (err) {
//       return next(err);
//     }

//     // hash the password along with our new salt
//     bcrypt.hash(user.password, salt, null, function(err, hash) {
//       if (err) {
//         return next(err);
//       }

//       // override the cleartext password with the hashed one
//       user.password = hash;
//       user.salt = salt;
//       next();
//     });
//   });
// });

module.exports = mongoose.model('User', UserSchema);
