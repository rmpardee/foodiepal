// Category Model
var CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  ancestors: [],

  parent: null
});

// Subcategory Model
var SubcatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  description: String,

  // ancestors: [],

  // parent: null
});

// Entry Model
var EntrySchema = new mongoose.Schema({
  type: String,

  notes: {
    type: String,
    required: true
  },

  rating: Number


  // ancestors: [],

  // parent: null
});

module.exports.CategorySchema = mongoose.model('Category', CategorySchema);
module.exports.SubcatSchema = mongoose.model('Subcat', SubcatSchema);
module.exports.EntrySchema = mongoose.model('Entry', EntrySchema);


