(function() {
  var mongoose;
  mongoose = module.exports = require('mongoose');
  mongoose.connect('mongodb://localhost/mydatabase');
}).call(this);
