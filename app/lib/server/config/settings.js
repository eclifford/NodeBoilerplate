(function() {
  var oneYear;
  oneYear = 1000 * 60 * 60 * 24 * 365;
  exports.common = {
    cookieMaxAge: oneYear,
    publicDir: 'public',
    cookieSecret: 'my.secret.phrase',
    viewDir: './app/src/server/views',
    viewEngine: 'jade',
    port: '3000'
  };
  exports.development = {
    staticMaxAge: null,
    errorHandling: {
      dumpExceptions: true,
      showStack: true
    },
    watcherOptions: {
      compass: 'config/config.rb',
      verbose: true,
      package: 'config/jammit.yml',
      packageOut: 'public/javascripts',
      paths: {
        'app/lib/client/views/tags.js': {},
        'app/src/client/templates/**/*.html': {}
      }
    }
  };
  exports.production = {
    staticMaxAge: oneYear,
    errorHandling: {}
  };
  exports.test = {};
}).call(this);
