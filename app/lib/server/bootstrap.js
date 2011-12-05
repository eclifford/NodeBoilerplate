(function() {
  var Settings, Watcher, bootApplication, bootControllers, bootDepedencies, everyauth, express, facbookAuth, fs, settings, watcher;
  fs = require('fs');
  express = require('express');
  everyauth = require('everyauth');
  Settings = require('settings');
  Watcher = require("" + __dirname + "/modules/watcher/watcher").watcher;
  settings = new Settings("" + __dirname + "/settings").getEnvironment();
  watcher = new Watcher(settings.watcherOptions);
  facbookAuth = require("" + __dirname + "/modules/auth/facebook");
  exports.boot = function(app) {
    bootApplication(app);
    bootControllers(app);
    return bootDepedencies(app);
  };
  bootApplication = function(app) {
    app.configure(function() {
      app.set('port', settings.port);
      app.set('views', "" + __dirname + "/views");
      app.set('view engine', settings.viewEngine);
      app.use(express.errorHandler(settings.errorHandling));
      app.use(express.static(settings.publicDir, {
        maxage: settings.staticMaxAge
      }));
      app.use(express.bodyParser());
      app.use(express.methodOverride());
      app.use(express.cookieParser({
        maxAge: settings.cookieMaxAge
      }));
      app.use(express.session({
        secret: settings.cookieSecret
      }));
      app.use(app.router);
      app.use(everyauth.middleware());
      app.use(express.logger());
      app.use(function(err, req, res, next) {
        return res.render('500');
      });
      app.use(function(req, res) {
        return res.render('404');
      });
      return app.dynamicHelpers({
        request: function(req) {
          return req;
        },
        hasMessages: function(req) {
          if (!req.session) {
            return false;
          }
          return Object.keys(req.session.flash || {}).length;
        },
        messages: function(req) {
          return function() {
            var msgs;
            msgs = req.flash();
            return Object.keys(msgs).reduce((function(arr, type) {
              return arr.concat(msgs[type]);
            }), []);
          };
        }
      });
    });
    app.configure("development", function() {
      return watcher.watch();
    });
    return app.configure("production", function() {});
  };
  bootControllers = function(app) {
    return fs.readdir(__dirname + '/controllers', function(err, files) {
      if (err) {
        throw err;
      }
      return files.forEach(function(file) {
        return require(("" + __dirname + "/controllers/") + file)(app);
      });
    });
  };
  bootDepedencies = function(app) {
    return everyauth.helpExpress(app);
  };
}).call(this);
