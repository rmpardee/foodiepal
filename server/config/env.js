var config = require('./config.js');

// DEPLOYED version:
// module.exports = {
//   jwtSecret: process.env.JWT_SECRET,
//   mlab: {
//     dbuser: process.env.MLAB_DBUSER,
//     dbpassword: process.env.MLAB_DBPASSWORD
//   }
// };

// LOCAL version:
module.exports = {
  jwtSecret: config.expJwt.scrt,
  mlab: {
    dbuser: config.mlab.dbuser,
    dbpassword: config.mlab.dbpassword
  }
};