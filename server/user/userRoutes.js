var userControl = require('./userController.js');

module.exports = function(app) {

  app.route('/')
    // Get the user for the given userID
    .get(function(req, res) {
      userControl.getUser(req.query.userID).then(function(user) {
        res.status(200).send(user);
      }, function(err) {
        console.log("err in route api/user/ GET: ", err);
        res.status(204).send(err);
      });
    })
    // Add user to db
    .post(function(req, res) {
      userControl.addUser(req.body).then(function(user) {
        res.status(201).send(user);
      }, function(err) {
        console.log("err in route api/user/ POST: ", err);
        res.status(204).send(err);
      });
    });
};