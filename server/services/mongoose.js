module.exports = function (dbUrl) {
  var mongoose = require('mongoose');
  mongoose.connect(dbUrl);

  return mongoose;
}