module.exports = (app, express, settings, watcher) ->
  app.configure ->
    app.set 'port', settings.port
    app.set 'views', settings.viewDir
    app.set 'view engine', settings.viewEngine

    app.use express.errorHandler settings.errorHandling
    app.use express.static settings.publicDir, maxage: settings.staticMaxAge
    app.use express.bodyParser()
    app.use express.cookieParser maxAge: settings.cookieMaxAge
    app.use express.session secret: settings.cookieSecret
    app.use express.logger()

  app.configure "development", ->
    watcher.watch()

  app.configure "production", ->

    