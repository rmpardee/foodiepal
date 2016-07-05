var foodControl = require('./foodController.js');
var Food = require('./foodModel.js');

module.exports = function(app) {

  //main food route 
  app.route('/')
    //Not sure what to use this for just yet
    .get(function(req, res) {
      res.send(foodControl.foodFightTest);
    })

    //Not sure what to use this for just yet
    .post(function(req, res) {
      res.send(foodControl.foodFightTest);
    });

  app.route('/subcat')
    //Get subcategories for the given categoryID
    .get(function(req, res) {
      // TO ADD: capture and respond to errors
      // TO CHANGE: we'll have to see how the parent categoryID is sent
      var subcategories = foodControl.getDBItems(req.categoryID);
      res.send(200, subcategories);
    })
    //Add subcategory to db
    .post(function(req, res) {
      // TO ADD: capture and respond to errors
      // TO CHANGE: we'll have to see how the parent categoryID is sent
      var successResponse = foodControl.addSubcat(req);
      res.send(200, successResponse);
    });

  app.route('/entry')
    //Get subcategories for the given categoryID
    .get(function(req, res) {
      // TO ADD: capture and respond to errors
      // TO CHANGE: we'll have to see how the parent subcatID is sent
      var entries = foodControl.getDBItems(req.subcatID);
      res.send(200, entries);
    })
    //Add subcategory to db
    .post(function(req, res) {
      // TO ADD: capture and respond to errors
      // TO CHANGE: we'll have to see how the parent categoryID is sent
      var successResponse = foodControl.addEntry(req.body);

      res.send(200, successResponse);
    });
};