var Food = require('./foodModel.js');

module.exports = {

// CATEGORIES:
  // the input is the userID, which in this case will be the parent of the categories we want
  getCategories: function (userID) {
    // find the categories with the given userID and return them
    return Food.Category.find({'ancestors.user': userID}, function(err, categories) {
      if (err) {
        console.log("err in controller getCategories fn: ", err);
        return err;
      }
      // console.log('TEST IN GETCATAGORIES');
      return categories;
    });
  },

  addCategory: function (data) {
console.log('data: ', data);
    // create a new subcategory from the category model
    var newCategory = Food.Category({
      name: data.name,
      ancestors: {
        user: data.userID
      }
    });
       
    // save that new entry to the db, and return whatever its callback returns
    return newCategory.save(function(err, savedCategory) {
      if (err) {
        console.log("err in controller addCategory fn: ", err);
        return err;
      }
      console.log('Success saving category to db: ', savedCategory);
      // Since our POSTs return all the entries, which we get as a promise in the route itself, we don't need to return anything
    });
  },

  standardCategories: {
    cheese: {
      name: 'Cheese',
      userID: null
    },
    olives: {
      name: 'Olives',
      userID: null
    },
    chocolate: {
      name: 'Chocolate',
      userID: null
    },
    beer: {
      name: 'Beer',
      userID: null
    },
    wine: {
      name: 'Wine',
      userID: null
    },
    coffee: {
      name: 'Coffee',
      userID: null
    },
    charcuterie: {
      name: 'Charcuterie',
      userID: null
    },
    cocktails: {
      name: 'Cocktails',
      userID: null
    },
    oliveOil: {
      name: 'Olive Oil',
      userID: null
    }
  },

  updateCategory: function(category, next) {
    console.log('Inside updateEntry Controller: ', category);
    var query = { _id: category._id };
    var update = {
      type: category.type,
      notes: category.notes,
      rating: category.rating
    };
    return Food.Category.update(query, update, function(err, success) {
      if (err) {
        console.log("err in controller updateEntry fn: ", err);
        next(err);
        return;
      }
      console.log('success: ', success);
      next(success);
      return;
    });
  },

  deleteCategory: function(category, next) {
    console.log('Inside deletesubcategory Controller: ', category);
    var query = { _id: category._id };

    return Food.Category.remove(query, function(err) {
      if (err) {
        console.log("err in controller delete category fn: ", err);
        next(err);
        return;
      } else {
        console.log('Success deleting category');
        next();
        return;
      }
    });
  },

// SUBCATEGORIES:
  // the input is the categoryID, which in this case will be the parent of the subcats we want
  getSubcategories: function (categoryID) {
    // find the subcategories with the given categoryID and return them
    return Food.Subcategory.find({'ancestors.category': categoryID}, function(err, subcategories) {
      if (err) {
        console.log("err in controller getSubcategories fn: ", err);
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
    return newSubcategory.save(function(err, savedSubcategory) {
      if (err) {
        console.log("err in controller addSubcategory fn: ", err);
        return err;
      }
      console.log('Success saving subcategory to db: ', savedSubcategory);
      // Since our POSTs return all the entries, which we get as a promise in the route itself, we don't need to return anything
    });
  },

  updateSubcategory: function(subcategory, next) {
    console.log('Inside updateEntry Controller: ', subcategory);
    var query = { _id: subcategory._id };
    var update = {
      type: subcategory.type,
      notes: subcategory.notes,
      rating: subcategory.rating
    };
    return Food.Subcategory.update(query, update, function(err, success) {
      if (err) {
        console.log("err in controller updateEntry fn: ", err);
        next(err);
        return;
      }
      console.log('success: ', success);
      next(success);
      return;
    });
  },

  deleteSubcategory: function(subcategory, next) {
    console.log('Inside deletesubcategory Controller: ', subcategory);
    var query = { _id: subcategory._id };

    return Food.Subcategory.remove(query, function(err) {
      if (err) {
        console.log("err in controller delete subcategory fn: ", err);
        next(err);
        return;
      } else {
        console.log('Success deleting subcategory');
        next();
        return;
      }
    });
  },

//ENTRIES
  // the input is the subcategoryID, which in this case will be the parent of the entries we want
  getEntries: function (subcategoryID) {
    // find the entries with the given subcategoryID and return them
    return Food.Entry.find({'ancestors.subcategory': subcategoryID}, function(err, entries) {
      if (err) {
        console.log("err in controller getEntries fn: ", err);
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
    return newEntry.save(function(err, savedEntry) {
      if (err) {
        console.log("err in controller addEntry fn: ", err);
        return err;
      }
      console.log('Success saving entry to db: ', savedEntry);
      // Since our POSTs return all the entries, which we get as a promise in the route itself, we don't need to return anything
    });
  },

  updateEntry: function(entry, next) {
    console.log('Inside updateEntry Controller: ', entry);
    var query = { _id: entry._id };
    var update = {
      type: entry.type,
      notes: entry.notes,
      rating: entry.rating
    };
    return Food.Entry.update(query, update, function(err, success) {
      if (err) {
        next(err);
        console.log("err in controller updateEntry fn: ", err);
        return;
      }
      next(success);
      console.log('success: ', success);
      return; //success;
    });
  },

  deleteEntry: function(entry, next) {
    console.log('Inside deleteEntry Controller: ', entry);
    var query = { _id: entry._id };

    return Food.Entry.remove(query, function(err) {
      if (err) {
        console.log("err in controller deleteEntry fn: ", err);
        next(err);
        return;
      } else {
        console.log('Success deleting entry');
        next();
        return;
      }
    });
  }

};