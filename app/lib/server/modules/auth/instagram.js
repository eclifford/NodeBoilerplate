(function() {
  var Promise, UserManager, everyauth;
  everyauth = require('everyauth');
  Promise = everyauth.Promise;
  UserManager = require("../../models/userManager");
  everyauth.instagram.entryPath('/auth/instagram').callbackPath('/auth/instagram/callback').scope('basic').appId('b3481714257943a4974e4e7ba99eb357').appSecret('424e2760ecfb4a6e9be301257d401a80').findOrCreateUser(function(session, accessToken, accessTokenExtra, instagramUserMetadata) {
    var promise;
    promise = this.Promise();
    console.log('instagramMeta: ', instagramUserMetadata);
    console.log('accessToken: ', accessToken);
    promise.fulfill({
      _id: '1',
      name: 'eclifford',
      access_token: accessToken
    });
    console.log(promise);
    return promise;
  }).redirectPath('/');
}).call(this);
