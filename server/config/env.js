var port = process.env.PORT || 3000;
console.log("process.env: ", process.env);
console.log("process.env.PORT: ", process.env.PORT);

// DEPLOYED version:
module.exports = {
  port: port,
  jwtSecret: process.env.JWT_SECRET,
  mlab: {
    dbuser: process.env.MLAB_DBUSER,
    dbpassword: process.env.MLAB_DBPASSWORD
  }
};

// LOCAL version:
// module.exports = {
//   port: 3000,
//   jwtSecret: require('./config.js').expJwt.scrt,
//   mlab: {
//     dbuser: require('./config.js').mlab.dbuser,
//     dbpassword: require('./config.js').mlab.dbpassword
//   }
// };