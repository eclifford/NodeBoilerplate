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
    return app.get("/instagram/popular", function(req, res) {
      return Instagram.media.popular({
        complete: function(media) {
          return res.json(media);
        },
        error: function(errorMessage, errorObject, caller) {
          return console.log(errorMessage);
        }
      });
    });
  };
}).call(this);
