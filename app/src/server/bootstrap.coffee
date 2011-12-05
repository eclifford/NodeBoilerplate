fs          = require 'fs'
express     = require 'express'
everyauth   = require 'everyauth'
Settings    = require 'settings'
Watcher     = require("#{__dirname}/modules/watcher/watcher").watcher
settings    = new Settings("#{__dirname}/settings").getEnvironment()
watcher     = new Watcher settings.watcherOptions 
facbookAuth = require "#{__dirname}/modules/auth/facebook"

exports.boot = (app) ->
  bootApplication(app)
  bootControllers(app)
  bootDepedencies(app)

# App settings and middleware
bootApplication = (app) ->
  app.configure ->
    app.set 'port', settings.port
    app.set 'views', "#{__dirname}/views"
    app.set 'view engine', settings.viewEngine

    app.use express.errorHandler settings.errorHandling
    app.use express.static settings.publicDir, maxage: settings.staticMaxAge
    app.use express.bodyParser()
    app.use express.methodOverride()
    app.use express.cookieParser maxAge: settings.cookieMaxAge
    app.use express.session secret: settings.cookieSecret
    app.use app.router
    app.use everyauth.middleware()
    app.use express.logger()

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
      require("#{__dirname}/controllers/" + file) app

bootDepedencies = (app) ->
  everyauth.helpExpress(app)

