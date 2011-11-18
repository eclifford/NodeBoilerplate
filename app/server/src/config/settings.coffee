oneYear = 1000 * 60 * 60 * 24 * 365

exports.common =
  cookieMaxAge:     oneYear
  publicDir:        'public'
  cookieSecret:     'my.secret.phrase'
  viewDir:          './app/server/lib/views'
  viewEngine:       'jade'
  port:             '3000'

exports.development = 
  staticMaxAge:           null
  errorHandling:
    dumpExceptions:       true
    showStack:            true      
  watcherOptions: 
    compass:              'config/config.rb'
    verbose:              true
    package:              'config/jammit.yml'
    packageOut:           'public/javascripts'
    paths:
      'app/server/src/**/*.coffee':                    {type: 'coffee', out: 'app/server/lib'}
      'app/client/src/**/*.coffee':                    {type: 'coffee', out: 'app/client/lib', package: true}
      'app/client/src/templates/**/*.html':            {type: 'template', out: 'app/client/lib/templates', package: true}
      
exports.production = 
  staticMaxAge:     oneYear
  errorHandling:    {}    

exports.test = {}