var mongoose = require('mongoose');

// Category Model
var CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  ancestors: {
    user: String
  }
});

// Subcategory Model
var SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  description: String,

  ancestors: {
    user: String,
    category: String
  }
});

// var EntryAncestor = new mongoose.Schema({
//   user: String,
//   category: String,
//   subcategory: String
// });

// Entry Model
var EntrySchema = new mongoose.Schema({
  type: String,

  notes: String,

  // notes: {
  //   type: String,
  //   required: true
  // },

  rating: String,

  // rating: {
  //   type: Number,
  //   required: true
  // },

  ancestors: {
    user: String,
    category: String,
    subcategory: String
  }
});

module.exports.Category = mongoose.model('Category', CategorySchema);
module.exports.Subcategory = mongoose.model('Subcategory', SubcategorySchema);
module.exports.Entry = mongoose.model('Entry', EntrySchema);
