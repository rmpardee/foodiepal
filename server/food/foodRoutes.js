var foodControl = require('./foodController.js');
var Food = require('./foodModel.js');

module.exports = function(app) {

  //Not sure what to use this for just yet, will comment out
  //main food route 
  // app.route('/')
  //   .get(function(req, res) {
  //     res.send(foodControl.foodFightTest);
  //   })

  //   .post(function(req, res) {
  //     res.send(foodControl.foodFightTest);
  //   });

  app.route('/category')
    // Get categories for the given userID
    .get(function(req, res) {
      // TO ADD: capture and respond to errors
      foodControl.getCategories(req.query.userID).then(function(categories) {
        res.status(200).send(categories);
      });
    })
    // Add category to db
    .post(function(req, res) {
      // TO ADD: capture and respond to errors
      // Add the category to the database
      foodControl.addCategory(req.body).then(function() {
        // Query the database for all the categories with that userID (which will include the one we just added)
        foodControl.getCategories(req.body.userID).then(function(categories) {
          // Send success response status along with those categories
          res.status(201).send(categories);
        });
      });
    });


  app.route('/subcategory')
    // Get subcategories for the given categoryID
    .get(function(req, res) {
      // TO ADD: capture and respond to errors
      foodControl.getSubcategories(req.query.categoryID).then(function(subcategories) {
        res.status(200).send(subcategories);
      });

    })
    // Add subcategory to db
    .post(function(req, res) {
      // TO ADD: capture and respond to errors
      // Add the subcategory to the database
      foodControl.addSubcategory(req.body).then(function() {
        // Query the database for all the subcategories with that categoryID (which will include the one we just added)
        foodControl.getSubcategories(req.body.categoryID).then(function(subcategories) {
          // Send success response status along with those subcategories
          res.status(201).send(subcategories);
        });
      });
    });

  app.route('/entry')
    // Get entries for the given subcategoryID
    .get(function(req, res) {
      // TO ADD: capture and respond to errors
      foodControl.getEntries(req.query.subcategoryID).then(function(entries) {
        console.log("entries in GET routes: ", entries);
        res.status(200).send(entries);
      });
    })
    // Add entry to db, and return all entries for the given subcategoryID
    .post(function(req, res) {
      // TO ADD: capture and respond to errors
      // Add the entry to the database
      foodControl.addEntry(req.body).then(function() {
        // Query the database for all the entries with that subcategoryID (which will include the one we just added)
        foodControl.getEntries(req.body.subcategoryID).then(function(entries) {
          // Send success response status along with those entries
          res.status(201).send(entries);
        });
      });
      
    });
};