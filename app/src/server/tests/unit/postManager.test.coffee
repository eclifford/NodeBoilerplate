PostManager = require("../../models/postManager")
assert = require("assert")
require "should"

module.exports =
  "is able to create post": ->
    postManager = PostManager.create()
    postManager.newPost('Title', 'Body', 'published', [{name: 'Programming'}, {name: 'General'}], {})

