express  = require 'express'
Watcher  = require("#{__dirname}/modules/watcher/watcher").watcher
Settings = require 'settings'

settings  = new Settings("#{__dirname}/config/settings").getEnvironment()
watcher   = new Watcher settings.watcherOptions

app = module.exports = express.createServer()

require("#{__dirname}/bootstrap").boot app, settings, watcher

app.listen(3000)
