// grab the food model
// var Food = require('./foodModel.js'); //Uncomment once foodModel is ready to export

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


  //adds a food item to the db
  addFood: function (food) {
    //add food to db
    console.log('testing add food');
    return 'testing return in addFood';
  },

  //gets all food from db
  getAllFood: function () {
    //get all food from db
    console.log('showing all food');
    var food = [{hungry: 'eat'}, {full: 'stop eating'}];
    return food;
  },

  //gets all food from a subcatagory in db
  getFoodSubCatagory: function () {
    console.log('showing all food in a subcatagory');
  }

};