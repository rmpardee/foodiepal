var mongoose = require('mongoose');


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
  }
  
});

module.exports = mongoose.model('User', UserSchema);