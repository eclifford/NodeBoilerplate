(function() {
  var PostManager, assert;
  PostManager = require("../../models/postManager");
  assert = require("assert");
  require("should");
  module.exports = {
    "is able to create post": function() {
      var postManager;
      postManager = PostManager.create();
      return postManager.newPost('Title', 'Body', 'published', [
        {
          name: 'Programming'
        }, {
          name: 'General'
        }
      ], {});
    }
  };
}).call(this);
