(function() {
  var CommentSchema, Schema, mongoose;
  mongoose = require('mongoose');
  Schema = mongoose.Schema;
  CommentSchema = new Schema({
    body: String,
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    dateCreated: {
      type: Date,
      "default": Date.now()
    },
    dateUpdated: {
      type: Date,
      "default": Date.now()
    }
  });
  module.exports.CommentSchema = CommentSchema;
}).call(this);
