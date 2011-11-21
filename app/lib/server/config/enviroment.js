(function() {
  module.exports = function(app, express, settings, watcher) {
    app.configure(function() {
      app.set('port', settings.port);
      app.set('views', settings.viewDir);
      app.set('view engine', settings.viewEngine);
      app.use(express.errorHandler(settings.errorHandling));
      app.use(express.static(settings.publicDir, {
        maxage: settings.staticMaxAge
      }));
      app.use(express.bodyParser());
      app.use(express.cookieParser({
        maxAge: settings.cookieMaxAge
      }));
      app.use(express.session({
        secret: settings.cookieSecret
      }));
      return app.use(express.logger());
    });
    app.configure("development", function() {
      return watcher.watch();
    });
    return app.configure("production", function() {});
  };
}).call(this);
