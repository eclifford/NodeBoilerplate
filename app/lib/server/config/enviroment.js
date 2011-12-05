(function() {
  var Promise, UserManager, bootApplication, bootController, bootControllers, controllerAction, everyauth, fs, util;
  fs = require('fs');
  everyauth = require('everyauth');
  util = require('util');
  Promise = everyauth.Promise;
  UserManager = require("../models/userManager");
  exports.boot = function(app) {
    bootApplication(app);
    return bootControllers(app);
  };
  bootApplication = function(app) {
    app.configure(function() {
      app.set('port', settings.port);
      app.set('views', "" + root + "/views");
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
        return bootController(app, file);
      });
    });
  };
  bootController = function(app, file) {
    var actions, name, plural, prefix;
    name = file.replace(".js", "");
    actions = require("./controllers/" + name);
    plural = name + "s";
    prefix = "/" + plural;
    if (name === "app") {
      prefix = "/";
    }
    return Object.keys(actions).map(function(action) {
      var fn;
      fn = controllerAction(name, plural, action, actions[action]);
      switch (action) {
        case "index":
          return app.get(prefix, fn);
        case "show":
          return app.get(prefix + "/:id.:format?", fn);
        case "add":
          return app.get(prefix + "/:id/add", fn);
        case "create":
          return app.post(prefix + "/:id", fn);
        case "edit":
          return app.get(prefix + "/:id/edit", fn);
        case "update":
          return app.put(prefix + "/:id", fn);
        case "destroy":
          return app.del(prefix + "/:id", fn);
      }
    });
  };
  controllerAction = function(name, plural, action, fn) {
    return function(req, res, next) {
      var format, path, render;
      render = res.render;
      format = req.params.format;
      path = __dirname + "/views/" + name + "/" + action + ".html";
      res.render = function(obj, options, fn) {
        res.render = render;
        if (typeof obj === "string") {
          return res.render(obj, options, fn);
        }
        if (action === "show" && format) {
          if (format === "json") {
            return res.send(obj);
          } else {
            throw new Error("unsupported format \"" + format + "\"");
          }
        }
        res.render = render;
        options = options || {};
        if (action === "index") {
          options[plural] = obj;
        } else {
          options[name] = obj;
        }
        return res.render(path, options, fn);
      };
      return fn.apply(this, arguments);
    };
  };
  everyauth.facebook.appId('210255805715462').appSecret('bcbc06923e65fedcdd62de0f6c16b632').findOrCreateUser(function(session, accessToken, accessTokExtra, fbUserMetadata) {
    var promise, userManager;
    promise = new Promise();
    userManager = UserManager.create();
    userManager.findOrCreateUserByFacebookData(fbUserMetadata, function(err, user) {
      return promise.fulfill(user);
    });
    return promise;
  }).redirectPath('/posts');
  everyauth.twitter.consumerKey('uZDueG6QTysYl5YRRO8PA').consumerSecret('aSQzYdEVfmB1hjzRod96sk91UTwboOVtUJFmULMxSJo').findOrCreateUser(function(session, accessToken, accessTokenSecret, twitterUserMetadata) {
    var promise;
    promise = new Promise();
    return promise.fulfill({
      _id: '1',
      name: 'eclifford',
      twitId: twitterUserMetadata.id_str
    });
  }).redirectPath('/');
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
  everyauth.everymodule.findUserById(function(userId, callback) {
    var userManager;
    userManager = UserManager.create();
    return userManager.getById(userId, callback);
  });
  module.exports = function(app, express, settings, watcher, root) {
    app.configure(function() {
      app.set('port', settings.port);
      app.set('views', "" + root + "/views");
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
      return app.use(express.logger());
    });
    app.configure("development", function() {
      return watcher.watch();
    });
    return app.configure("production", function() {});
  };
}).call(this);
