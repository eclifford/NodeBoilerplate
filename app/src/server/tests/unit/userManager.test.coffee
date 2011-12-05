UserManager = require("../../models/userManager")
assert = require("assert")
require "should"

module.exports =
  "is able to create user": ->
    userManager = UserManager.create()
    userManager.newUser('eclifford', 'ericgclifford@gmail.com')
