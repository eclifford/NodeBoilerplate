(function() {
  var UserManager, assert;
  UserManager = require("../../models/userManager");
  assert = require("assert");
  require("should");
  module.exports = {
    "is able to create user": function() {
      var userManager;
      userManager = UserManager.create();
      return userManager.newUser('eclifford', 'ericgclifford@gmail.com');
    }
  };
}).call(this);
