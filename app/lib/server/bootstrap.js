(function() {
  var Promise, Settings, UserManager, Watcher, bootApplication, bootControllers, bootDepedencies, everyauth, express, fs, settings, watcher;
  fs = require('fs');
  express = require('express');
  everyauth = require('everyauth');
  Settings = require('settings');
  Watcher = require("" + __dirname + "/modules/watcher/watcher").watcher;
  settings = new Settings("" + __dirname + "/settings").getEnvironment();
  watcher = new Watcher(settings.watcherOptions);
  everyauth = require('everyauth');
  Promise = everyauth.Promise;
  UserManager = require('./models/userManager');
  everyauth.facebook.appId('210255805715462').appSecret('bcbc06923e65fedcdd62de0f6c16b632').findOrCreateUser(function(session, accessToken, accessTokExtra, fbUserMetadata) {
    var promise, userManager;
    promise = new Promise();
    userManager = UserManager.create();
    userManager.findOrCreateUserByFacebookData(fbUserMetadata, function(err, user) {
      return promise.fulfill(user);
    });
    return promise;
  }).redirectPath('/posts');
  everyauth.everymodule.findUserById(function(userId, callback) {
    var userManager;
    userManager = UserManager.create();
    return userManager.getById(userId, callback);
  });
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
      app.use(everyauth.middleware());
      app.use(express.logger());
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
