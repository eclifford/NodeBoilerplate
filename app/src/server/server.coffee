express  = require 'express'
everyauth    = require 'everyauth'
Promise      = everyauth.Promise
UserManager  = require './models/userManager'

app = module.exports = express.createServer()
require("#{__dirname}/bootstrap").boot app

everyauth.facebook
  .appId('210255805715462')
  .appSecret('bcbc06923e65fedcdd62de0f6c16b632')
  .findOrCreateUser (session, accessToken, accessTokExtra, fbUserMetadata) ->
    promise = new Promise();
    userManager = UserManager.create()
    userManager.findOrCreateUserByFacebookData(fbUserMetadata, (err, user) ->
      promise.fulfill(user)
    )
    return promise
  .redirectPath('/posts')

everyauth.everymodule.findUserById (userId, callback) ->
  userManager = UserManager.create()
  userManager.getById userId, callback


everyauth.helpExpress(app)
app.listen(3000)
