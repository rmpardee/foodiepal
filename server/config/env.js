module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || require('./config.js').expJwt.scrt,
  mlab: {
    dbuser: process.env.MLAB_DBUSER || require('./config.js').mlab.dbuser,
    dbpassword: process.env.MLAB_DBPASSWORD || require('./config.js').mlab.dbpassword
  }
};