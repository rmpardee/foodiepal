// grab the food model
// var Food = require('./foodModel.js'); //Uncomment once foodModel is ready to export

module.exports = function(app) {

// server routes ====================================

  // api route
  app.get('/api/food', function(req, res) {
    // console.log('INSIDE GET!!!');

    Food.find(function(err, food) {

      // if there is an error retrieving, send the error. 
      // nothing after res.send(err) will execute
      if (err) {
        // console.log('Err with food get');
        res.send(err);
      }

      res.json(foods); // return all nerds in JSON format
    });
  });



  // route to handle creating (app.post)
  app.post('/api/food', function(req, res) {
    // use mongoose save current feed
    // console.log('INPUT INSIDE SERVER POST!!: ', req.body)
    var userEntry = new Nerd({

      name: req.body.entry

    });
            
    userEntry.save(function(err, resp) {
      if (err) {
        res.send(err);
        console.log(err);
      // console.log('Fail saving to server');
      } else {
          res.send({message:'the food has been saved'}); 
          // console.log('Success saving to server');
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