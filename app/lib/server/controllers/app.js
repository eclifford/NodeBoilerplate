(function() {
  var Instagram;
  Instagram = require('instagram-node-lib');
  Instagram.set('client_id', 'b3481714257943a4974e4e7ba99eb357');
  Instagram.set('client_secret', '424e2760ecfb4a6e9be301257d401a80');
  module.exports = function(app) {
    app.get("/", function(req, res) {
      return res.render("index", {
        title: "My Page Bitch"
      });
    });
    app.get("/instagram/popular", function(req, res) {
      console.log(req.user);
      return Instagram.users.self({
        access_token: '2991386.b348171.7d1f8edf197d466c8b1539123a8fea2e',
        complete: function(media) {
          return res.json(media);
        },
        error: function(errorMessage, errorObject, caller) {
          return console.log(errorMessage);
        }
      });
    });
    app.use(function(err, req, res, next) {
      return res.render('500');
    });
    return app.use(function(req, res) {
      return res.render('404');
    });
  };
}).call(this);
