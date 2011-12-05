(function() {
  var Promise, UserManager, everyauth;
  everyauth = require('everyauth');
  Promise = everyauth.Promise;
  UserManager = require("../../models/userManager");
  everyauth.twitter.consumerKey('uZDueG6QTysYl5YRRO8PA').consumerSecret('aSQzYdEVfmB1hjzRod96sk91UTwboOVtUJFmULMxSJo').findOrCreateUser(function(session, accessToken, accessTokenSecret, twitterUserMetadata) {
    var promise;
    promise = new Promise();
    return promise.fulfill({
      _id: '1',
      name: 'eclifford',
      twitId: twitterUserMetadata.id_str
    });
  }).redirectPath('/');
}).call(this);
