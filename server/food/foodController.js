var Food = require('./foodModel.js');

//this adds and modifies food
module.exports = {
    
  // ===Testing & Debugging============
  foodFightTest: 'FoodFight!!',
  objectIdCounter: 1,
  messages: [
    {
      text: 'hello world'
    }
  ],
  // ===Testing & Debugging============

//SUBCATEGORIES:
  // the input is the categoryID, which in this case will be the parent of the subcats we want
  getSubcats: function (categoryID) {
    // TO CHANGE: we'll have to see how the parent parentID is sent
    return Food.Subcat.find({parent: categoryID}, function(err, subcats) {

      // if there is an error retrieving, send the error. 
      if (err) {
        //TODO: How to deal with err
        console.log(err);
      }
      console.log('subcats: ', subcats);

      return subcats; // return all the subcategories in JSON format
    });
  },

  addSubcat: function (req) {
    // create a new subcategory from the model
    var newSubcat = Food.Subcat({
      // TO CHANGE: we'll have to see how all this is sent in the request
      name: req.subcatName,
      description: req.description,
      ancestors: [req.userID, req.categoryID],
      parent: req.categoryID
    });
            
    newSubcat.save(function(err, res) {
      if (err) {
        //TODO: How to deal with err
        console.log(err);
      } else {
        console.log('Success saving subcat to server');
        return 'The subcat has been saved'; 
      }
    });
  },

//ENTRIES
  // the input is the subcatID, which in this case will be the parent of the entries we want
  // TO DO: We will need a separate function to get all the entries within a certain category
  getEntriesForSubcat: function (subcatID) {
    // TO CHANGE: we'll have to see how the parent parentID is sent
    return Food.Entry.find({parent: subcatID}, function(err, subcats) {

      // if there is an error retrieving, send the error. 
      if (err) {
        //TODO: How to deal with err
        console.log(err);
      }
      console.log('subcats: ', subcats);

      return subcats; // return all the subcategories in JSON format
    });
  },

  addEntry: function (req) {
    // create a new subcategory from the model
    var newEntry = Food.Entry({
      // TO CHANGE: we'll have to see how all this is sent in the request
      type: req.type,
      notes: req.notes,
      rating: req.rating,
      ancestors: [req.userID, req.categoryID, req.subcatID],
      parent: req.subcatID

    });
            
    newEntry.save(function(err, res) {
      if (err) {
        //TODO: How to deal with err
        console.log(err);
      } else {
        console.log('Success saving entry to server');
        return 'The entry has been saved'; 
      }
    });
  }

};