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

  // Same function will work for getting subcatagories and entries
  getDBItems: function (parentID) {
    // TO CHANGE: we'll have to see how the parent parentID is sent
    Food.Subcat.find({parent: parentID}, function(err, subcats) {

      // if there is an error retrieving, send the error. 
      if (err) {
        //TODO: How to deal with err
        console.log(err);
      }
      console.log('Add inside addSubcat');

      return JSON.parse(subcats); // return all the subcategories in JSON format
    });
  },

  addSubcat: function (req) {
    // create a new subcategory from the model
    var newSubcat = new Food.Subcat({
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

  addEntry: function (req) {
    // create a new subcategory from the model
    var newEntry = new Food.Entry({
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