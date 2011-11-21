fs            = require 'fs'
fileUtil      = require 'file'
path          = require 'path'
watchTree     = require 'watch-tree'
child_process = require 'child_process'
_             = require 'underscore'
glob          = require 'glob'

class Watcher
  constructor: (@options) ->
    @paths = @options?.paths
    
  watch: ->
    @runCompass @options.compass if @options.compass
    @watchTree @options.root, @options.sampleRate if @paths
  
  watchTree: (root = '.', sampleRate = 1) -> 
    root = path.resolve root
    console.log "Watching for changes under root '#{root}' to paths #{JSON.stringify _.keys @paths}"
    
    watcher = watchTree.watchTree root, {'sample-rate': sampleRate}
    watcher.on 'fileModified', (file) => @handleFile(file, 'modify')
    watcher.on 'fileCreated', (file) => @handleFile(file, 'create')
    watcher.on 'fileDeleted', (file) => @handleFile(file, 'delete')
  
  runCompass: (config) ->
    console.log "Starting compass with config file '#{config}'"
    @spawn 'compass', ['watch', '-c',  config]
  
  spawn: (command, args, callback) ->
    child = child_process.spawn command, args
    child.stdout.on 'data', (data) =>
      @log "stdout from '#{command}': #{data}"
    child.stderr.on 'data', (data) =>
      console.error "stderr from '#{command}': #{data}"      
    child.on 'exit', (code) =>
      @log "'#{command}' exited with code #{code}"
      callback?(code)
  
  findMatch: (file) ->
    _.detect @paths, (value, pattern) => @globToRegExp(pattern).test file
      
  handleFile: (file, action) => 
    # glob.fnmatch does not behave as expected, so use RegExp instead
    match = @findMatch file
    @processFile file, action, match if match
  
  globToRegExp: (glob) ->
    regex = glob.replace /\./g, '\\.'                 # escape dots
    regex = regex.replace /\?/g, '.'                  # replace ? with dots
    regex = regex.replace /\*/g, '.*'                 # replace * with .*
    regex = regex.replace /\.\*\.\*\//g, '(.*\/)*'    # replace .*.*/ (which used to be **/) with (.*/)*
    new RegExp regex
    
  processFile: (file, action, options) ->
    console.log "Processing change in '#{file}'"
    @packageFiles(file)

  packageFiles: (file) ->
    @log 'Packaging files using jammit'
    @spawn 'jammit', ['-c', @options.package, '-o', @options.packageOut]
  
  log: (message) ->
    console.log message if @options?.verbose    
      
exports?.watcher = Watcher