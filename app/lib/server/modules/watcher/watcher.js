(function() {
  var Watcher, child_process, fileUtil, fs, glob, path, watchTree, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  fs = require('fs');
  fileUtil = require('file');
  path = require('path');
  watchTree = require('watch-tree');
  child_process = require('child_process');
  _ = require('underscore');
  glob = require('glob');
  Watcher = (function() {
    function Watcher(options) {
      var _ref;
      this.options = options;
      this.handleFile = __bind(this.handleFile, this);
      this.paths = (_ref = this.options) != null ? _ref.paths : void 0;
    }
    Watcher.prototype.watch = function() {
      if (this.options.compass) {
        this.runCompass(this.options.compass);
      }
      if (this.paths) {
        return this.watchTree(this.options.root, this.options.sampleRate);
      }
    };
    Watcher.prototype.watchTree = function(root, sampleRate) {
      var watcher;
      if (root == null) {
        root = '.';
      }
      if (sampleRate == null) {
        sampleRate = 1;
      }
      root = path.resolve(root);
      console.log("Watching for changes under root '" + root + "' to paths " + (JSON.stringify(_.keys(this.paths))));
      watcher = watchTree.watchTree(root, {
        'sample-rate': sampleRate
      });
      watcher.on('fileModified', __bind(function(file) {
        return this.handleFile(file, 'modify');
      }, this));
      watcher.on('fileCreated', __bind(function(file) {
        return this.handleFile(file, 'create');
      }, this));
      return watcher.on('fileDeleted', __bind(function(file) {
        return this.handleFile(file, 'delete');
      }, this));
    };
    Watcher.prototype.runCompass = function(config) {
      console.log("Starting compass with config file '" + config + "'");
      return this.spawn('compass', ['watch', '-c', config]);
    };
    Watcher.prototype.spawn = function(command, args, callback) {
      var child;
      child = child_process.spawn(command, args);
      child.stdout.on('data', __bind(function(data) {
        return this.log("stdout from '" + command + "': " + data);
      }, this));
      child.stderr.on('data', __bind(function(data) {
        return console.error("stderr from '" + command + "': " + data);
      }, this));
      return child.on('exit', __bind(function(code) {
        this.log("'" + command + "' exited with code " + code);
        return typeof callback === "function" ? callback(code) : void 0;
      }, this));
    };
    Watcher.prototype.findMatch = function(file) {
      return _.detect(this.paths, __bind(function(value, pattern) {
        return this.globToRegExp(pattern).test(file);
      }, this));
    };
    Watcher.prototype.handleFile = function(file, action) {
      var match;
      match = this.findMatch(file);
      if (match) {
        return this.processFile(file, action, match);
      }
    };
    Watcher.prototype.globToRegExp = function(glob) {
      var regex;
      regex = glob.replace(/\./g, '\\.');
      regex = regex.replace(/\?/g, '.');
      regex = regex.replace(/\*/g, '.*');
      regex = regex.replace(/\.\*\.\*\//g, '(.*\/)*');
      return new RegExp(regex);
    };
    Watcher.prototype.processFile = function(file, action, options) {
      console.log("Processing change in '" + file + "'");
      return this.packageFiles(file);
    };
    Watcher.prototype.packageFiles = function(file) {
      this.log('Packaging files using jammit');
      return this.spawn('jammit', ['-c', this.options.package, '-o', this.options.packageOut]);
    };
    Watcher.prototype.log = function(message) {
      var _ref;
      if ((_ref = this.options) != null ? _ref.verbose : void 0) {
        return console.log(message);
      }
    };
    return Watcher;
  })();
  if (typeof exports !== "undefined" && exports !== null) {
    exports.watcher = Watcher;
  }
}).call(this);
