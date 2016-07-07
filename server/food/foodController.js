var Food = require('./foodModel.js');
var mongoose = require('mongoose');

module.exports = {

// CATEGORIES:
  // the input is the userID, which in this case will be the parent of the categories we want
  getCategories: function (userID) {
    // find the categories with the given userID and return them
    return Food.Category.find({'ancestors.user': userID}, function(err, categories) {
      if (err) {
        console.log("err in controller: ", err);
        return err;
      }
      return categories;
    });
  },

  addCategory: function (data) {
    // create a new subcategory from the category model
    var newCategory = Food.Category({
      name: data.name,
      ancestors: {
        user: data.userID
      }
    });
       
    // save that new entry to the db, and return whatever its callback returns
    return newCategory.save(function(err, res) {
      if (err) {
        console.log("err in controller: ", err);
        return err;
      }
      console.log('Success saving category to db');
      // Since our POSTs return all the entries, which we get as a promise in the route itself, we don't need to return anything
    });
  },

// SUBCATEGORIES:
  // the input is the categoryID, which in this case will be the parent of the subcats we want
  getSubcategories: function (categoryID) {
    // find the subcategories with the given categoryID and return them
    return Food.Subcategory.find({'ancestors.category': categoryID}, function(err, subcategories) {
      if (err) {
        console.log("err in controller: ", err);
        return err;
      }
      return subcategories;
    });
  },

  addSubcategory: function (data) {
    // create a new subcategory from the model
    var newSubcategory = Food.Subcategory({
      name: data.name,
      description: data.description,
      ancestors: {
        user: data.userID,
        category: data.categoryID
      }
    });
    
    // save that new entry to the db, and return whatever its callback returns
    return newSubcategory.save(function(err, res) {
      if (err) {
        console.log("err in controller: ", err);
        return err;
      }
      console.log('Success saving subcategory to db');
      // Since our POSTs return all the entries, which we get as a promise in the route itself, we don't need to return anything
    });
  },

//ENTRIES
  // the input is the subcategoryID, which in this case will be the parent of the entries we want
  getEntries: function (subcategoryID) {
    // find the entries with the given subcategoryID and return them
    return Food.Entry.find({'ancestors.subcategory': subcategoryID}, function(err, entries) {
      if (err) {
        console.log("err in controller: ", err);
        return err;
      }
      return entries;
    });
  },

  addEntry: function (data) {
    // create a new entry from the model
    var newEntry = Food.Entry({
      type: data.type,
      notes: data.notes,
      rating: data.rating,
      ancestors: {
        user: data.userID,
        category: data.categoryID,
        subcategory: data.subcategoryID
      }
    });
    
    // save that new entry to the db, and return whatever its callback returns
    return newEntry.save(function(err, res) {
      if (err) {
        console.log("err in controller: ", err);
        return err;
      }
      console.log('Success saving entry to db');
      // Since our POSTs return all the entries, which we get as a promise in the route itself, we don't need to return anything
    });
  }
};