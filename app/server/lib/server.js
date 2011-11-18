(function() {
  var Settings, Watcher, app, express, settings, templates, watcher;
  express = require('express');
  Watcher = require("" + __dirname + "/modules/watcher/watcher").watcher;
  Settings = require('settings');
  templates = {};
  settings = new Settings("" + __dirname + "/config/settings").getEnvironment();
  watcher = new Watcher(settings.watcherOptions, templates);
  watcher.compileTemplates();
  app = module.exports = express.createServer();
  require(__dirname + '/config/enviroment')(app, express, settings, watcher);
  require(__dirname + '/controllers/routes')(app);
  app.listen(3000);
}).call(this);
