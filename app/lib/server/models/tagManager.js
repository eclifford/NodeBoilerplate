(function() {
  var TagManager, TagSchema, mongoose;
  mongoose = require('mongoose');
  TagSchema = require('./tag').TagSchema;
  TagManager = (function() {
    function TagManager() {
      mongoose.connect('mongodb://localhost/mydatabase');
      this.Tag = mongoose.model('Tag', TagSchema);
    }
    TagManager.prototype.get = function(callback) {
      return this.Tag.find({}).run(function(err, tags) {
        if (err) {
          throw err;
        }
        return callback(null, tags);
      });
    };
    return TagManager;
  })();
  module.exports.create = function() {
    return new TagManager();
  };
}).call(this);
