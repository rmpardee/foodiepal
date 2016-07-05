// grab the food models
var Food = require('./foodModel.js');


module.exports = function(app) {

// server routes ====================================

// GETs:
  // GET api route for the subcategories within a particular category
  app.get('/api/subcat', function(req, res) {

    // TO CHANGE: we'll have to see how the parent categoryID is sent
    Food.Subcat.find({parent: req.categoryID}, function(err, subcats) {

      // if there is an error retrieving, send the error. 
      if (err) {
        // console.log('Err with food get');
        res.send(err);
        // nothing after res.send(err) will execute
      }

      res.json(subcats); // return all the subcategories in JSON format
    });
  });

  // GET api route for the entries within a particular subcategory
  app.get('/api/entries', function(req, res) {

    // TO CHANGE: we'll have to see how the parent subcatID is sent
    Food.Entry.find({parent: req.subcatID}, function(err, entries) {

      // if there is an error retrieving, send the error. 
      if (err) {
        // console.log('Err with food get');
        res.send(err);
        // nothing after res.send(err) will execute
      }

      res.json(entries); // return all the entries in JSON format
    });
  });


// POSTs:
  // POST api route to create a new subcategory
  app.post('/api/subcat', function(req, res) {
    
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
        res.send(err);
        console.log(err);
      // console.log('Failed saving subcat to server');
      } else {
        res.send({message:'the subcat has been saved'}); 
        // console.log('Success saving subcat to server');
      }
    });
  });

  // POST api route to create a new entry
  app.post('/api/entry', function(req, res) {
    
    // create a new subcategory from the model
    var newEntry = new Food.Entry({
      // TO CHANGE: we'll have to see how all this is sent in the request
      type: req.type,
      notes: req.notes,
      rating: req.rating,
      ancestors: [req.userID, req.categoryID, req.subcatID],
      parent: req.subcatID

    });
            
    newSubcat.save(function(err, res) {
      if (err) {
        res.send(err);
        console.log(err);
      // console.log('Failed saving entry to server');
      } else {
        res.send({message:'the entry has been saved'}); 
        // console.log('Success saving entry to server');
      }
    });
  });

       
  // route to handle delete (app.delete)


  // frontend routes =========================================================
  // route to handle all client requests
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load public/index.html file
  });

};