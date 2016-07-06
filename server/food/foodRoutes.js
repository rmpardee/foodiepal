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
      foodControl.getSubcats(req.query.categoryID).then(function(subcategories) {
        res.status(200).send(subcategories);
      });

    })
    //Add subcategory to db
    .post(function(req, res) {
      // TO ADD: capture and respond to errors
      // TO CHANGE: we'll have to see how the parent categoryID is sent
      // Possilby refactor as promises (like the Gets)
      var successResponse = foodControl.addSubcat(req.body);
      res.status(201).send(successResponse);
    });

  app.route('/entry')
    //Get subcategories for the given categoryID
    .get(function(req, res) {
      // TO ADD: capture and respond to errors
      // TO CHANGE: we'll have to see how the parent subcatID is sent
      foodControl.getEntriesForSubcat(req.query.subcatID).then(function(entries) {
        res.status(200).send(entries);
      });
    })
    //Add subcategory to db
    .post(function(req, res) {
      // TO ADD: capture and respond to errors
      // TO CHANGE: we'll have to see how the parent categoryID is sent
      // Possilby refactor as promises (like the Gets)
      var successResponse = foodControl.addEntry(req.body);
      res.status(201).send(successResponse);
    });
};