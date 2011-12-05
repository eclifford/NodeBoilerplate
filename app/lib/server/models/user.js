(function() {
  var Schema, UserSchema, mongoose;
  mongoose = require('mongoose');
  Schema = mongoose.Schema;
  UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    facebookId: String,
    facebookToken: String,
    dateCreated: {
      type: Date,
      "default": Date.now()
    },
    dateUpdated: {
      type: Date,
      "default": Date.now()
    },
    role: {
      type: String,
      "enum": ['user', 'admin'],
      "default": 'user'
    }
  });
  module.exports.UserSchema = UserSchema;
}).call(this);
