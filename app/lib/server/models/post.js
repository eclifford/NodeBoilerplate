(function() {
  var CommentSchema, PostSchema, Schema, TagSchema, mongoose;
  mongoose = require('mongoose');
  Schema = mongoose.Schema;
  CommentSchema = require('./comment').CommentSchema;
  TagSchema = require('./tag').TagSchema;
  PostSchema = new Schema({
    title: String,
    body: String,
    state: {
      type: String,
      "enum": ['draft', 'published', 'private'],
      "default": 'draft'
    },
    comments: [CommentSchema],
    tags: [
      {
        type: Schema.ObjectId,
        ref: 'Tag'
      }
    ],
    dateCreated: {
      type: Date,
      "default": Date.now()
    },
    dateUpdated: {
      type: Date,
      "default": Date.now()
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    }
  });
  PostSchema.virtual('formattedDateUpdatedDay').get(function() {
    var date;
    date = new Date(this.dateUpdated);
    console.log('day', date.getDate());
    return date.getDate();
  });
  PostSchema.virtual('formattedDateUpdatedMonth').get(function() {
    var date, month, months;
    date = new Date(this.dateUpdated);
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    month = date.getMonth();
    return months[month];
  });
  module.exports.PostSchema = PostSchema;
}).call(this);
