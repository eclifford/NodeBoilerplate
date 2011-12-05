fs = require('fs')
everyauth = require('everyauth')
util = require('util')
Promise = everyauth.Promise
UserManager = require("../models/userManager")

exports.boot = (app) ->
  bootApplication(app)
  bootControllers(app)

# App settings and middleware
bootApplication = (app) ->
  app.configure ->
    app.set 'port', settings.port
    app.set 'views', "#{root}/views"
    app.set 'view engine', settings.viewEngine

    app.use express.errorHandler settings.errorHandling
    app.use express.static settings.publicDir, maxage: settings.staticMaxAge
    app.use express.bodyParser()
    app.use express.methodOverride()
    app.use express.cookieParser maxAge: settings.cookieMaxAge
    app.use express.session secret: settings.cookieSecret
    app.use everyauth.middleware()
    app.use express.logger()

    # Error screens
    app.use (err, req, res, next) ->
      res.render('500')

    app.use (req, res) ->
      res.render('404')

    # Dynamic view helpers
    app.dynamicHelpers
      request: (req) ->
        req

      hasMessages: (req) ->
        return false  unless req.session
        Object.keys(req.session.flash or {}).length

      messages: (req) ->
        ->
          msgs = req.flash()
          Object.keys(msgs).reduce ((arr, type) ->
            arr.concat msgs[type]
          ), []

  app.configure "development", ->
    watcher.watch()

  app.configure "production", ->

bootControllers = (app) ->
  fs.readdir __dirname + '/controllers', (err, files) ->
    throw err if err
    files.forEach (file) ->
      bootController app, file

bootController = (app, file) ->
  name = file.replace(".js", "")
  actions = require("./controllers/" + name)
  plural = name + "s"
  prefix = "/" + plural
  prefix = "/"  if name is "app"
  Object.keys(actions).map (action) ->
    fn = controllerAction(name, plural, action, actions[action])
    switch action
      when "index"
        app.get prefix, fn
      when "show"
        app.get prefix + "/:id.:format?", fn
      when "add"
        app.get prefix + "/:id/add", fn
      when "create"
        app.post prefix + "/:id", fn
      when "edit"
        app.get prefix + "/:id/edit", fn
      when "update"
        app.put prefix + "/:id", fn
      when "destroy"
        app.del prefix + "/:id", fn

controllerAction = (name, plural, action, fn) ->
  (req, res, next) ->
    render = res.render
    format = req.params.format
    path = __dirname + "/views/" + name + "/" + action + ".html"
    res.render = (obj, options, fn) ->
      res.render = render
      return res.render(obj, options, fn)  if typeof obj is "string"
      if action is "show" and format
        if format is "json"
          return res.send(obj)
        else
          throw new Error("unsupported format \"" + format + "\"")
      res.render = render
      options = options or {}
      if action is "index"
        options[plural] = obj
      else
        options[name] = obj
      res.render path, options, fn

    fn.apply this, arguments


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

everyauth.twitter
  .consumerKey('uZDueG6QTysYl5YRRO8PA')
  .consumerSecret('aSQzYdEVfmB1hjzRod96sk91UTwboOVtUJFmULMxSJo')
  .findOrCreateUser (session, accessToken, accessTokenSecret, twitterUserMetadata) ->
    promise = new Promise()
    # fullfill the promise
    return promise.fulfill({_id: '1', name: 'eclifford', twitId: twitterUserMetadata.id_str})
  .redirectPath('/')

everyauth.instagram
  .entryPath('/auth/instagram')
  .callbackPath('/auth/instagram/callback')
  .scope('basic')
  .appId('b3481714257943a4974e4e7ba99eb357')
  .appSecret('424e2760ecfb4a6e9be301257d401a80')
  .findOrCreateUser (session, accessToken, accessTokenExtra, instagramUserMetadata) ->
    promise = this.Promise()
    console.log('instagramMeta: ', instagramUserMetadata)
    console.log('accessToken: ', accessToken)
    promise.fulfill({_id: '1', name: 'eclifford', access_token: accessToken})
    console.log promise
    return promise
  .redirectPath('/')

everyauth.everymodule.findUserById (userId, callback) ->
  userManager = UserManager.create()
  userManager.getById userId, callback

module.exports = (app, express, settings, watcher, root) ->
  app.configure ->
    app.set 'port', settings.port
    app.set 'views', "#{root}/views"
    app.set 'view engine', settings.viewEngine

    app.use express.errorHandler settings.errorHandling
    app.use express.static settings.publicDir, maxage: settings.staticMaxAge
    app.use express.bodyParser() # Decodes form values
    app.use express.methodOverride() # Looks into decoded body and uses underscore methods
    app.use express.cookieParser maxAge: settings.cookieMaxAge
    app.use express.session secret: settings.cookieSecret
    app.use everyauth.middleware()
    app.use express.logger()

  app.configure "development", ->
    watcher.watch()

  app.configure "production", ->

    