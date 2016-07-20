// DEPLOYED version:
module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  mlab: {
    dbuser: process.env.MLAB_DBUSER,
    dbpassword: process.env.MLAB_DBPASSWORD
  },
  postmark: process.env.POSTMARK
};

// LOCAL version:
// module.exports = {
//   jwtSecret: require('./config.js').expJwt.scrt,
//   mlab: {
//     dbuser: require('./config.js').mlab.dbuser,
//     dbpassword: require('./config.js').mlab.dbpassword
//   },
//   postmark: require('./config.js').postmark
// };