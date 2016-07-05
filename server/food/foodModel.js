var mongoose = require('mongoose');

// Category Model
var CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  ancestors: Array,
  // unclear what the id of the parent will be, a string?
  parent: String
});

// Subcategory Model
var SubcatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  description: String,

  ancestors: Array,
  // unclear what the id of the parent will be, a string?
  parent: String
});

// Entry Model
var EntrySchema = new mongoose.Schema({
  type: String,

  notes: {
    type: String,
    required: true
  },

  rating: Number,

  ancestors: Array,
  // unclear what the id of the parent will be, a string?
  parent: String
});

module.exports.CategorySchema = mongoose.model('Category', CategorySchema);
module.exports.SubcatSchema = mongoose.model('Subcat', SubcatSchema);
module.exports.EntrySchema = mongoose.model('Entry', EntrySchema);


